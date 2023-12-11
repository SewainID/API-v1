const DetailShop = require('./detailshopModels');
const Catalog = require('./catalogModels');
const DetailsUsers = require('./detailusersModels');
const Users = require('./UsersModels');

const setupAssociations = () => {
  DetailShop.hasOne(Catalog, {
    foreignKey: 'shop_id',
    onDelete: 'CASCADE',
  });

  Catalog.belongsTo(DetailShop, {
    foreignKey: 'shop_id',
    as: 'shop',
  });

  Users.hasOne(DetailsUsers, {
    foreignKey: 'users_id',
    onDelete: 'CASCADE',
  });

  DetailsUsers.belongsTo(Users, {
    foreignKey: 'users_id',
    as: 'details_users',
  });
};

module.exports = setupAssociations;
