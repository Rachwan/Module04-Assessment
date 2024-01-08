import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;

  const oldUser = await User.findOne({ where: { id: userId } });

  try {
    const updatedUser = req.body;

    await oldUser.update(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error , ${error.message}` });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const userToDelete = await User.findOne({
      where: { id: userId },
    });

    if (!userToDelete) {
      return res.status(404).json({ error: "user not found" });
    }

    await userToDelete.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
