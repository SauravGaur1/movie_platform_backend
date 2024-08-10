const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../../../database/database.js");

class Transaction extends Model {
    static associate(models) {
        Transaction.hasOne(models.Ticket, {
            foreignKey: "transaction_success",
        });
    }
}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Sets the default value to the current timestamp
            onUpdate: DataTypes.NOW, // Updates the timestamp on record update
        },
    },

    {
        timestamps: false,
        sequelize,
    }
);

module.exports = Transaction;
