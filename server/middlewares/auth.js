import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  // Try to get token from a custom header "token" or from "Authorization: Bearer <token>"
  let token = req.headers.token;
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SCREAT);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
