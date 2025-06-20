const bcrypt = require("bcryptjs");
 const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};
       module.exports = { comparePassword };