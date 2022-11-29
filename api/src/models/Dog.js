const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type:DataTypes.STRING,
      defaultValue:
          "https://www.elweydelosperros.com/wp-content/uploads/2021/06/Chaparro-4-scaled-e1623570641386.jpg",
    },
    lifeSpan:{
      type: DataTypes.STRING,
      allowNull: false
    } 
  },
    {
      timestamps: false
    }
  );
};
