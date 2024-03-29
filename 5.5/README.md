# 5.5 NFTゲームのデモ構築と実装コード解説

このディレクトリでは、シンプルなNFTゲームのデモを構築し、その実装コードを解説します。プレイヤーがNFTキャラクターを収集・育成するゲームを想定し、以下の機能を実装します。

- NFTキャラクターの発行
- キャラクターの購入
- キャラクター間のバトル

## 前提条件

- Solidity言語の基本的な知識
- Hardhatの開発環境が設定されていること
- OpenZeppelinライブラリがインストールされていること

## ディレクトリ構成

```
.
├── README.md
├── contracts
│   ├── BattleSystem.sol
│   ├── CharacterShop.sol
│   └── NFTCharacter.sol
├── scripts
│   └── deploy.js
├── test
│   └── nft-game.test.js
└── web
    ├── package.json
    ├── public
    │   └── index.html
    └── src
        ├── App.js
        ├── contracts
        │   ├── BattleSystem.json
        │   ├── CharacterShop.json
        │   └── NFTCharacter.json
        └── index.js
```

## 環境構築

1. プロジェクトディレクトリの作成と初期化
```
node -v
npm -v
npm install -g hardhat
npx hardhat init
npm install @openzeppelin/contracts
```

## 実行手順

1. スマートコントラクトのコンパイルとデプロイ
```
npx hardhat compile
npx hardhat run scripts/deploy.js
```

2. フロントエンドの起動
```
cd frontend
npm install
npm start
```

3. ブラウザでhttp://localhost:3000 にアクセスし、アプリケーションを使用

## 主要なファイルの説明

- `contracts/NFTCharacter.sol`: NFTキャラクターを表現するスマートコントラクト
- `contracts/CharacterShop.sol`: キャラクターの購入を管理するスマートコントラクト
- `contracts/BattleSystem.sol`: キャラクター間のバトル機能を実装するスマートコントラクト
- `scripts/deploy.js`: スマートコントラクトをデプロイするためのスクリプト
- `test/nft-game.test.js`: スマートコントラクトのテストコード
- `frontend/src/App.js`: フロントエンドのメインコンポーネント

## 注意事項

- このデモは教育目的で作成されたものであり、実際のNFTゲームとしての完全性は保証されていません。
- スマートコントラクトのセキュリティについては十分に注意し、必要に応じて監査を受けることをお勧めします。

NFTゲーム開発の基礎となるコードとして、このデモを活用していただければ幸いです。