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

	function SmaregiTransactionsNode(n) {
		RED.nodes.createNode(this, n);
		this.auth = n.auth;
		this.operation = n.operation;
		this.transactionId = n.transactionId;
		this.limit = n.limit;
		this.page = n.page;
		this.dateTimeFrom = n.dateTimeFrom;
		this.dateTimeTo = n.dateTimeTo;
		this.callbackUrl = n.callbackUrl;
		this.temporaryStatus = n.temporaryStatus;
		this.dataJson = n.dataJson;

		this.config = RED.nodes.getNode(this.auth);
		var node = this;

		if (node.config) {

			node.on('input', function(msg) {
				const transactionId = msg.transactionId || node.transactionId;
				const limit = msg.limit || node.limit || '100';
				const page = msg.page || node.page || '1';
				const dateTimeFrom = msg.dateTimeFrom || node.dateTimeFrom;
				const dateTimeTo = msg.dateTimeTo || node.dateTimeTo;
				const callbackUrl = msg.callbackUrl || node.callbackUrl;
				const temporaryStatus = msg.temporaryStatus || node.temporaryStatus;

				let dataJson = msg.dataJson || node.dataJson || {};
				if (dataJson && typeof dataJson === 'string') {
					dataJson = JSON.parse(dataJson);
				}

				let path = 'transactions';
				let execute;

				switch(node.operation) {
					case 'list':
						execute = 'list';
						dataJson = setJsonData("limit", limit, dataJson);
						dataJson = setJsonData("page", page, dataJson);
						break;
					case 'create':
						execute = 'create';
						break;
					case 'get':
						execute = 'get';
						path = `${path}/${transactionId}`;
						break;
					case 'update':
						execute = 'update';
						path = `${path}/${transactionId}`;
						break;
					case 'cancel':
						execute = 'cancel';
						path = `${path}/${transactionId}/cancel`;
						break;
					case 'dispose':
						execute = 'cancel';
						path = `${path}/${transactionId}/dispose`;
						break;
					case 'customer':
						execute = 'update';
						path = `${path}/${transactionId}/customer`;
						break;
					case 'out-file':
						execute = 'out-file';
						path = `${path}/details/out_file_async`;
						dataJson = setJsonData("transactionDateTimeFrom", dateTimeFrom, dataJson);
						dataJson = setJsonData("transactionDateTimeTo", dateTimeTo, dataJson);
						dataJson = setJsonData("callbackUrl", callbackUrl, dataJson);
						break;
					case 'details':
						execute = 'get';
						path = `${path}/${transactionId}/details`;
						break;
					case 'layaways':
						execute = 'list';
						path = `${path}/layaways`;
						dataJson = setJsonData("limit", limit, dataJson);
						dataJson = setJsonData("page", page, dataJson);
						break;
					case 'create-layaways':
						execute = 'create';
						path = `${path}/layaways`;
						break;
					case 'get-layaways':
						execute = 'get';
						path = `${path}/layaways/${transactionId}`;
						break;
					case 'dispose-layaways':
						execute = 'cancel';
						path = `${path}/layaways/${transactionId}/dispose`;
						break;
					case 'temporaries':
						execute = 'list';
						path = `${path}/temporaries`;
						dataJson = setJsonData("limit", limit, dataJson);
						dataJson = setJsonData("page", page, dataJson);
						break;
					case 'create-temporaries':
						execute = 'create';
						path = `${path}/temporaries`;
						break;
					case 'get-temporaries':
						execute = 'get';
						path = `${path}/temporaries/${transactionId}`;
						break;
					case 'delete-temporaries':
						execute = 'delete';
						path = `${path}/temporaries/${transactionId}`;
						break;
					case 'status-temporaries':
						execute = 'update';
						path = `${path}/temporaries/${transactionId}/status`;
						dataJson = setJsonData("status", temporaryStatus, dataJson);
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

	RED.nodes.registerType("smaregi-transactions", SmaregiTransactionsNode);
}
