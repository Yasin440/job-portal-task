const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerUser = (users) => async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const haveUser = await users.findOne({ email });
    if (haveUser) {
      res.status(404).json({ error: { message: "Already used this email!" } });
    } else if (!haveUser) {
      const token = jwt.sign(
        { name, email, createdAt: new Date(Date.now()) },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );
      const createUser = await users.insertOne({
        name, email, password: await bcrypt.hash(password, 10), token
      })
      if (createUser) {
        const option = {
          expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_IN * 24 * 3600000)
        };
        res.status(200).cookie('authToken', token, option).json({ success: { message: "Registration successful", token } })
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
module.exports.loginUser = (users) => async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await users.findOne({ email });
    if (findUser) {
      const { name, email } = findUser;
      //generate token
      const token = jwt.sign(
        { name, email, createdAt: new Date(Date.now()) },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );
      const matchPassword = await bcrypt.compare(password, findUser.password);
      if (matchPassword) {
        //update token
        const updatedToken = await users.updateOne(
          { email }, { $set: { token } }, { upsert: true }
        )
        if (updatedToken.modifiedCount > 0) {
          res.status(200).json({ success: { message: 'Successfully logged in', token } });
        }
      } else if (!matchPassword) {
        res.status(400).json({ error: { message: 'Password not valid' } });
      }
    } else if (!findUser) {
      res.status(404).json({ error: { message: 'User not found' } });
    }
  } catch (error) {
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
}