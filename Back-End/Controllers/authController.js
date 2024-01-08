import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

// Register
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "regular",
    });

    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "24h" }
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

// login

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "24h",
        }
      );

      await user.update({ token });

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: "true",
          sameSite: "None",
        })
        .status(200)
        .json({ user, token });
    } else {
      res.status(401).json({ error: "Email or Password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
