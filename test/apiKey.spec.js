import { getApiKey, setApiKey } from "../lib/apiKey.js";

describe("getApiKey", () => {
  it("debería devolver el valor de la API Key", () => {
    const apiKeyValue = "minhaAPIKey";
    localStorage.setItem("apiKeyChat", apiKeyValue);

    expect(getApiKey()).toEqual(apiKeyValue);
  });
});

describe("setApiKey", () => {
  it("debería establecer correctamente la API Key", () => {
    const apiKeyValue = "novaAPIKey";
    setApiKey(apiKeyValue);

    expect(localStorage.getItem("apiKeyChat")).toEqual(apiKeyValue);
  });
});