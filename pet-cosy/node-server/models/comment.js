import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "comment",
    {
      c_seq: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      board_seq: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      c_nickname: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      c_content: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      c_create_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      c_update_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      c_delete_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "comment",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "c_seq" }, { name: "board_seq" }],
        },
      ],
    }
  );
};
