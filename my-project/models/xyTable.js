import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "xyTable",
    {
      x: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
        primaryKey: true,
      },
      y: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "xyTable",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "x" }],
        },
      ],
    }
  );
};
