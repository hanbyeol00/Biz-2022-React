import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "re_comment",
    {
      r_recommseq: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      seq: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      r_nickname: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      r_content: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      r_create_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      r_update_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      r_delete_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "re_comment",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "r_recommseq" }, { name: "seq" }],
        },
      ],
    }
  );
};
