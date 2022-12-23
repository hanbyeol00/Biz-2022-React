import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_like",
    {
      board_seq: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      like_yn: {
        type: Sequelize.DataTypes.STRING(5),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_like",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "board_seq" }, { name: "user_id" }],
        },
      ],
    }
  );
};
