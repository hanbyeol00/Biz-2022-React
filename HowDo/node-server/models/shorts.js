import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "shorts",
    {
      sh_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      v_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      sh_src: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      sh_title: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      sh_category: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      sh_views: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      sh_create_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      sh_update_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      sh_delete_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "shorts",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "sh_code" }],
        },
      ],
    }
  );
};
