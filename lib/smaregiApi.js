/**
 * Copyright 2018 Atsushi Kojo.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

 'use strict';

 const axios = require('axios');

/**
 *
 * @param config {
 *  contractId: string
 *  clientId: string
 *  clientSecret: string
 *  isSandbox: boolean
 *  scopes: array
 * }
 */
module.exports = function(config) {
  const contractId = config.contractId;
  const clientId = config.clientId;
  const clientSecret = config.clientSecret;
  const scopes = config.scopes;

  let authHostName = "";
  let hostName = "";
  let access_token = null;

  if (config.isSandbox) {
    authHostName = "id.smaregi.dev";
    hostName = "api.smaregi.dev";
  } else {
    authHostName = "id.smaregi.jp";
    hostName = "api.smaregi.jp";
  }

  this.authentication = async () => {
    const reqBody = {
      "grant_type": "client_credentials",
      "scope": scopes.join(" ")
    };
    const config = createConfig("auth", "", reqBody);
    const res = await callSmaregiApi(config);

    access_token = res.access_token;
  };

  this.list = async (path, data) => {
    const config = createConfig("get", path, data);
    const res = await callSmaregiApi(config);
    return res;
  };

  this.get = async (path, data) => {
    const config = createConfig("get", path, data);
    const res = await callSmaregiApi(config);
    return res;
  };

  this.post = async (path, data) => {
    const config = createConfig("post", path, data);
    const res = await callSmaregiApi(config);
    return res;
  };

  this.patch = async (path, data) => {
    const config = createConfig("patch", path, data);
    const res = await callSmaregiApi(config);
    return res;
  };

  this.put = async (path, data) => {
    const config = createConfig("put", path, data);
    const res = await callSmaregiApi(config);
    return res;
  };

  this.delete = async (path, data) => {
    const config = createConfig("delete", path, data);
    const res = await callSmaregiApi(config);
    return res;
  };

  const createConfig = (method, path, data) => {
    let request_url, headers;
    if (method === "auth") {
      request_url = `https://${authHostName}/app/${contractId}/token`;
      const authStr = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${authStr}`,
      };
      method = 'post';

    } else {
      request_url = `https://${hostName}/${contractId}/pos/${path}`;
      headers = {
        "Authorization": `Bearer  ${access_token}`,
      };
    }

    if (data && typeof data === 'string') {
      data = JSON.parse(data);
    }

    const requestConfig = {
      url: request_url,
      method: method,
      headers: headers,
      responseType: 'json'
    };

    if (method === "get") {
      requestConfig["params"] = data;
    } else {
      requestConfig["data"] = data;
    }

    return requestConfig;
  }

  const callSmaregiApi = async (config) => {
    try {
      const response = await axios(config);
      return response.data;

    } catch(err) {
      const errData = err.response.data;
      const errText = `${errData.title}(${errData.status}): ${errData.detail}`;
      throw new Error(errText);
    }
  };
}