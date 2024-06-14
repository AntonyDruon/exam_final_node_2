import { createUser, findUserByEmail } from "../models/User.js";
import crypto from "crypto";

const hashPassword = (password) => {
  const hmac = crypto.createHmac("sha256", process.env.SECRET_KEY);
  hmac.update(password);
  return hmac.digest("hex");
};

export const showDashboardPage = (req, res) => {
  res.render("dashboard");
};

export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/login");
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    req.flash("error", "Veuillez remplir tous les champs.");
    return res.redirect("/register");
  }

  if (password !== confirmPassword) {
    req.flash("error", "Les mots de passe ne correspondent pas.");
    return res.redirect("/register");
  }

  try {
    const existingUser = await findUserByEmail(email);
    console.log("password", password);

    if (existingUser) {
      req.flash("error", "Un utilisateur avec cet email existe déjà.");
      return res.redirect("/register");
    }
    console.log("test");
    await createUser({
      firstName,
      lastName,
      email,
      password: hashPassword(password),
    });

    req.flash("success", "Inscription réussie. Veuillez vous connecter.");
    res.redirect("/login");
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    req.flash("error", "Erreur lors de l'inscription. Veuillez réessayer.");
    res.redirect("/register");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email, "password", password);

  try {
    const user = await findUserByEmail(email);
    console.log(
      "user.password",
      user.password,
      "hashPassword(password)",
      hashPassword(password)
    );
    if (!user || user.password !== hashPassword(password)) {
      req.flash("error", "Email ou mot de passe incorrect.");
      return res.redirect("/login");
    }

    req.session.userId = user.id;
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    req.flash("error", "Erreur lors de la connexion. Veuillez réessayer.");
    res.redirect("/login");
  }
};

export const showRegisterPage = (req, res) => {
  res.render("register", { messages: req.flash("error") });
};

export const showLoginPage = (req, res) => {
  res.render("login", { messages: req.flash("error") });
};
