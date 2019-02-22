module.exports = (sequelize, Sequelize) => {
    const Action = sequelize.define('action', {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        comment: {
            type: Sequelize.STRING(128),
            allowNull: true
        }
    });

    return Action;
}