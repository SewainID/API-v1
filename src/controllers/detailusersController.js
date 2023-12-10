const express = require('express');
const router = express.Router();
const DetailsUsers = require('../../models/detailusersModels');

router.get('/', async (_req, res) => {
  try {
    const detailsUsers = await DetailsUsers.findAll();

    if (detailsUsers.length > 0) {
      const formattedDetailsUsers = detailsUsers.map((detailsUser) => ({
        id: detailsUser.id,
        users_id: detailsUser.users_id,
        full_name: detailsUser.full_name,
        number_phone: detailsUser.number_phone,
        social_media_id: detailsUser.social_media_id,
        address_user_id: detailsUser.address_user_id,
        detail_shop_id: detailsUser.detail_shop_id,
      }));

      return res.status(200).json({
        message: 'Success Get All Details Users',
        results: formattedDetailsUsers,
      });
    } else {
      return res.status(404).json({ message: 'Details Users not found' });
    }
  } catch (error) {
    console.error('Error retrieving details users:', error);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const detailsUserId = req.params.id;
  try {
    const detailsUser = await DetailsUsers.findByPk(detailsUserId);
    if (detailsUser) {
      res.status(200).json({
        message: 'Success Get Details User',
        results: detailsUser,
      });
    } else {
      res.status(404).send('Details User not found');
    }
  } catch (error) {
    console.error('Error retrieving details user :', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  const { users_id, full_name, number_phone, social_media_id, address_user_id, detail_shop_id } = req.body;

  try {
    const isFullNameTaken = await DetailsUsers.findOne({
      where: { full_name },
    });

    if (isFullNameTaken) {
      return res.status(400).json({ message: 'Full Name is already taken' });
    }

    const newDetailsUser = await DetailsUsers.create({
      users_id,
      full_name,
      number_phone,
      social_media_id,
      address_user_id,
      detail_shop_id,
    });

    res.status(201).json({
      message: 'Details User created successfully',
      results: newDetailsUser,
    });
  } catch (error) {
    console.error('Error creating details user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req, res) => {
  const detailsUserId = req.params.id;
  const { full_name, number_phone, social_media_id, address_user_id, detail_shop_id } = req.body;

  try {
    const detailsUser = await DetailsUsers.findByPk(detailsUserId);
    if (!detailsUser) {
      return res.status(404).send('Details User not found');
    }

    if (full_name !== detailsUser.full_name) {
      const isFullNameTaken = await DetailsUsers.findOne({
        where: { full_name },
      });

      if (isFullNameTaken) {
        return res.status(400).json({ message: 'Full Name is already taken' });
      }
    }

    detailsUser.full_name = full_name;
    detailsUser.number_phone = number_phone;
    detailsUser.social_media_id = social_media_id;
    detailsUser.address_user_id = address_user_id;
    detailsUser.detail_shop_id = detail_shop_id;

    await detailsUser.save();

    res.status(200).json({
      message: 'Details User updated successfully',
      results: detailsUser,
    });
  } catch (error) {
    console.error('Error updating details user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  const detailsUserId = req.params.id;

  try {
    const detailsUser = await DetailsUsers.findByPk(detailsUserId);
    if (!detailsUser) {
      return res.status(404).send('Details User not found');
    }

    await detailsUser.destroy();

    res.status(200).send('Details User deleted successfully');
  } catch (error) {
    console.error('Error deleting details user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
