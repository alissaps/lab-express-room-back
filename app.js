require("dotenv").config();

const express = require("express");

const connectToDb = require("./config/db.config");

const app = express();

app.use(express.json());

const roomRouter = require("./routes/room.routes");
const reviewsRouter = require("./routes/reviews.routes");
const userRouter = require("./routes/user.routes");

app.use("/", roomRouter);
app.use("/", reviewsRouter);
app.use("/", userRouter);

connectToDb
  .then(() => {
    app.listen(4000, () => {
      console.log("Servidor subiu com sucesso!");
    });
  })
  .catch((err) => {

    console.log(err);

    process.exit(5);
  });