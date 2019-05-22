const usesEncryption = req =>
  !req.body.operationName || req.body.operationName !== "IntrospectionQuery";

const decryptMiddleware = (req, _, next) => {
  if (usesEncryption(req)) {
    console.log("decrypting at GW level...");
    next();
  } else next();
};

const encryptOverride = (req, res, next) => {
  if (usesEncryption(req)) {
    const originalEnd = res.end.bind(res);
    res.end = function() {
      console.log("encrypting at GW level...");
      console.log("response at GW level");
      originalEnd();
    };
  }
  next();
};
module.exports = { decryptMiddleware, encryptOverride };
