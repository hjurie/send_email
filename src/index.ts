import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

import { sendSecretMail } from "utils/email";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/templates'));
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome Send Email"
  })
})

app.get("/send", async (req, res) => {
  const result = await sendSecretMail(["hjuriep@gmail.com"], "test secret!!!!!!");
  if (result) { res.send("보내기 성공") }
  else { res.send("보내기 실패") }
})

app.get("/welcome", async (req, res) => {
  res.render("welcome.ejs", {
    secret: "test"
  })
})

app.listen(8080, () => {
  console.log("run server port: 8080");
})