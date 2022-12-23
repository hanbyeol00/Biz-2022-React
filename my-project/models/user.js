import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "user",
    {
      u_user_id: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      u_password: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      u_email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      u_nick_name: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        unique: "u_nick_name",
      },
      u_img: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      u_level: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      u_create_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      u_delete_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "u_user_id" }],
        },
        {
          name: "u_nick_name",
          unique: true,
          using: "BTREE",
          fields: [{ name: "u_nick_name" }],
        },
      ],
    }
  );
};
