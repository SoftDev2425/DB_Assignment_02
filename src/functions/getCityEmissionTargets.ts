import Cities from "../models/cities";
import Organisations from "../models/organisations";
import Targets from "../models/targets";

// 4
export const getCityEmissionTargets = async (cityName: string) => {
  try {
    const city = await Cities.findOne({
      name: { $regex: new RegExp(cityName, "i") },
    });

    if (!city) {
      throw new Error("City not found");
    }

    const organisation = await Organisations.findOne({
      city_id: city._id,
    });

    if (!organisation) {
      throw new Error("Organisation not found");
    }

    const targets = await Targets.find({
      organisation_id: organisation._id,
    }); // populate not working

    if (!targets) {
      throw new Error("Targets not found");
    }

    return {
      city,
      organisation,
      targets,
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
