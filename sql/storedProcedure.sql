CREATE PROCEDURE GetCitiesByCountry
    @CountryName varchar(60)
AS
BEGIN
    SELECT c.name AS CityName
    FROM Cities c
    JOIN Countries co ON c.countryID = co.id
    WHERE co.name = @CountryName;
END;

EXEC GetCitiesByCountry @CountryName = 'Denmark';

-----------------------------------------------------------

CREATE PROCEDURE GetTotalEmissionsForCity
    @CityName varchar(100)
AS
BEGIN
    SELECT c.name AS CityName, SUM(e.totalCityWideEmissionsCO2) AS TotalEmissionsCO2e
    FROM Cities c
    JOIN Organisations o ON c.id = o.cityID
    JOIN GHG_Emissions e ON o.id = e.organisationID
    WHERE c.name = @CityName
    GROUP BY c.name;
END;

EXEC GetTotalEmissionsForCity @CityName = 'Copenhagen'

-----------------------------------------------------------

CREATE PROCEDURE GetCityDetails
    @CityName VARCHAR(100)
AS
BEGIN
    SELECT 
        c.id,
        c.name,
        (SELECT TOP 1 p.count FROM Populations p WHERE p.cityID = c.id ORDER BY p.year DESC) AS population,
        CASE WHEN c.c40Status = 1 THEN 'true' ELSE 'false' END AS c40Status
    FROM Cities c
    WHERE c.name = @CityName;
END;

EXEC GetCityDetails @CityName = 'Copenhagen'

-----------------------------------------------------------
IF OBJECT_ID('GetTotalEmissionByCity', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE GetTotalEmissionByCity;
END
GO

CREATE PROCEDURE GetTotalEmissionByCity
    @CityName VARCHAR(100)
AS
BEGIN
    -- Determine the most recent reporting year for the city
    DECLARE @MostRecentYear INT;
    SELECT @MostRecentYear = MAX(e.reportingYear)
    FROM GHG_Emissions e
    JOIN Organisations o ON e.organisationID = o.id
    JOIN Cities c ON o.cityID = c.id
    WHERE c.name = @CityName;

    -- Aggregate emissions for the most recent year and get the status
    SELECT 
        e.id,
        e.totalCityWideEmissionsCO2,
        e.totalScope1_CO2,
        e.totalScope2_CO2,
        est.type,
        e.description,
        e.comment
    FROM GHG_Emissions e
    JOIN Organisations o ON e.organisationID = o.id
    JOIN Cities c ON o.cityID = c.id
    JOIN Population p ON o.cityID = p.id AND p.year = @MostRecentYear
    JOIN EmissionStatusTypes est ON e.emissionStatusTypeID = est.id
    WHERE c.name = @CityName AND e.reportingYear = @MostRecentYear
END;

EXEC GetTotalEmissionByCity @CityName = 'Singapore';

-----------------------------------------------------------
IF OBJECT_ID('GetCityByStatus', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE GetCityByStatus;
END
GO

CREATE PROCEDURE GetCityByStatus
    @EmissionStatus VARCHAR(100)
AS
BEGIN
    -- Determine the most recent reporting year across all emissions data
    DECLARE @MostRecentYear INT;
    SELECT @MostRecentYear = MAX(reportingYear) FROM GHG_Emissions;

    -- Select cities and their emissions data for the most recent year matching the specified emission status
    SELECT DISTINCT
        c.id AS CityID,
        c.name AS CityName,
        e.reportingYear,
        SUM(e.totalCityWideEmissionsCO2) AS TotalCityWideEmissionsCO2,
        est.type AS EmissionStatus
    FROM Cities c
    JOIN Organisations o ON c.id = o.cityID
    JOIN GHG_Emissions e ON o.id = e.organisationID
    JOIN EmissionStatusTypes est ON e.emissionStatusTypeID = est.id
    WHERE est.type = @EmissionStatus AND e.reportingYear = @MostRecentYear
    GROUP BY c.id, c.name, e.reportingYear, est.type
    ORDER BY c.name;
END;


EXEC GetCityByStatus @EmissionStatus = 'Increased';