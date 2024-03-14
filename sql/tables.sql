CREATE TABLE Countries (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	name varchar(200),
	regionName varchar(200)
)

CREATE TABLE Cities (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	name varchar(100),
	c40Status BIT,
	countryID uniqueidentifier,
	FOREIGN KEY (countryID) REFERENCES Countries(id)
)

CREATE TABLE Populations (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	count INT,
	year INT,
	cityID uniqueidentifier,
	FOREIGN KEY (cityID) REFERENCES Cities(id)	
)

CREATE TABLE Organisations (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	accountNo int,
	name varchar(100),
	cityID uniqueidentifier,
	countryID uniqueidentifier,
	FOREIGN KEY (cityID) REFERENCES Cities(id),
	FOREIGN KEY (countryID) REFERENCES Countries(id)
)

CREATE TABLE Sectors (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	name varchar(300)
)

CREATE TABLE TargetTypes (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	type varchar(75)
)

CREATE TABLE Targets (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	reportingYear int,
	baselineYear int,
	targetYear int,
	reductionTargetPercentage int,
	baselineEmissionsCO2 bigint,
	comment varchar(MAX),
	organisationID uniqueidentifier,
	sectorID uniqueidentifier,
	targetTypeID uniqueidentifier,
	FOREIGN KEY (organisationID) REFERENCES Organisations(id),
	FOREIGN KEY (sectorID) REFERENCES Sectors(id),
	FOREIGN KEY (targetTypeID) REFERENCES TargetTypes(id),
)

CREATE TABLE EmissionStatusTypes (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	type varchar(300)
)

CREATE TABLE GHG_Emissions (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	reportingYear INT,
	measurementYear INT,
	boundary varchar(350),
	methodology varchar(250),
	methodologyDetails varchar(MAX),
	description varchar(MAX),
	comment varchar(2000),
	gassesIncluded varchar(100),
	totalCityWideEmissionsCO2 FLOAT,
	totalScope1_CO2 FLOAT,
	totalScope2_CO2 FLOAT,
	organisationID uniqueidentifier,
	emissionStatusTypeID uniqueidentifier,
	FOREIGN KEY (organisationID) REFERENCES Organisations(id),
	FOREIGN KEY (emissionStatusTypeID) REFERENCES EmissionStatusTypes(id)
)

CREATE TABLE Questionnaires (
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	organisationID uniqueidentifier,
	name varchar(250),
	data varchar(MAX),
	FOREIGN KEY (organisationID) REFERENCES Organisations(id)
)