const apiRouter = require("express");
const ticketRouter = apiRouter.Router();

const {
  createTicket,
  getAllTickets,
  deleteTicket,
  updateTicket,
} = require("../db");

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

// ticketRouter.post("/update", async (req, res, next) => {
//   try {
//     console.log("routes", req.body);
//     const { callname, callnumber, gvrid, notes, ntcflag, date, id } = req.body;
//     const tickets = await updateTicket(
//       callname,
//       callnumber,
//       gvrid,
//       notes,
//       ntcflag,
//       date,
//       id
//     );
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

ticketRouter.post("/update", async (req, res, next) => {
  console.log("request", req.body);
  const { id, callname, callnumber, gvrid, notes, ntcflag, date } = req.body;

  const updateFields = {};

  if (callname) {
    updateFields.callname = callname;
  }

  if (callnumber) {
    updateFields.callnumber = callnumber;
  }

  if (gvrid) {
    updateFields.gvrid = gvrid;
  }

  if (notes) {
    updateFields.notes = notes;
  }

  if (ntcflag) {
    updateFields.ntcflag = ntcflag;
  }

  if (date) {
    updateFields.date = date;
  }

  console.log("fields", updateFields);
  try {
    const updatedTicket = await updateTicket(id, updateFields);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ticketRouter;
