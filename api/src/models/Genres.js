const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('genre', {
        id: {
            type: DataTypes.UUID, // Tipo de dato para el atributo "id": UUID (identificador único universal). Es un codigo alfanumerico
            defaultValue: DataTypes.UUIDV4, // Crea numero aleatorio de identificación 
            primaryKey: true, 
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {timeStamps: false}
    )
}