// Declaring dependencies

const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

//configure dotenv
dotenv.config();

//Create Connection

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Check Connection for error

db.connect((err) => {
  //if there is error
  if (err) {
    return console.log("Error connecting to mySQL: ", err);
  }

  //if no error
  console.log("Successfully conected to mySQL at: ", db.threadId);
});

// Setting up ejs views
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//retrieve all patients from database
const allPatient =
  "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
db.query(allPatient, (err, data) => {
  //if there is error
  if (err) {
    return console.log("Failed to connect to database", err);
  }
  // if there is no error
  app.get("/patients", (req, res) => {
    res.status(200).send(data);
  });
});

// Retrieve all providers

const allProviders =
  "SELECT first_name, last_name, provider_specialty FROM providers";
db.query(allProviders, (err, data) => {
  // if there is error
  if (err) {
    return console.log("Failed to connect to database", err);
  }
  // if there is no error
  app.get("/providers", (req, res) => {
    res.status(200).send(data);
  });
});

// Retrieve all patients first name

const patientsFirstName = "SELECT first_name FROM patients";
db.query(patientsFirstName, (err, data) => {
  // if there is error
  if (err) {
    return console.log("Failed to connect to database", err);
  }
  // if there is no error
  app.get("/patients/first_name", (req, res) => {
    res.status(200).send(data);
  });
});

// Retrieve all providers by their specialty

// 1. Pediatrics

const allPediatrics =
  "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = 'Pediatrics'";
db.query(allPediatrics, (err, data) => {
  // if there is error
  if (err) {
    return console.log("Failed to connect to database", err);
  }
  // if there is no error
  app.get("/providers/pediatrics", (req, res) => {
    res.status(200).send(data);
  });
});

// 2. Surgery

const allSurgery =
  "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = 'Surgery'";
db.query(allSurgery, (err, data) => {
  // if there is error
  if (err) {
    return console.log("Failed to connect to database", err);
  }
  // if there is no error
  app.get("/providers/surgery", (req, res) => {
    res.status(200).send(data);
  });
});

// 3. Cardiology

const allCardiology =
  "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = 'Cardiology'";
db.query(allCardiology, (err, data) => {
  // if there is error
  if (err) {
    return console.log("Failed to connect to database", err);
  }
  // if there is no error
  app.get("/providers/cardiology", (req, res) => {
    res.status(200).send(data);
  });
});

// 4. Primary Care

const allPrimaryCare =
  "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = 'PrimaryCare'";
db.query(allPrimaryCare, (err, data) => {
  // if there is error
  if (err) {
    return console.log("Failed to connect to database", err);
  }
  // if there is no error
  app.get("/providers/primary-care", (req, res) => {
    res.status(200).send(data);
  });
});

//listen to port

app.listen(process.env.PORT, () => {
  console.log("Server listening to port: ", process.env.PORT);
});
