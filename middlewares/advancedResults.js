const advancedResults = (model, populate) => async(req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = { ...req.query };

    //Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    //Delete remeveFields from reqQuery
    removeFields.forEach((element) => delete reqQuery[element]);

    // create query string to replace filter keywords
    let queryString = JSON.stringify(reqQuery);

    // Create operator
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)/g, (match) => `$${match}`)

    /*Build query*/
    // Find ressources
    query = model.find(JSON.parse(queryString)); 

    //Select Fields
    if(req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields)
    }

    //Sort
    if(req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt")
    }

    // Paginate
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if(populate) {
        query = query.populate(populate);
    }

    /** execute query */
    const results = await query;

    //Paginate results
    const pagination = {};

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if(startIndex > 0) {
        pagination.prev = {
            page: page -1,
            limit,
        }
    }

    /**add advanced results to res object */
    res.advancedResults = {
        success: true,
        count: results.length,
        data: results,
        pagination
    }

    next();
}

module.exports = advancedResults