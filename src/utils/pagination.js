const getPagination = (page, size) => {
    const limit = size ? +size : 3; // default limit to 3 items per page
    const offset = 0 + (page - 1) * limit;

    return { limit, offset };
}

const getPagingData = (data, page, limit) => {
    const { count, rows: results } = data;
    page = page ? +page : 0;
    const total_pages = Math.ceil(count / limit);

    return {
        count,
        "page_context": {
            page,
            total_pages
        },
        results,
    };
}


module.exports = {
    getPagination,
    getPagingData
};