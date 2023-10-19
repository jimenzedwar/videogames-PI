const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, // Tipo de dato para el atributo "id": UUID (identificador único universal). Es un codigo alfanumerico
      defaultValue: DataTypes.UUIDV4, // Crea numero aleatorio de identificación 
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 25]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20, 2500]
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
          hasAtLeastOneElement: function (value) {
            if (!Array.isArray(value) || value.length < 1) {
              throw new Error('The videogame must have at least 1 platform.');
            }
          }
        }
      },

    background_image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    released: {
      type: DataTypes.DATEONLY, // YYYY-MM-DD
      allowNull: false, 
      validate: {
        isAfter: "1958-10-18",
      }
    },
    rating:{
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isFloat: true,
        min: 0,
        max: 10
      }
    }
  },{ timestamps: false}
  );
};
