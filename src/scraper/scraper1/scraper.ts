import fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import { Countries } from "../../models/countries";
import { Cities } from "../../models/cities";
import { Organisations } from "../../models/organisations";
import { Sectors } from "../../models/sectors";
import { Targets } from "../../models/targets";

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
            // create country
            const newCountry = await Countries.findOneAndUpdate(
              { name: record.country.name },
              { $setOnInsert: { name: record.country.name } },
              { upsert: true, new: true }
            );

            // create city
            const newCity = await Cities.findOneAndUpdate(
              { name: record.city.name },
              {
                $setOnInsert: {
                  name: record.city.name,
                  C40Status: record.city.C40Status,
                  countryID: newCountry._id,
                },
              },
              { upsert: true, new: true }
            );

            // create organisation
            const newOrganisation = await Organisations.findOneAndUpdate(
              { accountNo: record.organisation.accountNo },
              {
                $setOnInsert: {
                  name: record.organisation.name,
                  accountNo: record.organisation.accountNo,
                  cityID: newCity.id,
                  countryID: newCountry.id,
                },
              },
              {
                upsert: true,
                new: true,
              }
            );

            // create sector
            const newSector = await Sectors.findOneAndUpdate(
              { name: record.target.sector },
              { $setOnInsert: { name: record.target.sector } },
              { upsert: true, new: true }
            );

            // create target
            await Targets.create({
              reportingYear: record.target.reportingYear,
              baselineYear: record.target.baselineYear,
              targetYear: record.target.targetYear,
              reductionTargetPercentage: record.target.reductionTargetPercentage,
              baselineEmissionsCO2: record.target.baselineEmissionsCO2,
              comment: record.target.comment,
              organisationID: newOrganisation.id,
              sectorID: newSector.id,
            });
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
