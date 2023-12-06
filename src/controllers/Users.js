const express = require('express');
const router = express.Router();
const User = require('../../models/Users');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length > 0) {
      const formattedUsers = users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }));

      return res.status(200).json({
        message: 'Success Get All Users',
        results: formattedUsers,
      });
    } else {
      return res.status(404).json({ message: 'Users not found' });
    }
  } catch (error) {
    console.error('Error retrieving users:', error);

    return res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      return res.status(200).json({
        message: 'Success Get User By ID',
        results: {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, username, password, email, detail_users_id } = req.body;

    if (email && password && username) {
      // Cek apakah username atau email sudah digunakan
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({
          message: 'Registration Failed!',
          details: 'Username or email already taken.',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: 'Registration Success!',
        results: {
          id: newUser.id,
          detail_users_id: newUser.detail_users_id,
          username: newUser.username,
          email: newUser.email,
          updated_at: newUser.updated_at,
        },
      });
    }

    const newUser = await User.create({
      id,
      username,
      password,
      email,
      detail_users_id,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user or registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, password, email, detail_users_id } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (detail_users_id) user.detail_users_id = detail_users_id;

    if (password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(201).json({
      message: 'User updated successfully',
      results: {
        id: user.id,
        username: user.username,
        email: user.email,
        updated_at: user.updated_at,
      },
    });
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id/update-password', async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'Current password is incorrect.',
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id/update-address', async (req, res) => {
  const userId = req.params.id;
  const { newAddress } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.address = newAddress;
      await user.save();
      res.json({ message: 'Address updated successfully', user });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating address by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
