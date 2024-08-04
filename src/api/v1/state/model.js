const { Model, DataTypes } = require("sequelize");

class State extends Model {
    static associate(models) {
        State.hasMany(models.City)
    }

    getStateById(){
        this.findAll()
    }

}

State.init(
    {
        id: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:  true
        },
        title: {
            type : DataTypes.STRING,
            allowNull: false
        }
    }
)

State.sync();

export { State }