const auth = require("./auth");

/**
 * Middleware: Ensures the user is authenticated AND has the "superadmin" role.
 * Must be used after the `auth` middleware (or it chains auth internally).
 */
const superadmin = [
  auth,
  (req, res, next) => {
    if (req.admin?.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Super Admin only." });
    }
    next();
  },
];

module.exports = superadmin;
