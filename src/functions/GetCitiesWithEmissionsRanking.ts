import Cities from "../models/cities";

export const getCitiesWithEmissionsRanking = async (Order: string) => {
  let sortOrder = Order.toUpperCase() === "ASC" ? -1 : 1;

  try {
    const cities = await Cities.find().sort({ emssions: sortOrder });
    return cities;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
