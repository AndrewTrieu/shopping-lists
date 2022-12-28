import { executeQuery } from "../database/database.js";

const checkList = async () => {
  const result = await executeQuery("SELECT COUNT(*) FROM shopping_lists;");
  if (result.rows && result.rows.length > 0) {
    return result.rows[0].count;
  }
  return 0;
};

const checkItem = async () => {
  const result = await executeQuery(
    "SELECT COUNT(*) FROM shopping_list_items;"
  );
  if (result.rows && result.rows.length > 0) {
    return result.rows[0].count;
  }
  return 0;
};

export { checkList, checkItem };
