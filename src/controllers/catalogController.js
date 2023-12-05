const Catalog = require('../../models/catalog');
const Joi = require('joi');
const {getPagination, getPagingData} = require("../utils/pagination");

// Get all catalogs
const getAllCatalogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const size = parseInt(req.query.per_page || 20);

    const {limit, offset} = getPagination(page, size);
    const data = await Catalog.findAndCountAll({
      limit,
      offset,
      where: {}
    });

    const catalogs = getPagingData(data, page, limit)
    return res.json(catalogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get catalog by ID
const getCatalogByid = async (req, res) => {
  const CatalogByid = req.params.id;
  try {
    const catalog = await Catalog.findByPk(CatalogByid);
    if (!catalog) {
      return res.status(404).json({ error: 'Catalog not found' });
    }
    return res.json(catalog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Create a new catalog
const createCatalogs = async (req, res) => {
  const { name, description, size, price, status, day_rent, day_maintenance } = req.body;

  const Catalogschema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    size: Joi.string(),
    price: Joi.number().required(),
    status: Joi.string().required(),
    day_rent: Joi.number().required(),
    day_maintenance: Joi.number().required(),
  });

  const { error } = Catalogschema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newCatalogs = await Catalog.create({
      name,
      description,
      size,
      price,
      status,
      day_rent,
      day_maintenance,
    });
    return res.status(201).json(newCatalogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a catalog
const updateCatalogs = async (req, res) => {
  const CatalogUpdate = req.params.id;
  const { name, description, size, price, status, day_rent, day_maintenance } = req.body;

  try {
    const catalog = await Catalog.findByPk(CatalogUpdate);
    if (!catalog) {
      return res.status(404).json({ error: 'Catalog not found' });
    }

    await Catalog.update(
      {
        name,
        description,
        size,
        price,
        status,
        day_rent,
        day_maintenance,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.json({ message: 'Catalog updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a catalog
const deleteCatalogs = async (req, res) => {
  const CatalogsDelete = req.params.id;
  try {
    const catalog = await Catalog.findByPk(CatalogsDelete);
    if (!catalog) {
      return res.status(404).json({ error: 'Catalog not found' });
    }

    await Catalog.destroy({
      where: {
        id,
      },
    });

    return res.json({ message: 'Catalog deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCatalogs,
  getCatalogByid,
  createCatalogs,
  updateCatalogs,
  deleteCatalogs,
};
