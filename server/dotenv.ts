import path from "path";

// tslint:disable-next-line
require("dotenv").config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});
