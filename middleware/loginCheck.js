module.exports = function logged(req, res, next) {
  !req.user ? res.render('noPermission') : next();
};
