CREATE PROCEDURE GetEmissionTargetsForCity
    @cityName VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
	
	SELECT   
	    c.id as cityID, 
	    c.name as cityName, 
	    c.c40Status,
	    AVG(p.count) as population,
	    t.id as targetID,
		tt.type,
		s.name as sectorName,
		t.reportingYear,
		t.baselineYear,
		t.targetYear,
		t.reductionTargetPercentage,
		t.baselineEmissionsCO2,
		t.comment,
	    o.name as organisationName,
	    o.accountNo as organisationNo
	FROM Targets t
	LEFT JOIN TargetTypes tt ON tt.id = t.targetTypeID
	LEFT JOIN Sectors s ON s.id = t.sectorID
	JOIN Organisations o ON o.id = t.organisationID 
	JOIN Cities c ON o.cityID = c.id
	JOIN Populations p ON p.cityID = c.id
	WHERE c.name = @cityName
		GROUP BY
		c.id, 
	    c.name, 
	    c.c40Status,
	    t.id,
		tt.type,
		s.name,
		t.reportingYear,
		t.baselineYear,
		t.targetYear,
		t.reductionTargetPercentage,
		t.baselineEmissionsCO2,
		t.comment,
	    o.name,
	    o.accountNo
		
END
