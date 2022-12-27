import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    items: await listService.findById(urlParts[2]),
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

const viewLists = async (_request) => {
  const data = {
    lists: await listService.findAllLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listService.deactivateByID(urlParts[2]);

  return requestUtils.redirectTo("/lists");
};

export { addList, viewList, viewLists, deactivateList };
