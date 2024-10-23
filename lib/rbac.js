// lib/rbac.js

export function checkRole(allowedRoles) {
  return (req, res, next) => {
    const { userRole } = req.session;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Access is denied.' });
    }

    next();
  };
}
