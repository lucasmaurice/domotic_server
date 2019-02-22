module.exports = (sequelize, Sequelize) => {
    const ApiKey = sequelize.define('api_key', {
        key: {
            type: Sequelize.STRING(64),
            allowNull: false,
            unique: true
        },
        active: {
            type: Sequelize.BOOLEAN(),
            allowNull: true
        },
        comment: {
            type: Sequelize.STRING(128),
            allowNull: true
        }
    });

    return ApiKey;
}