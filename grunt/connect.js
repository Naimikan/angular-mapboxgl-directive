module.exports = {
  "server": {
    "options": {
      "port": 9900,
      "hostname": "0.0.0.0",
      "keepalive": "true",
      "base": {
        "path": "public",
        "options": {
          "index": "index.html",
          "maxAge": 300000
        }
      },
      middleware: function (connect) {
        return [
          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            next();
          },
        ];
      }
    }
  }
}
