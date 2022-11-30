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

module.exports = function (RED) {
  'use strict';

  const SmaregiApi = require('./lib/smaregiApi.js');

  function SmaregiAuthNode(n) {
    RED.nodes.createNode(this, n);
    this.sandbox = n.sandbox;

    var node = this;
    var credentials = RED.nodes.getCredentials(n.id);

    this.callSmaregiApi = async (exec, path, data, callback) => {
      const config = {
        contractId: credentials.contractId,
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        isSandbox: node.sandbox,
        scopes: [
          "pos.transactions:read", "pos.transactions:write",
          "pos.stock:read", "pos.stock:write", "pos.stock-changes:read"
        ]
      };

      const api = new SmaregiApi(config);

      try {
        await api.authentication();

        let response;

        switch(exec) {
          case 'list':
            response = await api.list(path, data);
            break;
          case 'get':
            response = await api.get(path, data);
            break;
          case 'create':
            response = await api.post(path, data);
            break;
          case 'update':
            response = await api.patch(path, data);
            break;
          case 'upsert':
            response = await api.put(path, data);
            break;
          case 'out-file':
            response = await api.post(path, data);
            break;
          case 'relative-value':
            response = await api.post(path, data);
            break;
          case 'cancel':
            response = await api.post(path, data);
            break;
          case 'delete':
            response = await api.delete(path, data);
            break;
          default:
            break;
        }

        callback(response);

      } catch(err) {
        callback("", err);
      }
    };
  }

  RED.nodes.registerType('smaregi-auth', SmaregiAuthNode, {
    credentials: {
      contractId: { type: 'text' },
      clientId: { type: 'password' },
      clientSecret: { type: 'password' },
    },
  });
};
