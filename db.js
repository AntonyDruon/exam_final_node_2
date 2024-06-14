// db.js

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Configurer la connexion à MySQL
const db = await mysql.createConnection({
  host: "localhost", // L'hôte où MySQL est en cours d'exécution (par défaut sur localhost)
  user: "root", // Votre nom d'utilisateur MySQL
  password: "", // Votre mot de passe MySQL
  database: "exam_final_node_semaine_2", // Le nom de la base de données que vous avez créée
});

try {
  await db.connect();
  console.log("Connecté à la base de données MySQL");
} catch (err) {
  console.error("Erreur de connexion à MySQL:", err.stack);
}

export default db;
