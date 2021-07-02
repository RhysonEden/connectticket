const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const {
  client,
  getAllUsers,
  createUser,
  getUsersByID,
  getUserByUsername,
  createTicket,
  getAllTickets,
  deleteTicket,
} = require("./index");

const callname = "John Doe";
const callnumber = "(904)555-1234";
const gvrid = "896543";
const notes = "Testing the notes and stuff";
const ntcflag = false;
const date = "11/12/1980";

async function createTables() {
  try {
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar UNIQUE NOT NULL,
          password varchar NOT NULL,
          email varchar NOT NULL
        );
        CREATE TABLE ticket (
          id SERIAL PRIMARY KEY,
          callname varchar NOT NULL,
          callnumber varchar NOT NULL,
          gvrid varchar NOT NULL,
          notes varchar NOT NULL,
          ntcflag boolean NOT NULL,
          date varchar NOT NULL
        )
      `);
  } catch (error) {
    throw error;
  }
}

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS ticket;

      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");
    await new Promise((resolve, reject) => {
      console.log("First User");
      bcrypt.hash("bertie99", SALT_COUNT, async function (err, hashedPassword) {
        const nels = await createUser({
          username: "nels",
          password: hashedPassword,
          email: "test1@yahoo.com",
        });
        resolve();
        console.log("Completed");
      });
    });

    await new Promise((resolve, reject) => {
      console.log("Second User");
      bcrypt.hash("bertie99", SALT_COUNT, async function (err, hashedPassword) {
        const james = await createUser({
          username: "james",
          password: hashedPassword,
          email: "test2@yahoo.com",
        });
        resolve();
        console.log("Completed");
      });
    });

    await new Promise((resolve, reject) => {
      console.log("Third User");
      bcrypt.hash("bertie99", SALT_COUNT, async function (err, hashedPassword) {
        const scott = await createUser({
          username: "scott",
          password: hashedPassword,
          email: "test3@yahoo.com",
        });
        resolve();
        console.log("Completed");
      });
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function buildTicket(callname, callnumber, gvrid, notes, ntcflag, date) {
  try {
    const ticket1 = await createTicket(
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date
    );
    const ticket2 = await createTicket(
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date
    );
  } catch (error) {
    throw error;
  }
}

async function testDelete(id) {
  try {
    let del = await deleteTicket(id);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    console.log;
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await buildTicket(callname, callnumber, gvrid, notes, ntcflag, date);
    await testDelete(1);
    const userNels = await getUserByUsername("nels");
    const userJames = await getUserByUsername("james");
    const userScott = await getUserByUsername("scott");
    const users = await getAllUsers();
    const user1 = await getUsersByID(1);
    const allTix = await getAllTickets();
    console.log("username", userNels, userJames, userScott);
    console.log("All users", users);
    console.log("User #1", user1);
    console.log("Ticket", allTix);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
