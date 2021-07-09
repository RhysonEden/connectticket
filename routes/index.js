const apiRouter = require("express").Router();
require("dotenv").config();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const ticketRouter = require("./tickets");
apiRouter.use("/tickets", ticketRouter);

module.exports = apiRouter;
