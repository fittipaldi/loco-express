const Driver = require('../models').Driver;

const DriverController = {

    getAll: async () => {
        const items = await Driver.findAll();
        return items;
    },

    getFind: async (where) => {
        const items = await Driver.findAll({
            where: where
        });
        return items;
    },

    getOne: async (where) => {
        const item = await Driver.findOne({
            where: where
        });
        return item.get();
    },

    saveItem: async (data, id = 0) => {

        const name = (typeof data.name != 'undefined') ? data.name.trim() : '';
        const number = (typeof data.number != 'undefined') ? parseInt(data.number.trim().replace(/\D/g, '')) : '';

        let saved;
        if (typeof id != 'undefined' && id > 0) {
            saved = await Driver.findOne({
                where: {
                    id: id
                }
            });

            if (!saved) {
                throw 'Item not Found';
            }

            if (name) {
                saved.name = name;
            }
            if (number) {
                saved.number = number;
            }
            saved.save();
        } else {

            if (!name) {
                throw 'Missing Name';
            }
            if (!number) {
                throw 'Missing Number';
            }

            saved = await new Driver({
                name: name,
                number: number,
            }).save();
        }

        if (saved) {
            return saved.get();
        }
        return saved;
    },

    delItem: async (id) => {
        const item = await Driver.findOne({
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

module.exports = DriverController;