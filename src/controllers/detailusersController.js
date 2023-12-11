const DetailsUsers = require('../../models/detailusersModels');
const Joi = require('joi');

const getAllDetailsUsers = async (req, res) => {
  try {
    const detailsUsers = await DetailsUsers.findAll();
    const formattedDetailsUsers = detailsUsers.map(formatDetailsUser);

    if (detailsUsers.length > 0) {
      sendSuccessResponse(res, 'Success Get All Details Users', formattedDetailsUsers);
    } else {
      sendNotFoundResponse(res, 'Details Users not found');
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

const getDetailsUserById = async (req, res) => {
  const detailsUserId = req.params.id;
  try {
    const detailsUser = await DetailsUsers.findByPk(detailsUserId);
    if (detailsUser) {
      sendSuccessResponse(res, 'Success Get Details User', formatDetailsUser(detailsUser));
    } else {
      sendNotFoundResponse(res, 'Details User not found');
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
      sendClientErrorResponse(res, 'Full Name is already taken');
      return;
    }

    const newDetailsUser = await DetailsUsers.create({
      users_id,
      full_name,
      number_phone,
      social_media_id,
      address_user_id,
      detail_shop_id,
    });

    sendCreatedResponse(res, 'Details User created successfully', formatDetailsUser(newDetailsUser));
  } catch (error) {
    handleValidationError(res, error);
  }
};

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
  createDetailsUser,
  createDetailsUser,
};
