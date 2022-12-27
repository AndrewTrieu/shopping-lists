import { executeQuery } from "../database/database.js";

const deactivateByID = async (id) => {
  await executeQuery(
    "UPDATE shopping_lists SET active = false WHERE id = $id;",
    {
      id: id,
    }
  );
};

const create = async (name) => {
  await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", {
    name: name,
  });
};

const findAllLists = async () => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE active = true;"
  );

  return result.rows;
};

const findById = async (shopping_list_id) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id = $shopping_list_id;",
    {
      shopping_list_id: shopping_list_id,
    }
  );

  if (result.rows && result.rows.length > 0) {
    return result.rows[0];
  }

  return { id: 0, name: "Unknown" };
};

export { deactivateByID, create, findAllLists, findById };
