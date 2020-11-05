module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define('Route', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        departure: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        arrival: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shift: {
            type: DataTypes.STRING,
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
        tableName: 'route',
    });
    return Route;
};