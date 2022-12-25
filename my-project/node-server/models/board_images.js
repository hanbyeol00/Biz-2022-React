import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "board_images",
    {
      i_seq: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      i_img: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "board_images",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "i_seq" }, { name: "i_img" }],
        },
      ],
    }
  );
};
