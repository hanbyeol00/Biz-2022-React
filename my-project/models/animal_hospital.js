import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "animal_hospital",
    {
      a_id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      a_name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      a_add: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      a_road_add: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      a_tel: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
      },
      a_x: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },
      a_y: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "animal_hospital",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "a_id" }],
        },
      ],
    }
  );
};
