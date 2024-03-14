CREATE PROCEDURE GetTotalEmissionsForCountries 
	AS
	BEGIN
		DECLARE @NewestReportingYear INT;
		
		SELECT @NewestReportingYear = MAX(ghg.reportingYear) 
		FROM GHG_Emissions ghg;
		
		SELECT c.id AS CountryID,
		c.name AS CountryName,
		SUM(ghg.totalCityWideEmissionsCO2) AS TotalEmissions
		FROM GHG_Emissions ghg
		JOIN Organisations o ON ghg.organisationID = o.id
		JOIN Countries c ON o.countryID = c.id
		WHERE ghg.reportingYear = @NewestReportingYear
		GROUP BY c.id, c.name
		ORDER BY c.name ASC
	END
