const BiteshipAPI = require('../utils/biteship');
const { getDetailUsersById, getDetailUsersByShopId } = require('../utils');
const Catalog = require("../../models/catalogModels");
const DetailShop = require("../../models/detailshopModels");
const biteship = new BiteshipAPI(process.env.BITESHIP_API_KEY);


const checkRates = async (req, res) => {
    try {
        const detailUser = await getDetailUsersById(req.user.id);
        const origin = {
            latitude : detailUser?.DetailsUser?.address_user?.latitude ?? "",
            longitude : detailUser?.DetailsUser?.address_user?.longitude ?? "",
        }
        const catalog = await Catalog.findByPk(req.params.id, { include: [{ model: DetailShop, as: 'shop' }] });

        const detailShop = await getDetailUsersByShopId(catalog.shop.id)
        console.log(catalog.shop.id)

        const destination = {
            latitude : detailShop?.DetailsUser?.address_user?.latitude ?? "",
            longitude : detailShop?.DetailsUser?.address_user?.longitude ?? "",
        }
        const results = await biteship.getRatesByCoordinates(origin,destination, catalog)
        res.status(200).json(results);
    } catch (error) {
        console.error('Error Check Rates', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const createShipment = async (req, res) => {
    return {}
}
module.exports = { checkRates };