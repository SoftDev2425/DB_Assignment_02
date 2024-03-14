import dotenv from "dotenv";
dotenv.config();

import sql from "mssql";
import { mssqlConfig } from "../utils/db/dbConnection";

import scraper1 from "./scraper1/scraper";
import scraper2 from "./scraper2/scraper";
import scraper3 from "./scraper3/scraper";
import scraper4 from "./scraper4/scraper";
import scraper5 from "./scraper5/scraper";

export const scrapeAndInsertIntoDatabase = async () => {
  try {
    await scraper1();
    await scraper2();
    await scraper3();
    await scraper4();
    await scraper5();

    console.log("All scrapers done! Now onto adding the stored procedures :)\n Run 'npm run sp'");
  } catch (error) {
    console.error("Error occurred while running scrapers:", error);
  }
};

scrapeAndInsertIntoDatabase();
