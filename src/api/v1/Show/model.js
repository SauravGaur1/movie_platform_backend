const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../../../database/database.js");

class Show extends Model {
    static associate(models) {
        Show.belongsTo(models.Audi, {
            foreignKey: "audi_id",
        });

        Show.belongsTo(models.Movie, {
            foreignKey: "movie_id",
        });
        Show.belongsTo(models.Language, {
            foreignKey: "language_id",
        });

        Show.hasMany(models.Ticket, {
            foreignKey: "show_id",
        });
    }
}

Show.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        audi_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        language_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
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

module.exports = Show;
