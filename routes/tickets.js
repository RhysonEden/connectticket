const apiRouter = require("express");
const ticketRouter = apiRouter.Router();

const {
  createTicket,
  getAllTickets,
  deleteTicket,
  updateTicket,
  searchPartsNumber,
  openTicket,
} = require("../db");

ticketRouter.get("/", async (req, res, next) => {
  try {
    const tickets = await getAllTickets();
    // let tix = sessionStorage.setItem("data", JSON.stringify(tickets));
    res.send({ tickets });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ticketRouter.post("/create", async (req, res, next) => {
  try {
    const {
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
    } = req.body;
    const tickets = await createTicket(
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
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ticketRouter.post("/delete", async (req, res, next) => {
  try {
    const { id } = req.body;
    const tickets = await deleteTicket(id);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ticketRouter.post("/open", async (req, res, next) => {
  try {
    const { id } = req.body;
    const tickets = await openTicket(id);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ticketRouter.get("/search/:id", async (req, res, next) => {
  const gvrid = req.params.id;
  try {
    const part = await searchPartsNumber(gvrid);
    res.send({ part });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ticketRouter.post("/update", async (req, res, next) => {
  const {
    callname,
    callnumber,
    gvrid,
    notes,
    ntcflag,
    // date,
    id,
    user,
    email,
    gpid,
    gpcust,
  } = req.body;

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

  // if (date) {
  //   updateFields.date = date;
  // }

  // if (user) {
  //   updateFields.userid = userid;
  // }

  if (email) {
    updateFields.email = email;
  }

  if (gpid) {
    updateFields.gpid = gpid;
  }
  if (gpcust) {
    updateFields.gpcust = gpcust;
  }
  try {
    const updatedTicket = await updateTicket(id, updateFields);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ticketRouter;
