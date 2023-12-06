const express = require('express');
const router = express.Router();
const User = require('../../models/UsersModel');
const bcrypt = require('bcrypt');

// Mendapatkan semua pengguna
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll(users);
    res.status(200).json({
      message: 'Success Get All Users',
      results: {
        id: users.id,
        username: users.username,
        email: users.email,
        created_at: users.created_at,
        updated_at: users.updated_at,
      }, 
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Mendapatkan pengguna berdasarkan ID
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

// Menambahkan pengguna baru atau melakukan registrasi pengguna
router.post('/', async (req, res) => {
  try {
    const { id, username, password, email, detail_users_id } = req.body;

    // Check if the request body contains the necessary information for registration
    if (email && password && username) {
      // Cek apakah username atau email sudah digunakan
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({
          message: 'Registration Failed!',
          details: 'Username or email already taken.',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan user ke database dengan password yang di-hash
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

    // If the necessary information for registration is not provided, proceed with creating a new user
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

// Menghapus pengguna berdasarkan ID
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

// Mengupdate pengguna berdasarkan ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, password, email, detail_users_id } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update only if the fields are provided in the request body
    if (username) user.username = username;
    if (email) user.email = email;
    if (detail_users_id) user.detail_users_id = detail_users_id;

    // Update password if provided
    if (password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the changes
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
// Mengupdate password pengguna berdasarkan ID
router.put('/:id/update-password', async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the current password matches
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'Current password is incorrect.',
      });
    }

    // Hash and update the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Mengupdate alamat pengguna berdasarkan ID
router.put('/:id/update-address', async (req, res) => {
  const userId = req.params.id;
  const { newAddress } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      // Update the user's address
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
