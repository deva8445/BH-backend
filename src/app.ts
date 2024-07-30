import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./ormconfig";
import auth from "./routers/user.router";
import { errorHandler } from "./middlewares/errorHandler";
import books from "./routers/book.router";
import payment from "./routers/payment.router";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/books", books);
app.use("/payment", payment);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(
      `=======================Fail to connect with database=====================`,
      error
    );
  });
