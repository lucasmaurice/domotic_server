module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define('device', {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: false
        },
        comment: {
            type: Sequelize.STRING(128),
            allowNull: true
        }
    });

    return Device;
}