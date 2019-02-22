module.exports = (sequelize, Sequelize) => {
    const DeviceName = sequelize.define('device_name', {
        text: {
            type: Sequelize.STRING(64),
            allowNull: false,
            unique: true
        }
    });
    return DeviceName;
}