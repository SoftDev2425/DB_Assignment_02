import GHG_Emissions from "../models/GHG_Emissions";
import Countries from "../models/countries";

async function getNewestReportingYear() {
    const newestYear = await GHG_Emissions.findOne().sort('-reportingYear');
    return newestYear?.reportingYear;
}

export const getTotalEmissionsForRegions = async () => {
    try {
        const newestReportingYear = await getNewestReportingYear();
        
        const regions = await GHG_Emissions.aggregate([
            {
              $match: { reportingYear: newestReportingYear },
            },
            {
              $lookup: {
                from: 'organisations',
                localField: 'organisation_id',
                foreignField: '_id',
                as: 'organisation',
              },
            },
            {
              $lookup: {
                from: 'countries',
                localField: 'organisation.country_id',
                foreignField: '_id',
                as: 'country',
              },
            },
            // {
            //   $group: {
            //     _id: '$country.regionName',
            //     TotalEmissions: { $sum: '$totalCityWideEmissionsCO2' },
            //   },
            // },
          ]);
          
        return regions;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}