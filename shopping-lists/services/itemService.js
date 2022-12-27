import { executeQuery } from "../database/database.js";

const markCollected = async (id, shopping_list_id) => {
  await executeQuery(
    "UPDATE shopping_list_items SET collected = true WHERE id = $id AND shopping_list_id = $shopping_list_id;",
    {
      id: id,
      shopping_list_id: shopping_list_id,
    }
  );
};

const addItem = async (shopping_list_id, name) => {
  await executeQuery(
    "INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($shopping_list_id, $name);",
    {
      shopping_list_id: shopping_list_id,
      name: name,
    }
  );
};

export { markCollected, addItem };
