CREATE PROCEDURE GetTotalEmissionsForRegions 
	AS
	BEGIN
		DECLARE @NewestReportingYear INT;
		
		SELECT @NewestReportingYear = MAX(ghg.reportingYear) 
		FROM GHG_Emissions ghg;
		
		SELECT SUM(ghg.totalCityWideEmissionsCO2) AS TotalEmissions,
		c.regionName AS RegionName
		FROM GHG_Emissions ghg
		JOIN Organisations o ON ghg.organisationID = o.id
		JOIN Countries c ON o.countryID = c.id
		WHERE ghg.reportingYear = @NewestReportingYear
		GROUP BY c.regionName 
	END
