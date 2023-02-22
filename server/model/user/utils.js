import crypto from "crypto";

const hash = (password) => {
  const hash = crypto.createHash("sha1");
  hash.update(password);
  return hash.digest("hex");
};

export { hash };
