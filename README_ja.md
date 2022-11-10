node-red-contrib-smaregi
========================
このモジュールは、<a href="https://www1.smaregi.dev/apidoc/" target="_new">スマレジ・プラットフォームAPI</a> の<a href="http://nodered.org" target="_new">Node-RED</a> ノードコレクションです。

[![NPM](https://nodei.co/npm/node-red-contrib-smaregi.png?downloads=true)](https://nodei.co/npm/node-red-contrib-smaregi/)

前提条件
-------

node-red-contrib-smaregiは、<a href="http://nodered.org" target="_new">Node-RED</a>のインストールが必要です。


インストール
-------

Node-REDをインストールしたルートディレクトリで以下のコマンドを実行します。

    npm install node-red-contrib-smaregi

Node-REDインスタンスを再起動すると、パレットにsmaregiノードが表示されて使用可能になります。

概要
-------

node-red-contrib-smaregiは、次のモジュールを含んでいます。

### 認証

スマレジ・プラットフォームAPI の認証を行います。

デベロッパーサイトのアプリの「環境設定」ページから確認できるクライアントIDとクライアントシークレットを使用して認証します。

### smaregi-transactions ノード

smaregi-transactions ノードでは、次の取引処理を実行します。

- **取引一覧取得** - 取引情報一覧を取得します。
- **取引登録** - 取引を登録します。
- **取引取得** - 取引情報を取得します。
- **取引更新** - 取引情報を更新します。
- **取引取消** - 取引を取消します。
- **取引打消取消** - 取引を打消取消します。指定された取引に対して、返品する取引情報を作成します。
- **取引会員更新** - 取引の会員情報を更新します。
- **取引明細一覧CSV作成** - 取引明細情報一覧CSVファイルを作成します。
- **取引明細取得** - 取引明細情報を取得します。
- **取置き一覧取得** - 取置き一覧を取得します。
- **取置き登録** - 取置き取引を登録します。
- **取置き取得** - 取置き情報を取得します。
- **取置き打消取消** - 取置きを打消取消します。指定された取置きに対して、返品する取置き情報を作成します。
- **仮販売一覧取得** - 仮販売取引情報一覧を取得します。
- **仮販売登録** - 仮販売取引を登録します。
- **仮販売取得** - 仮販売取引情報を取得します。
- **仮販売削除** - 指定された仮販売取引を削除します。
- **仮販売状態変更** - 仮販売取引の状態を変更します。


**注**： 詳細は、[スマレジ・プラットフォームAPI POS仕様書](https://www1.smaregi.dev/apidoc/)を参照してください。


謝辞
-------

node-red-contrib-smaregiは、次のオープンソースソフトウェアを使用しています。

- [axios](https://github.com/axios/axios): ブラウザーおよび node.js 用の Promise ベースの HTTP クライアント。


ライセンス
-------

こちらを参照してください。[license](https://github.com/joeartsea/node-red-contrib-smaregi/blob/master/LICENSE) (Apache License Version 2.0).


貢献
-------

[GitHub issues](https://github.com/joeartsea/node-red-contrib-smaregi/issues)への問題提起、Pull requestsのどちらもあなたの貢献を歓迎します。


開発者
-------

開発者がnode-red-contrib-smaregiのソースを改変する場合、以下のコードを実行してクローンを作成します。

```
cd ~\.node-red\node_modules
git clone https://github.com/joeartsea/node-red-contrib-smaregi.git
cd node-red-contrib-smaregi
npm install
```
