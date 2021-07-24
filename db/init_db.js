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
  updateTicket,
} = require("./index");

let callname = "John Two";
let callnumber = "9045551234";
let gvrid = "896543";
let notes = "Testing the notes and stuff";
let ntcflag = false;
let date = "11/12/1980";
let user = "james";
let email = "";
let gpid = "202123-0089";
let gpcust = "AHA0001";
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
          callname varchar,
          callnumber varchar,
          gvrid varchar,
          notes varchar,
          ntcflag boolean,
          date varchar,
          userid varchar,
          email varchar,
          gpid varchar,
          gpcust varchar
);
      `);
  } catch (error) {
    throw error;
  }
}

// CREATE TABLE ticket (
//   id SERIAL PRIMARY KEY,
//   callname varchar,
//   callnumber varchar,
//   gvrid varchar,
//   notes varchar,
//   ntcflag boolean,
//   date varchar,
//   userid varchar
// );

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS ticket;
      `);
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    await new Promise((resolve, reject) => {
      bcrypt.hash(
        "SocialD123",
        SALT_COUNT,
        async function (err, hashedPassword) {
          const nels = await createUser({
            username: "nels",
            password: hashedPassword,
            email: "test1@yahoo.com",
          });
          resolve();
        }
      );
    });

    await new Promise((resolve, reject) => {
      bcrypt.hash(
        "K@elyn819",
        SALT_COUNT,
        async function (err, hashedPassword) {
          const james = await createUser({
            username: "james",
            password: hashedPassword,
            email: "test2@yahoo.com",
          });
          resolve();
        }
      );
    });

    await new Promise((resolve, reject) => {
      bcrypt.hash("gft2021", SALT_COUNT, async function (err, hashedPassword) {
        const scott = await createUser({
          username: "scott",
          password: hashedPassword,
          email: "test3@yahoo.com",
        });
        resolve();
        console.log("Completed");
      });
    });

    await new Promise((resolve, reject) => {
      bcrypt.hash("gft2021", SALT_COUNT, async function (err, hashedPassword) {
        const josh = await createUser({
          username: "josh",
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

async function buildTicket(
  callname,
  callnumber,
  gvrid,
  notes,
  ntcflag,
  date,
  user,
  email,
  gpid,
  gpcust
) {
  console.log("Starting to build tickets");
  try {
    const ticket1 = await createTicket(
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
      user,
      email,
      gpid,
      gpcust
    );
    const ticket2 = await createTicket(
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
      user,
      email,
      gpid,
      gpcust
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

async function testUpdate() {
  let callname = "testing";
  callnumber = "12345";
  gvrid = "1234556";
  notes = "updating the ticket";
  ntcflag = false;
  date = "07/02/2021";
  id = 2;
  user = "james";
  try {
    let del = await updateTicket(
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
      id,
      user
    );
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
    console.log(callname, email, gpid, "new Stuff");
    await createTables();
    await createInitialUsers();
    await buildTicket(
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
      user,
      email,
      gpid,
      gpcust
    );
    // await testDelete(1);
    // await testUpdate();
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
