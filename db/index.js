const { Client } = require("pg");
const bcrypt = require("bcrypt");
const DB_NAME = "tickets";

const client = new Client(
  process.env.DATABASE_URL ||
    `postgressql://postgres:james@localhost:5432/${DB_NAME}`
);

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

async function createUser({ username, password, email }) {
  try {
    const result = await client.query(
      `
      INSERT INTO users(username, password, email)
      VALUES ($1, $2, $3);
    `,
      [username, password, email]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [userName]
    );
    if (!rows || !rows.length) return null;
    const [user] = rows;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const matchingPassword = await bcrypt.compareSync(password, user.password);
    if (!matchingPassword) return;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `SELECT username, email
    FROM users;
  `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUsersByID(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE id=$1;
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getTicketById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM ticket
    WHERE id=$1;
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function createTicket(
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
  console.log(
    callname,
    callnumber,
    gvrid,
    notes,
    ntcflag,
    date,
    user,
    email,
    gpid,
    gpcust,
    "new stuff"
  );
  try {
    const result = await client.query(
      `
      INSERT INTO ticket(callname, callnumber, gvrid, notes, ntcflag, date, userid, email, gpid, gpcust)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `,
      [
        callname,
        callnumber,
        gvrid,
        notes,
        ntcflag,
        date,
        user,
        email,
        gpid,
        gpcust,
      ]
    );
    console.log("Result", result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllTickets() {
  console.log("Hi Nels!!");
  try {
    const { rows } = await client.query(
      `SELECT *
    FROM ticket;
  `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteTicket(id) {
  try {
    const { rows } = await client.query(
      `UPDATE ticket
    SET ntcflag=true
    WHERE id=$1;
  `,
      [id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function openTicket(id) {
  console.log("opening", id);
  try {
    const { rows } = await client.query(
      `UPDATE ticket
    SET ntcflag=false
    WHERE id=$1;
  `,
      [id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateTicket(id, fields = {}) {
  try {
    console.log(fields, "fields");
    const setString = Object.keys(fields)
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");
    console.log(setString);
    try {
      const {
        rows: [result],
      } = await client.query(
        `
      UPDATE ticket
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
        Object.values(fields)
      );
      return result;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function searchPartsNumber(gvrid) {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM ticket
    WHERE gvrid LIKE '%${gvrid}%'
    `);
    return { rows };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllUsers,
  createUser,
  getUsersByID,
  getUserByUsername,
  getUser,
  createTicket,
  getAllTickets,
  deleteTicket,
  getTicketById,
  updateTicket,
  searchPartsNumber,
  openTicket,
};
