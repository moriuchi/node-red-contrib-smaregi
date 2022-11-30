node-red-contrib-smaregi
========================

[**Japanese**](./README_ja.md)

A collection of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for <a href="https://www1.smaregi.dev/apidoc/" target="_new">smaregi Platform API</a>.

[![NPM](https://nodei.co/npm/node-red-contrib-smaregi.png?downloads=true)](https://nodei.co/npm/node-red-contrib-smaregi/)

Pre-requisites
-------

The node-red-contrib-smaregi requires <a href="http://nodered.org" target="_new">Node-RED</a> to be installed.


Install
-------

Run the following command in the root directory of your Node-RED install.

    npm install node-red-contrib-smaregi

Restart your Node-RED instance, the smaregi node appears in the palette and ready for use.


Overview
-------

node-red-contrib-smaregi contains the following modules.

### Authenticate

Authentication of the smaregi Platform API.

Authenticate using the Client ID and Client Secret, which can be found on the "environment settings" page of the application on the Developer Site.


### smaregi-transactions node

The smaregi-transactions node executes the following transaction process.

- **List Transaction** - Retrieves a list of transaction information.
- **Create Transaction** - Register the transaction.
- **Get Transactions** - Retrieve transaction information.
- **Update Transaction** - Update transaction information.
- **Cancel Transaction** - Cancel the transaction.
- **Dispose Transaction** - Dispose the transaction. Creates return transaction information for the specified transaction.
- **Update Customer** - Update customer information for the transaction.
- **CSV Output of Transaction Details** - Create a CSV file of the list of transaction details information.
- **Get Transaction Details** - Retrieve transaction details information.
- **List Layaways** - Retrieve a list of layaway items.
- **Create Layaways** - Register a layaway transaction.
- **Get Layaways** - Retrieve the information on layaway.
- **Dispose Layaways** - Dispose the information on layaway. Creates return layaway transaction information for the specified layaway transaction.
- **List Temporaries** - Retrieve a list of temporaries transaction information.
- **Create Temporaries** - Register a temporary transaction.
- **Get Temporaries** - Retrieve temporary transaction information.
- **Delete Temporaries** - Delete the temporary transaction.
- **Change Status of Temporaries** - Changes the status of a temporary transaction.

### smaregi-stock node

The smaregi-stock node executes the following stock process.

- **List Stock** - Retrieves a list of stock information.
- **Update Stock** - Update stock information. The stock amount is updated to equal the value entered.
- **Update Stock Relative Value** - Updates stock information. The stock amount is updated to the current value plus the entered value (or minus the entered value if the entered value is negative).
- **Bulk Stock Relative Value** - Updates stock information in a batch. The stock amount is updated to the current value plus the entered value (or minus the entered value if the entered value is negative).
- **Get Stock Change History** - Retrieve stock change history information.

**Note**： For more information, see [smaregi Platform API POS reference](https://www1.smaregi.dev/apidoc/).


Acknowledgements
-------

The node-red-contrib-smaregi uses the following open source software:

- [axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js


License
-------

See [license](https://github.com/joeartsea/node-red-contrib-smaregi/blob/master/LICENSE) (Apache License Version 2.0).


Contributing
-------

Both submitting issues to [GitHub issues](https://github.com/joeartsea/node-red-contrib-smaregi/issues) and Pull requests are welcome to contribute.


Developers
-------

If the developer wants to modify the source of node-red-contrib-smaregi, run the following code to create a clone.

```
cd ~\.node-red\node_modules
git clone https://github.com/joeartsea/node-red-contrib-smaregi.git
cd node-red-contrib-smaregi
npm install
```
