const express = require('express');
const router = express.Router();
const DetailsUsers = require('../../models/detailuserModels');
const User = require('../../models/UsersModels');
const AddressUsers = require('../../models/addressUserModels');
const DetailShop = require('../../models/detailshopModels');
const SocialMediaUsers = require('../../models/socialmediaModels');
const bcrypt = require('bcrypt');
const { getPagination, getPagingData, parseQueryParams } = require('../utils/pagination');
const { getDetailUsersById } = require('../utils');
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
      attributes: { exclude: ['password'] },
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
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: DetailsUsers,
          include: [
            {
              model: AddressUsers,
              as: 'address_user',
            },
            {
              model: DetailShop,
              as: 'detail_shop',
            },
            {
              model: SocialMediaUsers,
              as: 'social_media_user',
            },
          ],
        },
      ],
    });

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
  const { username, email, detail_users_id, detail_user, detail_shop, social_media_user } = req.body;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: DetailsUsers,
          include: [
            {
              model: AddressUsers,
              as: 'address_user',
            },
            {
              model: DetailShop,
              as: 'detail_shop',
            },
            {
              model: SocialMediaUsers,
              as: 'social_media_user',
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (detail_users_id) user.detail_users_id = detail_users_id;

    user.updated_at = new Date();
    await user.save();

    if (detail_user) {
      if (!user.DetailsUser) {
        user.DetailsUser = await DetailsUsers.create({
          ...detail_user,
          users_id: user.id,
        });
      } else {
        await user.DetailsUser.update(detail_user);
        if (detail_user.address_users) {
          await user.DetailsUser.address_user.update(detail_user.address_users);
        }

        user.DetailsUser = await user.DetailsUser.save();
      }
    }
    if (detail_shop) {
      if (!user.DetailsUser.detail_shop) {
        user.DetailsUser.detail_shop = await DetailShop.create({
          ...detail_shop,
          users_id: user.id,
        });
      } else {
        await user.DetailsUser.detail_shop.update(detail_shop);
        user.DetailsUser.detail_shop = await user.DetailsUser.detail_shop.save();
      }
    }

    if (social_media_user) {
      if (!user.DetailsUser.social_media_user) {
        user.DetailsUser.social_media_user = await social_media_user.create({
          ...social_media_user,
          users_id: user.id,
        });
      } else {
        await user.DetailsUser.social_media_user.update(social_media_user);
        user.DetailsUser.social_media_user = await user.DetailsUser.social_media_user.save();
      }
    }

    console.log('Updated User:', user.toJSON());

    res.status(200).json({
      message: 'User updated successfully',
      results: user,
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

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'Current password is incorrect.',
      });
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'New password must be different from the current password.',
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'Password update failed!',
        details: 'New password and confirm password do not match.',
      });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
