const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "ahmad",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ahmad Aziz",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ahmad Aziz",
    helptext: "This is some helpful text",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address" });
  }
  console.log(req.query.address);
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    weather(data[1], data[0], (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        data,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Ahmad Aziz",
    title: "404 Not Found",
    errorMessage: "Help article not found",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    name: "Ahmad Aziz",
    title: "404 Not Found",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Express listening");
});
