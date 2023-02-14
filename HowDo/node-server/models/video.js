import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "video",
    {
      v_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      v_src: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      v_title: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      v_detail: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      v_price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      v_category: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      v_views: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      v_series: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      v_save_file: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true,
      },
      v_create_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      v_update_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      v_delete_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      v_hover: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
        default: "false",
      },
      v_replies: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "video",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "v_code" }],
        },
      ],
    }
  );
};
