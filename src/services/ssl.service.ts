const fs = require("fs");

export default () => ({
  key: fs.readFileSync(process.env.SSL_PRIV_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_KEY_PATH),
});
