import fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import Countries from "../../models/countries";
import Cities from "../../models/cities";
import Populations from "../../models/populations";
import Organisations from "../../models/organisations";
import Sectors from "../../models/sectors";
import TargetTypes from "../../models/targetTypes";
import Targets from "../../models/targets";

const scraper2 = async () => {
  return new Promise((resolve, reject) => {
    const csvFilePath = path.resolve(__dirname, "2017_Cities_Emissions_Reduction_Targets_20240207.csv");

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
          C40Status: data[6].trim() == "C40" ? true : false,
          population: {
            count: parseInt(data[17]) || null,
            year: parseInt(data[18]) || null,
          },
        };

        const targetType = {
          type: data[8].trim(),
        };

        const target = {
          reportingYear: isNaN(parseInt(data[7])) ? null : parseInt(data[7]),
          baselineYear: isNaN(parseInt(data[9])) ? null : parseInt(data[9]),
          baselineEmissionsCO2: isNaN(parseInt(data[10])) ? null : parseInt(data[10]),
          reductionTargetPercentage: isNaN(parseInt(data[12])) ? null : parseInt(data[12]),
          targetYear: isNaN(parseInt(data[13])) ? null : parseInt(data[13]),
          comment: data[16].trim(),
          sector: data[9].trim(),
        };

        obj.organisation = organisation;
        obj.country = country;
        obj.city = city;
        obj.targetType = targetType;
        obj.target = target;

        records.push(obj);
      })
      .on("end", async () => {
        console.log("Read all records in csv", csvFilePath, "// Rows:", records.length);
        console.log("Inserting records into database...");

        try {
          for (const record of records) {
            // create country
            const newCountry = await Countries.updateOne(
              { name: record.country.name },
              { $set: { name: record.country.name, regionName: record.country.regionName } },
              { upsert: true }
            );

            // create city
            const newCity = await Cities.findOneAndUpdate(
              { name: record.city.name },
              {
                $setOnInsert: {
                  name: record.city.name,
                  C40Status: record.city.C40Status,
                  country_id: newCountry.upsertedId ? newCountry.upsertedId._id : undefined,
                },
              },
              { upsert: true, new: true }
            );

            const newPopulation = await Populations.create({
              count: record.city.population.count,
              year: record.city.population.year,
              city_id: newCity._id,
            });

            // create organisation
            const newOrganisation = await Organisations.findOneAndUpdate(
              { accountNo: record.organisation.accountNo },
              {
                $setOnInsert: {
                  name: record.organisation.name,
                  accountNo: record.organisation.accountNo,
                  city_id: newCity._id,
                  country_id: newCountry.upsertedId ? newCountry.upsertedId._id : undefined,
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

            // new target type
            const newTargetType = await TargetTypes.findOneAndUpdate(
              { type: record.targetType.type },
              { $setOnInsert: { type: record.targetType.type } },
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
              organisation_id: newOrganisation._id,
              sector_id: newSector._id,
              targetType_id: newTargetType._id,
            });
          }

          console.log("Scraper 2 done!");
          resolve("Scraper 2 done!");
        } catch (error) {
          reject(error);
        }
      });
  });
};

export default scraper2;
