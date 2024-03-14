import fs from "fs";
import { parse } from "csv-parse";
import { format } from "date-fns";
import * as path from "path";

const scraper4 = async (con: any) => {
  return new Promise((resolve, reject) => {
    const csvFilePath = path.resolve(__dirname, "2017_Cities_Community_Wide_Emissions.csv");

    const records: any[] = [];

    const parser = parse({
      delimiter: ",",
      from_line: 2,
    });

    fs.createReadStream(csvFilePath)
      .pipe(parser)
      .on("data", (data) => {
        const obj: any = {};

        const organisation = {
          name: data[1].trim(),
          accountNo: parseInt(data[0]) || null,
        };

        const country = {
          name: data[3].trim(),
          regionName: data[4].trim(),
        };

        const city = {
          name: data[2].trim(),
          C40Status: data[5].trim() == "C40" ? true : false,
          population: {
            count: parseInt(data[20]) || null,
            year: parseInt(data[21]) || null,
          },
        };

        const emissionStatusTypes = {
          type: data[18].trim() || "",
        };

        const GHG_emissions = {
          reportingYear: isNaN(parseInt(data[7])) ? null : parseInt(data[7]),
          measurementYear: data[8]
            .split(" - ")
            .map((date: string | number | Date) => format(new Date(date), "yyyy-MM-dd"))[1]
            .split("-")[0],
          boundary: data[9].trim() || "",
          methodology: data[10].trim() || "",
          methodologyDetails: data[11].trim() || "",
          description: data[19].trim() || "",
          comment: data[17].trim() || "",
          gassesIncluded: data[12].trim() || "",
          totalCityWideEmissionsCO2: isNaN(parseInt(data[13])) ? null : parseInt(data[13]),
          totalScope1CO2: isNaN(parseInt(data[15])) ? null : parseInt(data[15]),
          totalScope2CO2: isNaN(parseInt(data[16])) ? null : parseInt(data[16]),
        };

        obj.organisation = organisation;
        obj.country = country;
        obj.city = city;
        obj.emissionStatusTypes = emissionStatusTypes;
        obj.GHG_emissions = GHG_emissions;

        records.push(obj);
      })
      .on("end", async () => {
        console.log("Read all records in csv", csvFilePath, "// Rows:", records.length);
        console.log("Inserting records into database...");

        try {
          for (const record of records) {
            // NOTE: We are well aware that the transactions below can be done in a single transaction - we separated them for clarity

            const newCountry = await con.query`
          IF NOT EXISTS (SELECT 1 FROM Countries WHERE name = ${record.country.name})
          BEGIN
              INSERT INTO Countries (name)
              VALUES (${record.country.name});
          END
          `;

            const newCity = await con.query`
          IF NOT EXISTS (SELECT 1 FROM Cities WHERE name = ${record.city.name})
          BEGIN
              DECLARE @country_id uniqueidentifier;

              SELECT @country_id = id FROM Countries WHERE name = ${record.country.name};

              IF @country_id IS NOT NULL
              BEGIN
                INSERT INTO Cities (name, C40Status, countryID)
                VALUES (${record.city.name}, ${record.city.C40Status == true ? 1 : 0}, @country_id)
              END
          END
          `;

            const newPopulation = await con.query`
          IF NOT EXISTS (SELECT 1 FROM Populations WHERE cityID = (SELECT id FROM Cities WHERE name = ${record.city.name} AND year = ${record.city.population.year}))
          BEGIN
              DECLARE @city_id uniqueidentifier;

              SELECT @city_id = id FROM Cities WHERE name = ${record.city.name};

              IF @city_id IS NOT NULL
              BEGIN
                INSERT INTO Populations (count, year, cityID)
                VALUES (${record.city.population.count}, ${record.city.population.year}, @city_id)
              END
          END
          `;

            // create organisation
            const newOrganisation = await con.query`
              IF NOT EXISTS (SELECT 1 FROM Organisations WHERE accountNo = ${record.organisation.accountNo})
              BEGIN
                  DECLARE @city_id uniqueidentifier;
                  DECLARE @country_id uniqueidentifier;

                  SELECT @city_id = id FROM Cities WHERE name = ${record.city.name};
                  SELECT @country_id = id FROM Countries WHERE name = ${record.country.name};

                  IF @country_id IS NOT NULL AND @city_id IS NOT NULL
                  BEGIN
                    INSERT INTO Organisations (name, accountNo, countryID, cityID)
                    VALUES (${record.organisation.name}, ${record.organisation.accountNo}, @country_id, @city_id)
                  END
              END
              `;

            const newEmissionStatusType = await con.query`
              IF NOT EXISTS (SELECT 1 FROM EmissionStatusTypes WHERE type = ${record.emissionStatusTypes.type})
              BEGIN
                  INSERT INTO EmissionStatusTypes (type)
                  VALUES (${record.emissionStatusTypes.type})
              END
          `;

            // CREATES GHG_EmissionStatus AND new GHG_Emission
            const newGHG_Emission = await con.query`
              BEGIN
                DECLARE @organisation_id uniqueidentifier;
                DECLARE @emissionStatusType_id uniqueidentifier;

                SELECT @emissionStatusType_id = id FROM EmissionStatusTypes WHERE type = ${record.emissionStatusTypes.type};
                SELECT @organisation_id = id FROM Organisations WHERE accountNo = ${record.organisation.accountNo};

                IF @organisation_id IS NOT NULL AND @emissionStatusType_id IS NOT NULL
                BEGIN
                    INSERT INTO GHG_Emissions (reportingYear, measurementYear, boundary, methodology, methodologyDetails, description, comment, gassesIncluded, totalCityWideEmissionsCO2, totalScope1_CO2, totalScope2_CO2, organisationID, emissionStatusTypeID)
                    VALUES (${record.GHG_emissions.reportingYear}, ${record.GHG_emissions.measurementYear}, ${record.GHG_emissions.boundary}, ${record.GHG_emissions.methodology}, ${record.GHG_emissions.methodologyDetails}, ${record.GHG_emissions.description}, ${record.GHG_emissions.comment}, ${record.GHG_emissions.gassesIncluded}, ${record.GHG_emissions.totalCityWideEmissionsCO2}, ${record.GHG_emissions.totalScope1CO2}, ${record.GHG_emissions.totalScope2CO2}, @organisation_id, @emissionStatusType_id)
                END
              END
          `;
          }

          console.log("Scraper 4 done!");
          resolve("Scraper 4 done!");
        } catch (error) {
          reject(error);
        }
      });
  });
};

export default scraper4;
