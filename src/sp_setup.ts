import fs from "fs";
import sql from "mssql";
import { mssqlConfig } from "./utils/db/dbConnection";

const sp_setup = async () => {
  var sp1 = fs.readFileSync("./sql/procedures/1.sql").toString();
  var sp2 = fs.readFileSync("./sql/procedures/2.sql").toString();
  var sp3 = fs.readFileSync("./sql/procedures/3.sql").toString();
  var sp4 = fs.readFileSync("./sql/procedures/4.sql").toString();
  var sp5 = fs.readFileSync("./sql/procedures/5.sql").toString();
  var sp6 = fs.readFileSync("./sql/procedures/6.sql").toString();
  var sp7 = fs.readFileSync("./sql/procedures/7.sql").toString();
  var sp8 = fs.readFileSync("./sql/procedures/8.sql").toString();
  var sp9 = fs.readFileSync("./sql/procedures/9.sql").toString();
  var sp10 = fs.readFileSync("./sql/procedures/10.sql").toString();

  const con = await sql.connect(mssqlConfig);

  console.log("Adding stored procedures...");

  await Promise.all([
    con.query(sp1),
    con.query(sp2),
    con.query(sp3),
    con.query(sp4),
    con.query(sp5),
    con.query(sp6),
    con.query(sp7),
    con.query(sp8),
    con.query(sp9),
    con.query(sp10),
  ]);

  console.log("Stored procedures added successfully!");

  await con.close();
};

sp_setup();
