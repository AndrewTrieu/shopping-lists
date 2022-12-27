import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const markItemCollected = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await itemService.markCollected(urlParts[4], urlParts[2]);

  return requestUtils.redirectTo(`/lists/${urlParts[4]}`);
};

const addItemToList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const formData = await request.formData();
  const name = formData.get("name");
  await itemService.addItem(urlParts[2], name);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { markItemCollected, addItemToList };
