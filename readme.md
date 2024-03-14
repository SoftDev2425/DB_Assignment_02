# DB Assignment 1

## Table of content

- [About](#about)
- [How to run](#how-to-run)
- [API Docs](#api-docs)

## About

Group E:

- Andreas Fritzbøger
- Owais Dashti
- Rasmus Taul

Our plan involved developing a simple server where the developer can access it,
enabling interaction with the underlying database layer through various procedures
corresponding to our 10 relevant questions to the given datasets ([found here](https://github.com/SoftDev2425/DB_Assignment_01/tree/master/src/scraper/data)). Read the report [here](https://typst.app/project/r-3FsUMzydTBaRJdngSmSY).

## How to run

### Step 1: Clone the project

```
git clone https://github.com/SoftDev2425/DB_Assignment_01.git
```

### Step 2: Install dependencies

Open the project in a terminal and run:

```
npm install
```

### Step 3: Configure DB-connection

1. Create a new database
2. Under the folder `src/utils/db` create a copy of the file `dbConnection.template.ts` and rename it to `dbConnection.ts`
3. In the file `dbConnection.ts` apply your own database configuration (we are well aware that .env could potentialy be a better solution, but they can't be loaded when running ts-node in the upcoming way).
   <br>Add the following values to the `mssqlConfig`-object:
   - **database** (database name)
   - **user** (database username)
   - **password** (database password)

### Step 4: Run database scripts + add data + stored procedures

1. Firstly copy the content of the `table.sql` script found [HERE](https://github.com/SoftDev2425/DB_Assignment_01/blob/master/sql/tables.sql) and execute it in your own database.

2. Secondly, to add data to the database, open a new terminal and run

```
npm run scrape
```

This will read the data from all .csv-files and add them to your database.

3. Now it's time to create the stored procedures. For this simply run

```
npm run sp
```

Now you should be ready to explore the data via our API.

### Step 5: Run server

To start the server run the following command:

```
npm run dev
```

The API will now be available at [http://localhost:3000](http://localhost:3000/) || [http://0.0.0.0:3000](http://0.0.0.0:3000/). Check out the API docs below.

## Api docs:

[DOCS](https://docs.google.com/document/d/1EWZ7qr1UmAC5B766JUoVxhJM8ysa296O6u1XBFe5CsI/edit?usp=sharing) \* includes sample responses

## Question 1: What are the total emissions (metric tonnes CO2e) for a specific city?

### /api/emissions/total/:cityName

Example call: [/api/emissions/total/Johannesburg](http://localhost:3000/api/emissions/total/Johannesburg)<br>

## Question 2: What are the cities that have a decrease or increase in emissions?

### /api/emissions/status/:statusType

Example call: [/api/emissions/status/increased](http://localhost:3000/api/emissions/status/increased)<br>
variables ("increased" || "decreased")

## Question 3: For cities participating in the C40 network, what is the average total emission of all cities, and how does it compare to all non-C40 cities?

### /api/emissions/avg

Example call: [/api/emissions/avg](http://localhost:3000/api/emissions/avg)<br>

## Question 4: What are the different cities emission targets?

### /api/emissions/targets/:cityName

Example call: [/api/emissions/targets/Copenhagen](http://localhost:3000/api/emissions/targets/Copenhagen)<br>

## Question 5: Which cities have the highest total emission?

### /api/emissions/ranked/:sortBy?

Example call (default): [/api/emissions/ranked](http://localhost:3000/api/emissions/ranked)<br>
Example call: [/api/emissions/ranked/asc](http://localhost:3000/api/emissions/ranked/asc)<br>
Example call: [/api/emissions/ranked/desc](http://localhost:3000/api/emissions/ranked/desc)<br>

## Question 6: What are the emission of the different cities?

### /api/emissions/cities

Example call: [/api/emissions/cities](http://localhost:3000/api/emissions/cities)<br>

## Question 7: Cities that participate in the c40 network and their emissions.

### /api/emissions/cities/c40/:isC40?

Example call (default true): [/api/emissions/cities/c40](http://localhost:3000/api/emissions/cities/c40)<br>
Example call: [/api/emissions/cities/c40/true](http://localhost:3000/api/emissions/cities/c40/true)<br>
Example call: [/api/emissions/cities/c40/false](http://localhost:3000/api/emissions/cities/c40/false)

## Question 8: What is the total emission for the different regions?

### /api/emissions/regions

Example call: [/api/emissions/regions](http://localhost:3000/api/emissions/regions)<br>

## Question 9: What is the total emission for the different countries?

### /api/emissions/countries

Example call: [/api/emissions/countries](http://localhost:3000/api/emissions/countries)<br>

## Question 10: What are the most prominent gasses based on country?

### /api/emission/countries/gas

Example call: [/api/emissions/countries/gas](http://localhost:3000/api/emissions/countries/gas)
