import { renderFile } from "../deps.js";
import * as mainService from "../services/mainService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const showMain = async (_request) => {
  const data = {
    listCount: await mainService.checkList(),
    itemCount: await mainService.checkItem(),
  };

  return new Response(await renderFile("main.eta", data), responseDetails);
};

export { showMain };
