import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "view_history",
    {
      h_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      v_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      i_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      h_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "view_history",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "h_code" }],
        },
      ],
    }
  );
};
