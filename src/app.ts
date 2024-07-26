import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./ormconfig";
import { router } from "./routers/user.router";
import { errorHandler } from "./middlewares/errorHandler";
import { booksRouter } from "./routers/book.router";
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", router);
app.use("/books", booksRouter);

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
