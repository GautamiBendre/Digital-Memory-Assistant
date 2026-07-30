import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { fullName, phone, password } = req.body;

    // Find logged-in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update name
    if (fullName) {
      user.name = fullName;
    }

    // Update phone
    if (phone) {
      user.phone = phone;
    }

    // Update password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};