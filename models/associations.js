const DetailShop = require('./detailshopModels');
const Catalog = require('./catalogModels');
const DetailsUsers = require('./detailuserModels');
const Users = require('./UsersModels');
const AddressUsers = require('./addressUserModels'); // Import the new model

const setupAssociations = () => {
  // Association between DetailShop and Catalog
  DetailShop.hasOne(Catalog, {
    foreignKey: 'shop_id',
    onDelete: 'CASCADE',
  });

  Catalog.belongsTo(DetailShop, {
    foreignKey: 'shop_id',
    as: 'shop',
  });

  // Association between Users and DetailsUsers
  Users.hasOne(DetailsUsers, {
    foreignKey: 'users_id',
  });

  DetailsUsers.belongsTo(Users, {
    foreignKey: 'users_id',
  });

  // Association between DetailsUsers and AddressUsers
  AddressUsers.hasOne(DetailsUsers, {
    foreignKey: 'address_user_id',
    onDelete: 'CASCADE',
  });

  DetailsUsers.belongsTo(AddressUsers, {
    foreignKey: 'address_user_id',
    as: 'address_user',
  });
};

module.exports = setupAssociations;
