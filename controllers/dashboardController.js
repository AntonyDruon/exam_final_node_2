export const showDashboardPage = (req, res) => {
  res.render("dashboard");
};

// Middleware de sécurité
export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/login");
};
