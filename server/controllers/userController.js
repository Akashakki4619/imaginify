import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Removed named export { verify }
import Razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

// Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register Request Body:", req.body);

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details1" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = { name, email, password: hashedPassword };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Sign token using JWT_SCREAT from the environment
    const token = jwt.sign({ id: user._id }, process.env.JWT_SCREAT);
    return res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.error("Register Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Request Body:", req.body);

    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details2" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SCREAT);
      return res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Get User Credits
export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("User Credits Request Body:", req.body);

    if (!userId) {
      return res.json({ success: false, message: "Missing Details3" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.error("User Credits Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Payment with Razorpay
export const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData || !planId) {
      return res.json({ success: false, message: "missing details6" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Bussiness":
        plan = "Bussiness";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "plan not found" });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100, // amount in paise
      currency: process.env.CURRENCY, // e.g., "INR"
      receipt: newTransaction._id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error("Razorpay Order Error:", error);
        return res.json({ success: false, message: error.message });
      }
      return res.json({ success: true, order });
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(orderInfo.receipt);
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment failed" });
      }
      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
      res.json({ success: true, message: "credits added" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Payment Error:", error);
    return res.json({ success: false, message: error.message });
  }
};
