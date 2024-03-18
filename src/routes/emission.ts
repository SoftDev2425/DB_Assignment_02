import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  GetAvgEmissionForC40AndNonC40,
  getCitiesByStatusType,
  getCitiesWithEmissionsRanking,
  getCityEmissionTargets,
  getTotalEmissionsForRegions,
  getTotalEmissionsForCountries,
  getC40CitiesWithEmissions,
  getCitiesEmisions,
} from "../services/emissions.service";
import { getTotalEmissionsByCity } from "../functions/getTotalEmissionsByCity";
import { getCountriesMostProminentGasses } from "../functions/getCountriesMostProminentGasses";

interface Params {
  cityName: string;
  statusType: string;
  sortBy: "ASC" | "DESC";
  isC40: string;
}

export async function emissionRoutes(fastify: FastifyInstance) {
  // 1
  fastify.get("/total/:cityName", async function (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
      const city = request.params.cityName as string;
      return await getTotalEmissionsByCity(city.trim());
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed getting total emissions. Please try again later." });
    }
  });

  // 2
  fastify.get("/status/:statusType", async function (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
      const statusType = request.params.statusType;
      const data = await getCitiesByStatusType(statusType);
      console.log(data);
      // return data.map((d) => {
      //   return {
      //     city: {
      //       id: d.CityID,
      //       name: d.CityName,
      //       population: d.Population,
      //       c40Status: d.c40Status,
      //     },
      //     emission: {
      //       id: d.EmissionID,
      //       reportingYear: d.ReportingYear ? d.ReportingYear : "N/A",
      //       total: d.TotalCityWideEmissionsCO2 ? d.TotalCityWideEmissionsCO2 : "N/A",
      //       totalScope1Emission: d.TotalScope1_CO2 ? d.TotalScope1_CO2 : "N/A",
      //       totalScope2Emission: d.TotalScope2_CO2 ? d.TotalScope2_CO2 : "N/A",
      //       change: d.EmissionStatus ? d.EmissionStatus : "N/A",
      //       description: d.Description ? d.Description : "N/A",
      //       comment: d.Comment ? d.Comment : "No comment",
      //     },
      //   };
      // });
      return data;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: error.message });
    }
  });

  // 3
  fastify.get("/avg", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const emissions = await GetAvgEmissionForC40AndNonC40();
      return emissions;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed getting emissions. Please try again later." });
    }
  });

  // 4
  fastify.get("/targets/:cityName", async function (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
      const city = request.params.cityName;
      const data = await getCityEmissionTargets(city);
      console.log(data);
      // return data.map((d) => {
      //   return {
      //     city: {
      //       id: d.cityID,
      //       name: d.cityName,
      //       population: d.population,
      //       c40Status: d.c40Status,
      //     },
      //     organisation: {
      //       name: d.organisationName,
      //       accountNo: d.organisationNo,
      //     },
      //     target: {
      //       id: d.targetID,
      //       sector: d.sectorName ? d.sectorName : "N/A",
      //       reportingYear: d.reportingYear ? d.reportingYear : "N/A",
      //       baselineYear: d.baselineYear ? d.baselineYear : "N/A",
      //       targetYear: d.targetYear ? d.targetYear : "N/A",
      //       reductionTargetPercentage: d.reductionTargetPercentage ? d.reductionTargetPercentage : "N/A",
      //       baselineEmissionsCO2: d.baselineEmissionsCO2 ? d.baselineEmissionsCO2 : "N/A",
      //       comment: d.comment ? d.comment : "No comment",
      //     },
      //   };
      // });
      return data;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: error.message });
    }
  });

  // 5
  fastify.get("/ranked/:sortBy?", async function (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
      if (!request.params.sortBy) {
        const data = await getCitiesWithEmissionsRanking();
        return data;
      }

      const sortBy = request.params.sortBy.toUpperCase();
      if (sortBy !== "ASC" && sortBy !== "DESC") {
        throw new Error("Invalid sorting type. Please use 'ASC' or 'DESC'");
      }

      const data = await getCitiesWithEmissionsRanking(sortBy);
      return data;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: error.message });
    }
  });

  // 6
  fastify.get("/cities", async function (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
      const data = await getCitiesEmisions();
      // return data.map((d) => {
      //   return {
      //     city: {
      //       id: d.CityID,
      //       name: d.CityName,
      //       population: d.Population,
      //       c40Status: d.C40Status,
      //     },
      //     country: {
      //       id: d.CountryID,
      //       name: d.CountryName,
      //       region: d.RegionName,
      //     },
      //     emission: {
      //       id: d.emissionID,
      //       reportingYear: d.reportingYear ? d.reportingYear : "N/A",
      //       measurementYear: d.measurementYear ? d.measurementYear : "N/A",
      //       total: d.TotalCityWideEmissionsCO2 ? d.TotalCityWideEmissionsCO2 : "N/A",
      //       totalScope1Emission: d.TotalScope1_CO2 ? d.TotalScope1_CO2 : "N/A",
      //       totalScope2Emission: d.TotalScope2_CO2 ? d.TotalScope2_CO2 : "N/A",
      //       methodology: d.methodology ? d.methodology : "N/A",
      //       methodologyDetails: d.methodologyDetails ? d.methodologyDetails : "N/A",
      //       gassesIncluded: d.gassesIncluded ? d.gassesIncluded : "N/A",
      //       change: d.EmissionStatus ? d.EmissionStatus : "N/A",
      //       description: d.Description ? d.Description : "N/A",
      //       comment: d.Comment ? d.Comment : "No comment",
      //     },
      //   };
      // });
      return data;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: error.message });
    }
  });

  // 7
  fastify.get("/cities/c40/:isC40?", async function (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
      // if (!request.params.isC40) {
      //   const data = await getC40CitiesWithEmissions();
      //   return data.map((d) => {
      //     return {
      //       city: {
      //         id: d.CityID,
      //         name: d.CityName,
      //         population: d.Population,
      //         c40Status: d.C40Status,
      //       },
      //       country: {
      //         id: d.CountryID,
      //         name: d.CountryName,
      //         region: d.RegionName,
      //       },
      //       emission: {
      //         id: d.emissionID,
      //         reportingYear: d.reportingYear ? d.reportingYear : "N/A",
      //         measurementYear: d.measurementYear ? d.measurementYear : "N/A",
      //         total: d.TotalCityWideEmissionsCO2 ? d.TotalCityWideEmissionsCO2 : "N/A",
      //         totalScope1Emission: d.TotalScope1_CO2 ? d.TotalScope1_CO2 : "N/A",
      //         totalScope2Emission: d.TotalScope2_CO2 ? d.TotalScope2_CO2 : "N/A",
      //         methodology: d.methodology ? d.methodology : "N/A",
      //         methodologyDetails: d.methodologyDetails ? d.methodologyDetails : "N/A",
      //         gassesIncluded: d.gassesIncluded ? d.gassesIncluded : "N/A",
      //         change: d.EmissionStatus ? d.EmissionStatus : "N/A",
      //         description: d.Description ? d.Description : "N/A",
      //         comment: d.Comment ? d.Comment : "No comment",
      //       },
      //     };
      //   });
      // }

      // const isC40 = request.params.isC40.toLowerCase() === "true" ? true : false;

      // const data = await getC40CitiesWithEmissions(isC40);
      // return data.map((d) => {
      //   return {
      //     city: {
      //       id: d.CityID,
      //       name: d.CityName,
      //       population: d.Population,
      //       c40Status: d.C40Status,
      //     },
      //     country: {
      //       id: d.CountryID,
      //       name: d.CountryName,
      //       region: d.RegionName,
      //     },
      //     emission: {
      //       id: d.emissionID,
      //       reportingYear: d.reportingYear ? d.reportingYear : "N/A",
      //       measurementYear: d.measurementYear ? d.measurementYear : "N/A",
      //       total: d.TotalCityWideEmissionsCO2 ? d.TotalCityWideEmissionsCO2 : "N/A",
      //       totalScope1Emission: d.TotalScope1_CO2 ? d.TotalScope1_CO2 : "N/A",
      //       totalScope2Emission: d.TotalScope2_CO2 ? d.TotalScope2_CO2 : "N/A",
      //       methodology: d.methodology ? d.methodology : "N/A",
      //       methodologyDetails: d.methodologyDetails ? d.methodologyDetails : "N/A",
      //       gassesIncluded: d.gassesIncluded ? d.gassesIncluded : "N/A",
      //       change: d.EmissionStatus ? d.EmissionStatus : "N/A",
      //       description: d.Description ? d.Description : "N/A",
      //       comment: d.Comment ? d.Comment : "No comment",
      //     },
      //   };
      // });
      return "hi";
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: error.message });
    }
  });

  // 8
  fastify.get("/regions", async function (request, reply: FastifyReply) {
    try {
      return await getTotalEmissionsForRegions();
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed getting regions' emissions. Please try again later." });
    }
  });

  // 9
  fastify.get("/countries", async function (request, reply: FastifyReply) {
    try {
      const data = await getTotalEmissionsForCountries();
      // return {
      //   countries: data.map((d) => ({
      //     id: d.CountryID,
      //     name: d.CountryName ? d.CountryName : "N/A",
      //     totalEmission: d.TotalEmissions.toLocaleString() ? d.TotalEmissions.toLocaleString() : "N/A",
      //   })),
      // };
      return "hi";
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed getting all countries' total emissions. Please try again later." });
    }
  });

  // 10
  fastify.get("/countries/gas", async function (request, reply: FastifyReply) {
    try {
      const data = await getCountriesMostProminentGasses();
      console.log(data);
      
      return data.map((d) => {
        return {
          id: d.id,
          countryName: d.countryName,
          gasses: Array.from(
            new Set(
              d.gasses.trim()
                .split(/[;\s]+/)
                .map((g: string) => g.trim())
            )
          ).join("; "),
        };
      });

    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed getting prominent gasses. Please try again later." });
    }
  });
}
