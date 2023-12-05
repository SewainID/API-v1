const getPagination = (page, size) => {
    const limit = size ? +size : 3; // default limit to 3 items per page
    const offset = page ? page * limit : 0;

    return { limit, offset };
}

const getPagingData=  (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        totalItems,
        items,
        totalPages,
        currentPage
    };
}

const getPaginatedResult = async (req, res, model) => {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.per_page);

        const {limit, offset} = getPagination(page, size);

        const data = await model.findAndCountAll({
            limit,
            offset,
            // include other query parameters as needed
        });
        return getPagingData(data, page, limit);

    } catch (error) {
        res.status(500).send({
            message: "Error retrieving items"
        });
    }
}


module.exports = {

    getPaginatedResult

};