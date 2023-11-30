const Catalog = require("../../models/catalogs");
const router = express.Router(); 
const Joi = require("joi");

// Get all catalogs
const getAllCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.findAll();
    return res.json(catalogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get catalog by ID
const getCatalogById = async (req, res) => {
  const { id } = req.params;
  try {
    const catalog = await Catalog.findByPk(id);
    if (!catalog) {
      return res.status(404).json({ error: "Catalog not found" });
    }
    return res.json(catalog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Create a new catalog
const createCatalogs = async (req, res) => {
  const { name, description, size, price, status, day_rent, day_maintenance } =
    req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    size: Joi.string(),
    price: Joi.number().required(),
    status: Joi.string().required(),
    day_rent: Joi.number().required(),
    day_maintenance: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newCatalog = await Catalog.create({
      name,
      description,
      size,
      price,
      status,
      day_rent,
      day_maintenance,
    });
    return res.status(201).json(newCatalog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a catalog
const updateCatalogs = async (req, res) => {
  const { id } = req.params;
  const { name, description, size, price, status, day_rent, day_maintenance } =
    req.body;

  try {
    const catalog = await Catalog.findByPk(id);
    if (!catalog) {
      return res.status(404).json({ error: "Catalog not found" });
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

    return res.json({ message: "Catalog updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a catalog
const deleteCatalogs = async (req, res) => {
  const { id } = req.params;
  try {
    const catalog = await Catalog.findByPk(id);
    if (!catalog) {
      return res.status(404).json({ error: "Catalog not found" });
    }

    await Catalog.destroy({
      where: {
        id,
      },
    });

    return res.json({ message: "Catalog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCatalogs,
  getCatalogById,
  createCatalogs,
  updateCatalogs,
  deleteCatalogs,
};
