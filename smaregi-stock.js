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

 module.exports = function(RED) {
	'use strict';

	function SmaregiStockNode(n) {
		RED.nodes.createNode(this, n);
		this.auth = n.auth;
		this.operation = n.operation;
		this.limit = n.limit;
		this.page = n.page;
		this.productId = n.productId;
		this.storeId = n.storeId;
		this.stockAmount = n.stockAmount;
		this.stocks = n.stocks;
		this.callbackUrl = n.callbackUrl;

		this.config = RED.nodes.getNode(this.auth);
		var node = this;

		if (node.config) {

			node.on('input', function(msg) {
				const limit = msg.limit || node.limit || '100';
				const page = msg.page || node.page || '1';
				const productId = msg.productId || node.productId;
				const storeId = msg.storeId || node.storeId;
				const stockAmount = msg.stockAmount || node.stockAmount;
				const callbackUrl = msg.callbackUrl || node.callbackUrl;
				let stocks = msg.stocks || node.stocks;
				if (stocks && typeof stocks === 'string') {
					stocks = JSON.parse(stocks);
				}

				let dataJson = msg.dataJson || node.dataJson || {};
				if (dataJson && typeof dataJson === 'string') {
					dataJson = JSON.parse(dataJson);
				}

				let path = 'stock';
				let execute;

				switch(node.operation) {
					case 'list':
						execute = 'list';
						dataJson = setJsonData("limit", limit, dataJson);
						dataJson = setJsonData("page", page, dataJson);
						break;
					case 'update':
						execute = 'update';
            path = `${path}/${productId}`;
						dataJson = setJsonData("storeId", storeId, dataJson);
						dataJson = setJsonData("stockAmount", stockAmount, dataJson);
						break;
					case 'add':
						execute = 'relative-value';
						path = `${path}/${productId}/add`;
						dataJson = setJsonData("storeId", storeId, dataJson);
						dataJson = setJsonData("stockAmount", stockAmount, dataJson);
						break;
					case 'bulk':
						execute = 'relative-value';
						path = `${path}/add/bulk`;
						dataJson = setJsonData("stock", stocks, dataJson);
						dataJson = setJsonData("callbackUrl", callbackUrl, dataJson);
						break;
					case 'get':
						execute = 'get';
						path = `${path}/changes/${productId}/${storeId}`;
						dataJson = setJsonData("limit", limit, dataJson);
						dataJson = setJsonData("page", page, dataJson);
						break;

					default:
						break;
				}

				node.config.callSmaregiApi(execute, path, dataJson, function(result, err) {
					if (err) {
						node.error(err.toString(), msg);
						node.status({ fill: 'red', shape: 'ring', text: 'failed' });
						return;

					} else {
						node.status({});
					}
					msg.payload = result;
					node.send(msg);
				});
			});

		} else {
			this.error('missing smaregi configuration');
		}

		const setJsonData = (key, val, data) => {
			if (!data[key]) {
				data[key] = val;
			}

			return data;
		};
	}

	RED.nodes.registerType("smaregi-stock", SmaregiStockNode);
}
