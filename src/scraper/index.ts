import dotenv from "dotenv";
dotenv.config();

import sql from "mssql";
import { mssqlConfig } from "../utils/db/dbConnection";

import scraper1 from "./scraper1/scraper";
import scraper2 from "./scraper2/scraper";
import scraper3 from "./scraper3/scraper";
import scraper4 from "./scraper4/scraper";
import scraper5 from "./scraper5/scraper";

export const scrapeAndInsertIntoDatabase = async (con?: any) => {
  try {
    if (!con) {
      con = await sql.connect(mssqlConfig);
    }

    await scraper1(con);
    await scraper2(con);
    await scraper3(con);
    await scraper4(con);
    await scraper5(con);

    await con.close();

    console.log("All scrapers done! Now onto adding the stored procedures :)\n Run 'npm run sp'");
  } catch (error) {
    console.error("Error occurred while running scrapers:", error);
  }
};

scrapeAndInsertIntoDatabase();
