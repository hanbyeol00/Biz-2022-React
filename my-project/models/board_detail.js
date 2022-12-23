import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "board_detail",
    {
      seq: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      b_nickname: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      b_title: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      b_content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      b_views: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      b_create_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      b_update_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      b_delete_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "board_detail",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "seq" }, { name: "user_id" }],
        },
      ],
    }
  );
};
