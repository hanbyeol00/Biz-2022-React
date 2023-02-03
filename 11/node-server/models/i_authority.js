import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "i_authority",
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
      i_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "image",
          key: "i_code",
        },
      },
      authority: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "i_authority",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username" }, { name: "i_code" }],
        },
        {
          name: "i_code",
          using: "BTREE",
          fields: [{ name: "i_code" }],
        },
      ],
    }
  );
};
