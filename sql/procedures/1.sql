CREATE PROCEDURE GetTotalEmissionByCity
    @cityName VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
	
	SELECT   
	    c.id as cityID, 
	    c.name as cityName, 
	    c.c40Status,
	    ge.id as emissionID,
	    ge.totalCityWideEmissionsCO2 as total,
	    ge.totalScope1_CO2 as totalScope1Emission,
	    ge.totalScope2_CO2 as totalScope2Emission,
	    ge.description,
	    ge.comment,
	    ge.reportingYear,
	    ge.measurementYear,
	    ge.methodology,
	    ge.methodologyDetails,
	    ge.gassesIncluded,
	    est.type,
	    o.name as organisationName,
	    o.accountNo as organisationNo,
	    AVG(p.count) as population
	FROM GHG_Emissions ge 
	JOIN Organisations o ON o.id = ge.organisationID 
	JOIN Cities c ON o.cityID = c.id 
	JOIN Populations p ON p.cityID = c.id
	JOIN EmissionStatusTypes est ON est.id = ge.emissionStatusTypeID 
	WHERE c.name = @cityName
		GROUP BY
	    c.id,
	    c.name,
	    c.c40Status,
	    ge.id,
	    ge.totalCityWideEmissionsCO2,
	    ge.totalScope1_CO2,
	    ge.totalScope2_CO2,
	    ge.description,
	    ge.comment,
	    ge.reportingYear,
	    ge.measurementYear,
	    ge.methodology,
	    ge.methodologyDetails,
	    ge.gassesIncluded,
	    est.type,
	    o.name,
	    o.accountNo;
END