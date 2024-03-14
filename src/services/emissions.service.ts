import { mssqlConfig } from "../utils/db/dbConnection";

// 1
export const getTotalEmissionsByCity = async (city: string) => {
  try {
    return "Hello from getTotalEmissionsByCity!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 2
export const getCitiesByStatusType = async (statusType: string) => {
  try {
    return "Hello from getCitiesByStatusType!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 3
export const GetAvgEmissionForC40AndNonC40 = async () => {
  try {
    return "Hello from GetAvgEmissionForC40AndNonC40!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 4
export const getCityEmissionTargets = async (city: string) => {
  try {
    return "Hello from getCityEmissionTargets!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 5
export const getCitiesWithEmissionsRanking = async (statusType: "ASC" | "DESC" = "DESC") => {
  try {
    return "Hello from getCitiesWithEmissionsRanking!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 6
export const getCitiesEmisions = async () => {
  try {
    return "Hello from getCitiesEmisions!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 7
export const getC40CitiesWithEmissions = async (c40: boolean = true) => {
  try {
    return "Hello from getC40CitiesWithEmissions!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 8
export const getTotalEmissionsForRegions = async () => {
  try {
    return "Hello from getTotalEmissionsForRegions!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 9
export const getTotalEmissionsForCountries = async () => {
  try {
    return "Hello from getTotalEmissionsForCountries!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 10
export const getContriesMostProminentGasses = async () => {
  try {
    return "Hello from getContriesMostProminentGasses!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
