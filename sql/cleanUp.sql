-- Delete rows from tables with foreign key references starting from the child tables
DELETE FROM GHG_Emissions WHERE organisationID IN (SELECT id FROM Organisations WHERE countryID IN (SELECT id FROM Countries));
DELETE FROM Targets WHERE organisationID IN (SELECT id FROM Organisations WHERE countryID IN (SELECT id FROM Countries));
DELETE FROM Questionnaires;
DELETE FROM Organisations WHERE countryID IN (SELECT id FROM Countries);
DELETE FROM Sectors;
DELETE FROM TargetTypes;
DELETE FROM Populations WHERE cityID IN (SELECT id FROM Cities WHERE countryID IN (SELECT id FROM Countries));
DELETE FROM Cities WHERE countryID IN (SELECT id FROM Countries);

-- Now delete rows from the Countries table
DELETE FROM Countries;
