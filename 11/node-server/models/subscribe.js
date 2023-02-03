import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "subscribe",
    {
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "username",
        },
      },
      ChildUsername: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "username",
        },
      },
      s_start_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      s_end_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "subscribe",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username" }, { name: "ChildUsername" }],
        },
        {
          name: "ChildUsername",
          using: "BTREE",
          fields: [{ name: "ChildUsername" }],
        },
      ],
    }
  );
};
