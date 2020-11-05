module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        driver_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        route_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updated_at: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: sequelize.literal('current_timestamp')
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'schedule',
    });
    return Schedule;
};