import { Client } from "pg";
import {
  createTableQuery,
  insertMockDataQuery,
  nowQuery,
  tableExistsQuery,
} from "./queries/init";
import generateMockData from "../helpers/generateMockData";

//Paste mock data to the table
const _createTableWithContent = async (client: Client) => {
  console.log(`Table ${process.env.PGTABLE} doesn't exists, so creating it`);

  await client.query(createTableQuery, (err, res) => {
    if (err) return console.error("Failed creating table: " + err.message);

    return console.log("2. Table successfully created");
  });

  const mockData = await generateMockData();
  console.log("3. Inserting mock data...please wait");
  for (const data of mockData) {
    await client.query(insertMockDataQuery, [
      data.title,
      data.amount,
      data.distance,
      data.date,
    ]);
  }
  console.log("4. Database initialization finished");
};

//Check for the connection to database and if table is exists
const init = async () => {
  console.log("Database initialization started");

  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
  });
  await client.connect();

  await client.query(nowQuery, (err, res) => {
    if (err) return console.error(`Failed connecting to DB`);

    return console.log(`1. Connected to DB`);
  });

  await client.query(tableExistsQuery).then((res) => {
    if (res) {
      if (res.rows[0].exists)
        return console.log(
          `Table ${process.env.PGTABLE} exists, so initialization finished without inserting mock data`
        );

      _createTableWithContent(client);
    }
  });
};

export default init;
