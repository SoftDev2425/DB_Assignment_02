<<<<<<< HEAD
import Cities from "../models/cities";
import Countries from "../models/countries";

// 2 - Owais
export const getCitiesByStatusType = async (statusType: string) => {
  try {
    return "Hello from getCitiesByStatusType!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 3 - Owais
export const GetAvgEmissionForC40AndNonC40 = async () => {
  try {
    return "Hello from GetAvgEmissionForC40AndNonC40!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
=======

>>>>>>> master

// 4 - Owais
export const getCityEmissionTargets = async (city: string) => {
  try {
    return "Hello from getCityEmissionTargets!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 5 - Rasmus
export const getCitiesWithEmissionsRanking = async (statusType: "ASC" | "DESC" = "DESC") => {
  try {
    return "Hello from getCitiesWithEmissionsRanking!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 6 - Rasmus
export const getCitiesEmisions = async () => {
  try {
    return "Hello from getCitiesEmisions!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 7 - Rasmus
export const getC40CitiesWithEmissions = async (c40: boolean = true) => {
  try {
    return "Hello from getC40CitiesWithEmissions!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 8 - Andreas
export const getTotalEmissionsForRegions = async () => {
  try {
    // get all cities and populate the country on countryID
    const cities = await Cities.find({}).populate({
      path: "country_id",
      model: Countries,
    });
    return cities;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 9 - Andreas
export const getTotalEmissionsForCountries = async () => {
  try {
    return "Hello from getTotalEmissionsForCountries!";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

