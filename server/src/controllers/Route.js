const Route = require('../models').Route;

const RouteController = {

    getAll: async () => {
        const items = await Route.findAll();
        return items;
    },

    getFind: async (where) => {
        const items = await Route.findAll({
            where: where
        });
        return items;
    },

    getOne: async (where) => {
        const item = await Route.findOne({
            where: where
        });
        return item.get();
    },

    saveItem: async (data, id = 0) => {

        const departure = (typeof data.departure != 'undefined') ? data.departure.trim() : '';
        const arrival = (typeof data.arrival != 'undefined') ? data.arrival.trim() : '';
        const shift = (typeof data.shift != 'undefined') ? data.shift.trim() : '';

        let saved;
        if (typeof id != 'undefined' && id > 0) {
            saved = await Route.findOne({
                where: {
                    id: id
                }
            });

            if (!saved) {
                throw 'Item not Found';
            }

            if (departure) {
                saved.departure = departure;
            }
            if (arrival) {
                saved.arrival = arrival;
            }
            if (shift) {
                saved.shift = shift;
            }
            saved.save();
        } else {

            if (!departure) {
                throw 'Missing Departure';
            }
            if (!arrival) {
                throw 'Missing Arrival';
            }
            if (!shift) {
                throw 'Missing Shift';
            }

            saved = await new Route({
                departure: departure,
                arrival: arrival,
                shift: shift,
            }).save();
        }

        if (saved) {
            return saved.get();
        }
        return saved;
    },

    delItem: async (id) => {
        const item = await Route.findOne({
            where: {
                id: id
            }
        });

        if (!item) {
            throw 'Item not Found';
        }
        item.destroy();
        return item;
    }

};

module.exports = RouteController;