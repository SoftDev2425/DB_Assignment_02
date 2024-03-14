CREATE PROCEDURE GetC40CitiesWithEmissions
@C40Status BIT
AS
BEGIN
        DECLARE @MostRecentYear INT;
        SELECT @MostRecentYear = MAX(reportingYear) FROM GHG_Emissions;
    SELECT 
        c.id AS CityID,
        c.name AS CityName,
        (SELECT TOP 1 p.count FROM Populations p WHERE p.cityID = c.id ORDER BY p.year DESC) AS Population,
        c.c40Status AS C40Status,

        co.id AS CountryID,
        co.name AS CountryName,
        co.regionName AS RegionName,

        SUM(e.totalCityWideEmissionsCO2) AS TotalCityWideEmissionsCO2,
        SUM(e.totalScope1_CO2) AS TotalScope1_CO2,
        SUM(e.totalScope2_CO2) AS TotalScope2_CO2,
        e.id as emissionID,
	    e.description,
	    e.comment,
	    e.reportingYear,
	    e.measurementYear,
	    e.methodology,
	    e.methodologyDetails,
	    e.gassesIncluded
    FROM Cities c
    JOIN Countries co ON c.countryID = co.id
    JOIN Organisations o ON c.id = o.cityID
    JOIN GHG_Emissions e ON o.id = e.organisationID AND e.reportingYear = @MostRecentYear
    JOIN EmissionStatusTypes est ON e.emissionStatusTypeID = est.id
    WHERE c40Status = @C40Status
    GROUP BY 
        c.id, 
        c.name, 
        c.c40status, 
        co.id, 
        co.name, 
        co.regionName, 
        e.id,
	    e.description,
	    e.comment,
	    e.reportingYear,
	    e.measurementYear,
	    e.methodology,
	    e.methodologyDetails,
	    e.gassesIncluded
    ORDER BY c.name;
END;

EXEC GetC40CitiesWithEmissions @C40Status = 1;