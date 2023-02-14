import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "subscribe",
    {
      partner_user_id: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "username",
        },
      },
      partner_order_id: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "username",
        },
      },

      sid: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
      first_payment: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      approved_at: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      inactivated_at: {
        type: Sequelize.DataTypes.STRING(50),
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
          fields: [{ name: "partner_user_id" }, { name: "partner_order_id" }],
        },
        {
          name: "partner_order_id",
          using: "BTREE",
          fields: [{ name: "partner_order_id" }],
        },
      ],
    }
  );
};
