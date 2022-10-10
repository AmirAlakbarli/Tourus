function asyncCatch(callback) {
  return function (req, res) {
    callback(req, res).catch((err) => {
      res.json({ success: false, error: err.message });
    });
  };
}

module.exports = asyncCatch;
