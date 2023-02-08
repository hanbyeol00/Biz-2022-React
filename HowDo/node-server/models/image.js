import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "image",
    {
      i_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      i_src: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      i_title: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      i_detail: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      i_category: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      i_views: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      i_price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      i_create_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      i_update_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      i_delete_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "image",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "i_code" }],
        },
      ],
    }
  );
};
