const jwt =require("jsonwebtoken")

 const generateToken = async ( role, email) => {
  
    const token = await jwt.sign({ role,email }, process.env.JWT_SECRET, {
        expiresIn: 360000,
      });

    return token;
 }
 const generateUrlToken =async () => {
  return await Math.floor(10000 + Math.random() * 90000).toString(); // Generates a 5-digit number
};
module.exports = { generateToken ,generateUrlToken};

