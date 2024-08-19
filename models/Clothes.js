module.exports = (sequelize, DataTypes) => {
    const Clothes = sequelize.define("clothes", {
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
        },
        price : {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
        },
        stock : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    })

    return Clothes;
}
