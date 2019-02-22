module.exports = (sequelize, Sequelize) => {
    const Method = sequelize.define('method', {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        },
        comment: {
            type: Sequelize.STRING(128),
            allowNull: true
        }
    });

    return Method;
}