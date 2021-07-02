const apiRouter = require("express");
const ticketRouter = apiRouter.Router();

const { createTicket, getAllTickets, deleteTicket } = require("../db");

ticketRouter.get("/", async (req, res, next) => {
  try {
    const tickets = await getAllTickets();
    console.log("ticket results", tickets);
    res.send({ tickets });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ticketRouter.post("/create", async (req, res, next) => {
  try {
    const { callname, callnumber, gvrid, notes, ntcflag, date } = req.body;
    const tickets = await createTicket(
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date
    );
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ticketRouter.post("/delete", async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log("backend", id);
    const tickets = await deleteTicket(id);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ticketRouter;
