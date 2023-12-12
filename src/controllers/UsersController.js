const express = require('express');
const router = express.Router();
const DetailsUsers = require('../../models/detailusersModels');
const User = require('../../models/UsersModels');
const bcrypt = require('bcrypt');
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
      include: [{ model: DetailsUsers }],
    });

    const pagingData = getPagingData(users, page, limit);

    return res.status(200).json(pagingData);
  } catch (error) {
    console.error('Error retrieving users:', error);

    return res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId, { include: [{ model: DetailsUsers }] });
    if (user) {
      return res.status(200).json({
        message: 'Success Get User',
        results: user,
      });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
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
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email, detail_users_id } = req.body;
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
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'Current password is incorrect.',
      });
    }

    const isSamePassword = newPassword.trim() === confirmPassword.trim();

    if (isSamePassword) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'New password must be different from the current password.',
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword.trim(), 10);
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
  const { address } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (user) {
      user.address = address;
      await user.save();

      const detailsUser = await DetailsUsers.findOne({ where: { users_id: userId } });
      if (detailsUser) {
        detailsUser.address = address;
        await detailsUser.save();
      }

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
