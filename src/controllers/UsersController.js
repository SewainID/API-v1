const express = require('express');
const router = express.Router();
const User = require('../../models/UsersModels');
const DetailsUsers = require('../../models/detailusersModels');
const { getPagination, getPagingData, parseQueryParams } = require('../utils/pagination');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const size = parseInt(req.query.per_page || 20);
    const queryParams = parseQueryParams(req.query);
    const { limit, offset } = getPagination(page, size);

    const users = await User.findAndCountAll({
      limit,
      offset,
      ...queryParams,
      include: [{ model: DetailsUsers, as: 'user' }],
    });
    const formattedUsers = users.rows.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    const pagingData = getPagingData(users, page, limit);

    return res.status(200).json({
      message: 'Success Get All Users',
      results: formattedUsers,
      paging: pagingData,
    });
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
        message: 'Success Get User',
        results: {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
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

    if (username && username !== user.username) {
      const existingUsernameUser = await User.findOne({ where: { username } });
      if (existingUsernameUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    if (email && email !== user.email) {
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (detail_users_id) user.detail_users_id = detail_users_id;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    user.updated_at = new Date();
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
    console.error('Error updating user:', error);
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

    const trimmedCurrentPassword = currentPassword.trim();

    const isPasswordValid = await bcrypt.compare(trimmedCurrentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'Current password is incorrect.',
      });
    }

    if (trimmedCurrentPassword === newPassword.trim()) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'New password must be different from the current password.',
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.updated_at = new Date();

    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id/update-address', async (req, res) => {
  const userId = req.params.id;
  const { Address } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.address = Address;
      user.updated_at = new Date();

      await user.save();
      res.json({ message: 'Address updated successfully', user });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
