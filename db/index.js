const { Client } = require("pg");
const bcrypt = require("bcrypt");
const DB_NAME = "tickets";

const client = new Client(
  process.env.DATABASE_URL ||
    `postgressql://postgres:james@localhost:5432/${DB_NAME}`
);

//TESTING FETCH
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
  const { rows } = await client.query(
    `SELECT username, email
    FROM users;
  `
  );

  return rows;
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

async function createTicket(callname, callnumber, gvrid, notes, ntcflag, date) {
  try {
    const result = await client.query(
      `
      INSERT INTO ticket(callname, callnumber, gvrid, notes, ntcflag, date)
      VALUES ($1, $2, $3, $4, $5, $6);
    `,
      [callname, callnumber, gvrid, notes, ntcflag, date]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

async function getAllTickets() {
  const { rows } = await client.query(
    `SELECT *
    FROM ticket;
  `
  );

  return rows;
}

async function deleteTicket(id) {
  const { rows } = await client.query(
    `DELETE FROM ticket
    WHERE id=$1;
  `,
    [id]
  );

  return rows;
}

async function updateTicket(id, fields = {}) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");

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
};
