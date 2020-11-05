const sequelize = require('../models').sequelize;

module.exports.getRandomDrivers = (limit, excludeDriver) => {

    limit = (typeof limit != 'undefined' && limit) ? parseInt(limit) : 50;

    let where = '';
    if (excludeDriver) {
        where = 'WHERE id NOT IN (' + excludeDriver + ')';
    }

    const sql = `
        SELECT 
            *
        FROM driver 
        ${where}
        ORDER BY RAND()  
        LIMIT :limit
    `;

    return sequelize.query(sql, {
        replacements: {limit},
        type: sequelize.QueryTypes.SELECT
    });
};