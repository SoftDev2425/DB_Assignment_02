CREATE PROCEDURE GetGassesByCountry 
	AS
	BEGIN
		DECLARE @NewestReportingYear INT;
		
		SELECT @NewestReportingYear = MAX(ghg.reportingYear) 
		FROM GHG_Emissions ghg;
		
		SELECT c.name AS CountryName,
		STRING_AGG(ghg.gassesIncluded, ' ') AS Gasses
		FROM GHG_Emissions ghg
		JOIN Organisations o ON ghg.organisationID = o.id
		JOIN Countries c ON o.countryID = c.id
		WHERE ghg.reportingYear = @NewestReportingYear
		GROUP BY c.name
		ORDER BY c.name ASC
	END
