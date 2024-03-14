import fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";

const scraper1 = async () => {
  return new Promise((resolve, reject) => {
    const csvFilePath = path.resolve(__dirname, "2016_Cities_Emissions_Reduction_Targets_20240207.csv");

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
          name: data[0].trim(),
          accountNo: parseInt(data[1]) || null,
        };

        const country = {
          name: data[2].trim(),
        };

        const city = {
          name: data[3].trim(),
          C40Status: data[4].trim() == "C40" ? true : false,
        };

        const target = {
          reportingYear: isNaN(parseInt(data[5])) ? null : parseInt(data[5]),
          baselineYear: isNaN(parseInt(data[8])) ? null : parseInt(data[8]),
          baselineEmissionsCO2: isNaN(parseInt(data[9])) ? null : parseInt(data[9]),
          reductionTargetPercentage: isNaN(parseInt(data[10])) ? null : parseInt(data[10]),
          targetYear: isNaN(parseInt(data[11])) ? null : parseInt(data[11]),
          comment: data[12].trim(),
          sector: data[6].trim(),
        };

        obj.organisation = organisation;
        obj.country = country;
        obj.city = city;
        obj.target = target;

        records.push(obj);
      })
      .on("end", async () => {
        console.log("Read all records in csv", csvFilePath, "// Rows:", records.length);
        console.log("Inserting records into database...");

        try {
          for (const record of records) {
            // NOTE: We are well aware that the transactions below can be done in a single transaction - we separated them for clarity

          //   const newCountry = await con.query`
          // IF NOT EXISTS (SELECT 1 FROM Countries WHERE name = ${record.country.name})
          // BEGIN
          //     INSERT INTO Countries (name)
          //     VALUES (${record.country.name});
          // END
          // `;

            // create country
            


          //   const newCity = await con.query`
          // IF NOT EXISTS (SELECT 1 FROM Cities WHERE name = ${record.city.name})
          // BEGIN
          //     DECLARE @country_id uniqueidentifier;

          //     SELECT @country_id = id FROM Countries WHERE name = ${record.country.name};

          //     IF @country_id IS NOT NULL
          //     BEGIN
          //       INSERT INTO Cities (name, C40Status, countryID)
          //       VALUES (${record.city.name}, ${record.city.C40Status == true ? 1 : 0}, @country_id)
          //     END
          // END
          // `;

          //   // create organisation
          //   const newOrganisation = await con.query`
          //     IF NOT EXISTS (SELECT 1 FROM Organisations WHERE accountNo = ${record.organisation.accountNo})
          //     BEGIN
          //         DECLARE @city_id uniqueidentifier;
          //         DECLARE @country_id uniqueidentifier;

          //         SELECT @city_id = id FROM Cities WHERE name = ${record.city.name};
          //         SELECT @country_id = id FROM Countries WHERE name = ${record.country.name};

          //         IF @country_id IS NOT NULL AND @city_id IS NOT NULL
          //         BEGIN
          //           INSERT INTO Organisations (name, accountNo, countryID, cityID)
          //           VALUES (${record.organisation.name}, ${record.organisation.accountNo}, @country_id, @city_id)
          //         END
          //     END
          //     `;

          //   const newSector = await con.query`
          //     IF NOT EXISTS (SELECT 1 FROM Sectors WHERE name = ${record.target.sector})
          //     BEGIN
          //         INSERT INTO Sectors (name)
          //         VALUES (${record.target.sector})
          //     END
          // `;

            // // create target
            // const newTarget = await con.query`
            // BEGIN
            //     DECLARE @organisation_id uniqueidentifier;
            //     DECLARE @sector_id uniqueidentifier;

            //     SELECT @organisation_id = id FROM Organisations WHERE accountNo = ${record.organisation.accountNo};
            //     SELECT @sector_id = id FROM Sectors WHERE name = ${record.target.sector};

            //     IF @organisation_id IS NOT NULL AND @sector_id IS NOT NULL
            //     BEGIN
            //       INSERT INTO Targets (reportingYear, baselineYear, baselineEmissionsCO2, reductionTargetPercentage, targetYear, comment, organisationID, sectorID)
            //       VALUES (${record.target.reportingYear}, ${record.target.baselineYear}, ${record.target.baselineEmissionsCO2}, ${record.target.reductionTargetPercentage}, ${record.target.targetYear}, ${record.target.comment}, @organisation_id, @sector_id)
            //     END
            // END
            // `;
          }

          console.log("Scraper 1 done!");
          resolve("Scraper 1 done!");
        } catch (error) {
          reject(error);
        }
      });
  });
};

export default scraper1;
