const DetailShop = require('./detailshopModels');
const Catalog = require('./catalogModels');
// Import other models as needed

const setupAssociations = () => {
    // One-to-One relationship: Each DetailShop has one Catalog
    DetailShop.hasOne(Catalog, {
        foreignKey: 'shop_id', // The foreign key in the Catalog model
        onDelete: 'CASCADE' // Optional: Defines behavior when a DetailShop record is deleted
    });

    // The inverse relationship: Each Catalog belongs to a DetailShop
    Catalog.belongsTo(DetailShop, {
        foreignKey: 'shop_id', // This should match the field in the Catalog model
        as: 'shop'
    });

    // ... Define other associations here
};

module.exports = setupAssociations;