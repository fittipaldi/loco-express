const Driver = require('../models').Driver;
const Route = require('../models').Route;
const Schedule = require('../models').Schedule;
Schedule.belongsTo(Driver, {foreignKey: 'driver_id', targetKey: 'id', as: 'driver'});
Schedule.belongsTo(Route, {foreignKey: 'route_id', targetKey: 'id', as: 'route'});
const {getRandomDrivers} = require('../db/queries');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
};
Date.prototype.getDayName = function () {
    return days[this.getDay()];
};
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

const ScheduleController = {

    getAll: async () => {
        const items = await Schedule.findAll({
            include: [
                {association: 'driver'},
                {association: 'route'},
            ],
            order: [
                ['day', 'ASC'],
            ],
            where: {}
        });

        for (let k in items) {
            items[k].day = days[items[k].day];
        }

        return items;
    },

    generateSchedule: async () => {
        await Schedule.destroy({truncate: true});
        const routes = await Route.findAll();
        const routeNo = routes.length;

        const date = new Date();
        date.addDays(1);

        const scheduleDays = 7;
        let lastDrivers = [];
        for (let i = 0; i < scheduleDays; i++) {
            const drivers = await getRandomDrivers(routeNo, lastDrivers.join(','));
            lastDrivers = [];
            for (let k in drivers) {
                let driver = drivers[k];
                let route = routes[k];
                lastDrivers.push(driver.id);
                await new Schedule({
                    day: date.getDay(),
                    driver_id: driver.id,
                    route_id: route.id,
                }).save();
            }
            date.addDays(1);
        }
    },

};

module.exports = ScheduleController;