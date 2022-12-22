import _xyTable from "./xyTable.js";
const initModels = (sequelize) => {
  const xyTable = _xyTable(sequelize);

  return {
    xyTable,
  };
};

export default initModels;
