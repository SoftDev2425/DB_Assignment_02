CREATE PROCEDURE GetAvgEmissionForC40AndNonC40 
AS
BEGIN 
		DECLARE @AvgC40Total FLOAT
		DECLARE @AvgC40Scope1 FLOAT
		DECLARE @AvgC40Scope2 FLOAT
	
		DECLARE @AvgNonC40Total FLOAT
		DECLARE @AvgNonC40Scope1 FLOAT
		DECLARE @AvgNonC40Scope2 FLOAT
		
	
		-- Calculate average emissions for C40 cities
		SELECT
			@AvgC40Total = ROUND(AVG(ge.totalCityWideEmissionsCO2), 2),
			@AvgC40Scope1 = ROUND(AVG(ge.totalScope1_CO2), 2),
			@AvgC40Scope2 = ROUND(AVG(ge.totalScope2_CO2), 2)
		FROM
			GHG_Emissions ge
		JOIN
			Organisations o ON ge.organisationID = o.id
		JOIN
			Cities c ON o.cityID = c.id
		WHERE 
			c.c40Status = 1;
		
		-- Calculate average emissions for non C40 cities
		SELECT
			@AvgNonC40Total = ROUND(AVG(ge.totalCityWideEmissionsCO2), 2),
			@AvgNonC40Scope1 = ROUND(AVG(ge.totalScope1_CO2), 2),
			@AvgNonC40Scope2 = ROUND(AVG(ge.totalScope2_CO2), 2) 
		FROM
			GHG_Emissions ge
		JOIN
			Organisations o ON ge.organisationID = o.id
		JOIN
			Cities c ON o.cityID = c.id
		WHERE 
			c.c40Status = 1;
		
	    SELECT 
	        'avgC40CitiesEmission' AS [Type],
	        @AvgC40Total AS total,
	        @AvgC40Scope1 AS scope1,
	        @AvgC40Scope2 AS scope2
	    UNION ALL
	    SELECT 
	        'avgNonC40CitiesEmission' AS [Type],
	        @AvgNonC40Total AS total,
	        @AvgNonC40Scope1 AS scope1,
	        @AvgNonC40Scope2 AS scope2;
END