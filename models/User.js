// models/User.js

import db from "../db.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const hashPassword = (password) => {
  const secretKey = process.env.SECRET_KEY;
  console.log("secretKey", secretKey);
  console.log("password", password);
  if (!secretKey) {
    throw new Error("Secret key is not defined in environment variables.");
  }

  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(password);
  return hmac.digest("hex");
};

export const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    console.log(firstName, lastName, email, password);
    const [result] = await db.query(
      "INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, password]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(
      `Erreur lors de la création de l'utilisateur: ${error.message}`
    );
  }
};

export const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    throw new Error(
      `Erreur lors de la recherche de l'utilisateur: ${error.message}`
    );
  }
};
