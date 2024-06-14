// app.js

import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";
import db from "./db.js"; // Importez la connexion MySQL depuis db.js
import route from "./route.js";

dotenv.config();

const app = express();

// Middleware pour gérer les données POST
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware pour gérer les sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware pour gérer les messages flash
app.use(flash());

// Moteur de templates EJS
app.set("view engine", "ejs");

// Répertoire des fichiers statiques
app.use(express.static("public"));

// Utilisation de la connexion MySQL
app.use((req, res, next) => {
  req.db = db; // Ajoutez la connexion MySQL à l'objet request
  next();
});

// Utilisation des routes définies dans route.js
app.use("/", route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
