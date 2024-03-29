# 生成AIを用いたNFTアートのデモアプリケーション

このプロジェクトは、生成AI技術を用いてユニークなデジタルアートを生成し、それをNFT（Non-Fungible Token）としてイーサリアムブロックチェーン上にミントするデモアプリケーションです。ユーザーは、簡単なプロンプトを入力することで独自のアートワークを生成し、そのアートワークを自身のデジタルコレクションに加えることができます。

## 特徴

- 生成AIを使用してユーザーの入力に基づくアートワークの生成
- 生成されたアートワークのメタデータをオフチェーンに保存
- メタデータのハッシュを用いてブロックチェーン上でのデータ完全性の保証
- 生成されたアートワークをNFTとしてミント
- ミントされたNFTのギャラリー表示
- FlaskベースのWebアプリケーション

## 技術スタック

- **フロントエンド**: HTML, CSS, JavaScript
- **バックエンド**: Flask (Python)
- **AIモデル**: Stability AI の Stable Diffusion
- **ブロックチェーン**: Ethereum, Solidity, OpenZeppelin, Ethers.js
- **開発ツール**: Hardhat, MetaMask

## セットアップ方法

1. **プロジェクトのクローン**

    ```bash
    git clone <this-repository-url>
    cd <project-directory>
    ```

2. **依存関係のインストール**

    Python依存関係:

    ```bash
    pip install -r requirements.txt
    ```

    Node.js依存関係:

    ```bash
    npm install
    ```

3. **Flaskアプリケーションの実行**

    ```bash
    python main.py
    ```

    これにより、デフォルトで http://localhost:5000 でサーバが起動します。

4. **ローカルブロックチェーンネットワークの立ち上げ**

    ```bash
    npx hardhat node
    ```

5. **スマートコントラクトのデプロイ**

    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

## 使用方法

1. **Webアプリケーションへのアクセス**: ブラウザで http://localhost:5000 を開きます。
2. **アートワークの生成**: ユーザーインターフェースからプロンプトを入力し、生成ボタンをクリックします。
3. **NFTのミント**: 生成されたアートワークを確認し、ミントボタンをクリックしてNFTとしてミントします。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
