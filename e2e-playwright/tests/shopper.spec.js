const { test, expect } = require("@playwright/test");

const name = "My first list";

test("Can create a new shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.type("input[name=name]", name);
  await page.click("input[type=submit]");
  await expect(page.locator(`a >> text='${name}'`)).toHaveText(name);
});

test("Can open a shopping list page", async ({ page }) => {
  await page.goto("/lists");
  await page.click(`a >> text='${name}'`);
  await expect(page.locator("h1")).toHaveText(name);
});

const item = "Milk";

test("Can add an item to a shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.click(`a >> text='${name}'`);
  await page.type("input[name=name]", item);
  await page.click("input[type=submit]");
  await expect(page.locator(`td >> text='${item}'`)).toHaveText(item);
});

test("Can mark an item as collected", async ({ page }) => {
  await page.goto("/lists");
  await page.click(`a >> text='${name}'`);
  await page.click('input[value = "Mark collected!"]');
  const element = await page.locator(`td >> text='${item}'`);
  const innerHTML = await page.evaluate(
    (element) => element.innerHTML,
    element
  );
  await expect(innerHTML).toMatch(`<del>${item}</del>`);
});

test("Can deactivate a shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.click('input[value = "Deactivate list!"]');
  await expect(page.locator(`a >> text='${name}'`)).not.toExist();
});
