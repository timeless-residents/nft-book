# Web3 Integration Examples

このディレクトリには、NFTスマートコントラクトとのインタラクションを行うためのWeb3インテグレーションのサンプルコードが含まれています。これらのサンプルは、書籍『NFTが切り拓く新時代 - デジタル資産革命の全貌』の内容に基づいています。

## ファイル構成

- `displayNFT.js`: NFTの一覧表示と購入を行うサンプルコード
- `GameApp.js`: NFTキャラクターゲームのフロントエンドアプリケーションのサンプルコード
- `generate.py`: 生成AIを用いてNFTを作成するFlaskアプリケーションのサンプルコード
- `PlatformApp.js`: NFTプラットフォームのフロントエンドアプリケーションのサンプルコード

## 事前準備

これらのサンプルコードを実行するには、以下の環境とツールが必要です。

- Node.js (v14以上)
- npm (v6以上)
- Pythonの場合:
  - Python (v3.6以上)
  - Flask
  - Web3.py
- スマートコントラクトとのインタラクションを行うためのイーサリアムウォレット（MetaMask等）
- イーサリアムのテストネットまたはローカル環境（Ganache等）

また、サンプルコードを実行する前に、以下の手順を実行してください。

1. 必要なパッケージのインストール:
   - JavaScriptの場合: `npm install`
   - Pythonの場合: `pip install -r requirements.txt`
2. スマートコントラクトのデプロイ:
   - `truffle migrate`または`hardhat run scripts/deploy.js`を実行し、デプロイされたコントラクトのアドレスを取得
   - サンプルコード内の`contractAddress`変数に、デプロイされたコントラクトのアドレスを設定

## 使用方法

各サンプルコードの使用方法は以下の通りです。

### displayNFT.js

1. `displayNFT.js`を開き、`contractAddress`変数にNFTArtコントラクトのアドレスを設定
2. `node displayNFT.js`を実行
3. ブラウザで`http://localhost:3000`にアクセス
4. NFTの一覧が表示され、購入ボタンをクリックすることでNFTを購入可能

### GameApp.js

1. `GameApp.js`を開き、`NFTCharacter.json`、`CharacterShop.json`、`BattleSystem.json`のパスを適宜修正
2. `npm start`を実行
3. ブラウザで`http://localhost:3000`にアクセス
4. キャラクターの購入とバトルを行うことが可能

### generate.py

1. `generate.py`を開き、`contract_address`変数にNFTコントラクトのアドレスを設定
2. `python3 generate.py`を実行
3. ブラウザで`http://localhost:5000`にアクセス
4. フォームからNFTの受取人のアドレスを入力し、NFTを生成

### PlatformApp.js

1. `PlatformApp.js`を開き、`contractAddress`変数にNFTPlatformコントラクトのアドレスを設定
2. `npm start`を実行
3. ブラウザで`http://localhost:3000`にアクセス
4. NFTの作成とNFT一覧の表示が可能

## 注意事項

- これらのサンプルコードは、学習用の簡易的な実装であり、エラーハンドリングや例外処理等は省略されています。
- 実際のアプリケーション開発では、セキュリティ、パフォーマンス、ユーザビリティ等を考慮し、適切に設計・実装する必要があります。
- スマートコントラクトとのインタラクションを行う際は、ガス代の設定や、トランザクションの確認等、イーサリアムのベストプラクティスに従ってください。

## ライセンス

このディレクトリに含まれるコードは、MITライセンスのもとで公開されています。詳細は、[LICENSE](../LICENSE)ファイルを参照してください。

## 貢献

このディレクトリのコンテンツに関する改善案やフィードバックは、IssueまたはPull Requestの形で歓迎しています。詳細は、[CONTRIBUTING.md](../CONTRIBUTING.md)ファイルを参照してください。

## 問い合わせ

このディレクトリに関する質問やコメントは、Issueページからお願いします。

Web3インテグレーションは、NFTプロジェクトにおいて重要な役割を果たします。ここで提供するサンプルコードが、皆様のNFTプロジェクトの開発に役立つことを願っています。
