import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "v_authority",
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
      v_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "video",
          key: "v_code",
        },
      },
      authority: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "v_authority",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username" }, { name: "v_code" }],
        },
        {
          name: "v_code",
          using: "BTREE",
          fields: [{ name: "v_code" }],
        },
      ],
    }
  );
};
