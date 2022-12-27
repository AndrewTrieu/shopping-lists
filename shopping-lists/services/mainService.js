import { executeQuery } from "../database/database.js";

const checkList = async () => {
  const result = await executeQuery("SELECT COUNT(*) FROM shopping_lists;");
  return result.rows[0].count;
};

const checkItem = async () => {
  const result = await executeQuery(
    "SELECT COUNT(*) FROM shopping_list_items;"
  );
  return result.rows[0].count;
};

export { checkList, checkItem };
