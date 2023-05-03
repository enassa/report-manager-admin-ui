export class API_HANDLER {
  #baseURL;
  #contentType;
  #responseType;
  #generalToken;
  #callBack;
  #token;
  #accept;
  #accessControl;
  constructor(
    baseURL,
    accessControl = "*",
    responseType = "json",
    contentType = "application/json",
    accept = "application/json",
    callBack = () => {},
    generalToken = ""
  ) {
    baseURL === undefined &&
      alert("you have not provided a base url for your API_HANDLER instance");

    this.#baseURL = baseURL;
    this.#contentType = contentType;
    this.#responseType = responseType;
    this.#accept = accept;
    this.#generalToken = generalToken;
    this.#accessControl = accessControl;
    this.#callBack = callBack;
  }
  setToken(token) {
    this.#token = token;
  }
  #REQUEST = async (endpoint, data, responseType, method) => {
    let url = `${this.#baseURL}${endpoint}`;
    return fetch(url, {
      method,
      headers: {
        "Content-Type": this.#contentType,
        Accept: this.#accept,
        "Access-Control-Allow-Origin": this.#accessControl,
      },
      body: method !== "GET" && !!data ? JSON.stringify(data) : undefined,
    })
      .then(async (response) => {
        if (response.ok) {
          if (responseType === "json")
            return {
              data: await response.json(),
              ok: true,
              status: response.status,
            };
          if (responseType === "text")
            return {
              data: await response.text(),
              ok: true,
              status: response.status,
            };
        }
        return { ok: false, error: response, status: response.status };
      })
      .catch((error) => {
        return { ok: false, error: error, status: undefined };
      })
      .finally((response) => {
        this.#callBack(response);
      });
  };
  GET(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST(endpoint, data, responseType, "GET");
  }
  POST(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST(endpoint, data, responseType, "POST");
  }
  PUT(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST(endpoint, data, responseType, "PUT");
  }
  PATCH(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST(endpoint, data, responseType, "PATCH");
  }
  DELETE(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST(endpoint, data, responseType, "DELETE");
  }

  #REQUEST_WITH_TOKEN = async (path, data, responseType, method) => {
    let url = `${this.#baseURL}${path}`;
    return fetch(url, {
      method,
      headers: {
        "Content-Type": this.#contentType,
        Accept: this.#accept,
        "Access-Control-Allow-Origin": this.#accessControl,
        Authorization: `Bearer ${this.#token}`,
      },
      body: method !== "GET" && !!data ? JSON.stringify(data) : undefined,
    })
      .then(async (response) => {
        if (response.ok) {
          if (responseType === "json")
            return {
              data: await response.json(),
              ok: true,
              status: response.status,
            };
          if (responseType === "text")
            return {
              data: await response.text(),
              ok: true,
              status: response.status,
            };
        }
        return { ok: false, error: response, status: response.status };
      })
      .catch((error) => {
        return { ok: false, error: error, status: undefined };
      })
      .finally((response) => {
        this.#callBack(response);
      });
  };
  GET_WITH_TOKEN(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST_WITH_TOKEN(endpoint, data, responseType, "GET");
  }
  POST_WITH_TOKEN(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST_WITH_TOKEN(endpoint, data, responseType, "POST");
  }
  PUT_WITH_TOKEN(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST_WITH_TOKEN(endpoint, data, responseType, "PUT");
  }
  PATCH_WITH_TOKEN(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST_WITH_TOKEN(endpoint, data, responseType, "PATCH");
  }
  DELETE_WITH_TOKEN(endpoint, data, responseType = this.#responseType) {
    return this.#REQUEST_WITH_TOKEN(endpoint, data, responseType, "DELETE");
  }
}
