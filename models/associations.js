const DetailShop = require('./detailshopModels');
const Catalog = require('./catalogModels');
const DetailsUsers = require('./detailusersModels');
const Users = require('./UsersModels');

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
    onDelete: 'CASCADE',
  });

  DetailsUsers.belongsTo(Users, {
    foreignKey: 'users_id',
    as: 'user',
  });
};

module.exports = setupAssociations;
