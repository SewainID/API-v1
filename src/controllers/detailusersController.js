const DetailsUsers = require('../../models/detailusersModels');
const Joi = require('joi');
const { getPagination, getPagingData } = require('../utils/pagination');
const User = require('../../models/UsersModels');

const formatDetailsUser = (detailsUser) => ({
  id: detailsUser.id,
  users_id: detailsUser.users_id,
  full_name: detailsUser.full_name,
  number_phone: detailsUser.number_phone,
  social_media_id: detailsUser.social_media_id,
  address_user_id: detailsUser.address_user_id,
  detail_shop_id: detailsUser.detail_shop_id,
});

const validateDetailsUser = async (detailsUser) => {
  const schema = Joi.object({
    users_id: Joi.string().uuid().required(),
    full_name: Joi.string().required(),
    number_phone: Joi.string().allow(null),
    social_media_id: Joi.string().uuid().allow(null),
    address_user_id: Joi.string().uuid().allow(null),
    detail_shop_id: Joi.string().uuid().allow(null),
  });

  await schema.validateAsync(detailsUser);
};

const getAllDetailsUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const size = parseInt(req.query.per_page || 20);

    const { limit, offset } = getPagination(page, size);
    const data = await DetailsUsers.findAndCountAll({
      limit,
      offset,
      ...queryParams,
      include: [{ model: User, as: 'detailUser' }],
    });

    const formattedDetailsUsers = data.rows.map((detailuser) => ({
      id: detailuser.id,
      users_id: detailuser.users_id,
      fullname: detailuser.email,
      number_phone: detailuser.number_phone,
      social_media_id: detailuser.social_media_id,
      address_user_id: detailuser.address_user_id,
      detail_shop_id: detailuser.detail_shop_id,
    }));

    const pagingData = getPagingData(formattedDetailsUsers, page, limit);

    return res.status(200).json({
      message: 'Success Get All Users',
      results: formattedDetailsUsers,
      paging: pagingData,
    });
  } catch (error) {
    console.error('Error retrieving Detail Users:', error);
    return res.status(500).send('Internal Server Error');
  }
};

const getDetailsUserById = async (req, res) => {
  const detailsUserId = req.params.id;
  try {
    const detailsUser = await DetailsUsers.findByPk(detailsUserId);
    if (detailsUser) {
      return sendSuccessResponse(res, 'Success Get Details User', formatDetailsUser(detailsUser));
    } else {
      return sendNotFoundResponse(res, 'Details User not found');
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

const createDetailsUser = async (req, res) => {
  try {
    await validateDetailsUser(req.body);

    const { users_id, full_name, number_phone, social_media_id, address_user_id, detail_shop_id } = req.body;
    const isFullNameTaken = await DetailsUsers.findOne({ where: { full_name } });

    if (isFullNameTaken) {
      return sendClientErrorResponse(res, 'Full Name is already taken');
    }

    const newDetailsUser = await DetailsUsers.create({
      users_id,
      full_name,
      number_phone,
      social_media_id,
      address_user_id,
      detail_shop_id,
    });

    return sendCreatedResponse(res, 'Details User created successfully', formatDetailsUser(newDetailsUser));
  } catch (error) {
    return handleValidationError(res, error);
  }
};

const updateDetailsUser = async (req, res) => {
  try {
    await validateDetailsUser(req.body);

    const detailsUserId = req.params.id;
    const { full_name, number_phone, social_media_id, address_user_id, detail_shop_id } = req.body;

    const detailsUser = await DetailsUsers.findByPk(detailsUserId);
    if (!detailsUser) {
      return sendNotFoundResponse(res, 'Details User not found');
    }

    if (full_name !== detailsUser.full_name) {
      const isFullNameTaken = await DetailsUsers.findOne({
        where: { full_name },
      });

      if (isFullNameTaken) {
        return sendClientErrorResponse(res, 'Full Name is already taken');
      }
    }

    detailsUser.full_name = full_name;
    detailsUser.number_phone = number_phone;
    detailsUser.social_media_id = social_media_id;
    detailsUser.address_user_id = address_user_id;
    detailsUser.detail_shop_id = detail_shop_id;

    await detailsUser.save();

    return sendSuccessResponse(res, 'Details User updated successfully', formatDetailsUser(detailsUser));
  } catch (error) {
    return handleValidationError(res, error);
  }
};

const deleteDetailsUser = async (req, res) => {
  const detailsUserId = req.params.id;
  try {
    const detailsUser = await DetailsUsers.findByPk(detailsUserId);
    if (!detailsUser) {
      return sendNotFoundResponse(res, 'Details User not found');
    }

    await detailsUser.destroy();

    return sendSuccessResponse(res, 'Details User deleted successfully');
  } catch (error) {
    return handleServerError(res, error);
  }
};

const sendSuccessResponse = (res, message, results) => {
  res.status(200).json({ message, results });
};

const sendNotFoundResponse = (res, message) => {
  res.status(404).json({ message });
};

const sendCreatedResponse = (res, message, results) => {
  res.status(201).json({ message, results });
};

const sendClientErrorResponse = (res, message) => {
  res.status(400).json({ message });
};

const handleValidationError = (res, error) => {
  res.status(400).json({ error: error.details[0].message });
};

const handleServerError = (res, error) => {
  console.error('Internal Server Error:', error);
  res.status(500).send('Internal Server Error');
};

module.exports = {
  getAllDetailsUsers,
  getDetailsUserById,
  createDetailsUser,
  updateDetailsUser,
  deleteDetailsUser,
};
