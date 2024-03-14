CREATE PROCEDURE GetCitiesByStatusType
    @EmissionStatus VARCHAR(100)
AS
BEGIN
    DECLARE @MostRecentYear INT;
    SELECT @MostRecentYear = MAX(reportingYear) FROM GHG_Emissions;

    -- Select cities and their emissions data for the most recent year matching the specified emission status, including population
    SELECT 
        c.id AS CityID,
        c.name AS CityName,
        c.c40Status,
        (SELECT TOP 1 p.count FROM Populations p WHERE p.cityID = c.id ORDER BY p.year DESC) AS Population,

        SUM(e.totalCityWideEmissionsCO2) AS TotalCityWideEmissionsCO2,
        e.id as emissionID,
        SUM(e.totalScope1_CO2) AS TotalScope1_CO2,
        SUM(e.totalScope2_CO2) AS TotalScope2_CO2,
        est.type AS EmissionStatus,
        (SELECT TOP 1 e.description FROM GHG_Emissions e JOIN Organisations o ON e.organisationID = o.id WHERE o.cityID = c.id AND e.reportingYear = @MostRecentYear ORDER BY e.id DESC) AS Description,
        (SELECT TOP 1 e.comment FROM GHG_Emissions e JOIN Organisations o ON e.organisationID = o.id WHERE o.cityID = c.id AND e.reportingYear = @MostRecentYear ORDER BY e.id DESC) AS Comment,
        @MostRecentYear AS ReportingYear
        
    FROM Cities c
    JOIN Organisations o ON c.id = o.cityID
    JOIN GHG_Emissions e ON o.id = e.organisationID
    JOIN EmissionStatusTypes est ON e.emissionStatusTypeID = est.id
    WHERE est.type = @EmissionStatus AND e.reportingYear = @MostRecentYear
    GROUP BY c.id, c.name, e.id, c.c40Status, est.type
    ORDER BY c.name;
END;