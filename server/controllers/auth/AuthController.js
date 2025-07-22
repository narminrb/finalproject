import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../schema/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

// export const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ message: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ name, email, password: hashed });
//     res.status(201).json({ message: "Registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("📌 Register attempt:", name, email);
  
    try {
      const exist = await User.findOne({ email });
      if (exist) {
        console.log("⚠️ User already exists");
        return res.status(400).json({ message: "User already exists" });
      }
  
      // ✅ Let schema handle hashing
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      console.log("✅ User created:", newUser._id);
      res.status(201).json({ message: "Registered successfully" });
    } catch (err) {
      console.error("❌ Register error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "no user  credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "password doesnt match credentials" });
  
      // ✅ read JWT secret here at runtime
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error("❌ JWT_SECRET is missing");
        return res.status(500).json({ message: "Server error: missing JWT secret" });
      }
  
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: "7d" });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.status(200).json({ message: "Logged in", user: { id: user._id, name: user.name } });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const verify = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    res.json({ id: decoded.id });
  });
};

