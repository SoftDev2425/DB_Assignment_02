import { mssqlConfig } from "../utils/db/dbConnection";
import sql from "mssql";

// 1
export const getTotalEmissionsByCity = async (city: string) => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetTotalEmissionByCity @CityName = ${city};`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 2
export const getCitiesByStatusType = async (statusType: string) => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetCitiesByStatusType @EmissionStatus = ${statusType};`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 3
export const GetAvgEmissionForC40AndNonC40 = async () => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetAvgEmissionForC40AndNonC40;`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 4
export const getCityEmissionTargets = async (city: string) => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetEmissionTargetsForCity @CityName = ${city};`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 5
export const getCitiesWithEmissionsRanking = async (statusType: "ASC" | "DESC" = "DESC") => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetCitiesWithEmissionsRanking @Order = ${statusType}`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 6
export const getCitiesEmisions = async () => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetCitiesEmissions;`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 7
export const getC40CitiesWithEmissions = async (c40: boolean = true) => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetC40CitiesWithEmissions @C40Status = ${c40 ? 1 : 0};`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 8
export const getTotalEmissionsForRegions = async () => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetTotalEmissionsForRegions;`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 9
export const getTotalEmissionsForCountries = async () => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetTotalEmissionsForCountries;`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 10
export const getContriesMostProminentGasses = async () => {
  try {
    await sql.connect(mssqlConfig);
    const result = await sql.query`EXEC GetGassesByCountry;`;
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
