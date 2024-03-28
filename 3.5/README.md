# NFTアートのデモ構築と実装コード解説

このドキュメントでは、NFTアートの制作から販売までのプロセスを体験するためのデモプロジェクトの構築方法と、その実装コードについて解説します。デモプロジェクトは、OpenZeppelinライブラリを使用してERC-721規格に準拠したNFTを発行し、これを展示・販売するためのシンプルなWebアプリケーションを構築することを目指します。

## 前提条件

- Node.jsとnpmがインストールされていること
- Hardhat開発環境がセットアップされていること
- OpenZeppelinライブラリ（バージョン5.0.0以上）がインストールされていること

## ステップ1: スマートコントラクトの作成

スマートコントラクト`NFTArt`は、ERC-721規格に基づきNFTの発行（ミント）、所有権の確認、総供給量の取得などの機能を提供します。OpenZeppelinの`ERC721`と`ERC721URIStorage`を継承して実装されます。

### コード (`contracts/NFTArt.sol`)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTArt is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("NFTArt", "NFTA") {}

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }
}
```

## ステップ2: NFTメタデータの作成とローカルでの管理

メタデータはJSON形式で記述し、NFTの名前、説明、画像へのURL、その他の属性を含めます。開発とテストのために、ローカル環境でこれらのメタデータを管理します。

### メタデータの例 (`frontend/assets/NFTArt.json`)

```json
{
  "name": "Sample NFT Art",
  "description": "This is a sample NFT art created for demonstration purposes.",
  "image": "http://127.0.0.1:8080/assets/image.png",
  "attributes": [
    {"trait_type": "Artist", "value": "John Doe"},
    {"trait_type": "Year", "value": "2023"}
  ]
}
```

## ステップ3: Webアプリケーションの構築

フロントエンドアプリケーションでは、MetaMaskを介してユーザーがNFTをミントできるようにし、ミントされたNFTの一覧を表示します。Web3.jsを使用してスマートコントラクトと通信します。

### メインスクリプト (`frontend/assets/app.js`)

```javascript
document.addEventListener('DOMContentLoaded', async () => {
    // MetaMaskの確認とユーザーのアカウント接続
    // スマートコントラクトとのやり取り
    // NFTのミント機能とNFT一覧の表示機能
});
```

## MetaMaskの設定と操作

ローカルネットワークをMetaMaskに追加し、テストアカウントをインポートして、フロントエンドアプリケーションでNFTのミントや表示を行う一連のプロセスを簡潔に説明すると以下のようになります。

---

### NFTアートのデモ構築ガイド - ステップ3.5

#### ローカルネットワークの設定とテストアカウントの使用

1. **ローカルネットワークの設定**: MetaMaskに`Localhost 8545`としてローカルネットワークを追加します。このネットワークは、`http://127.0.0.1:8545`をRPC URLとして使用し、チェーンIDは`31337`に設定します。これにより、Hardhatで立ち上げたローカルネットワークとMetaMaskが通信できるようになります。

2. **テストアカウントのインポート**: Hardhatノード起動時に表示されるアカウントのプライベートキーを使用して、MetaMaskにテストアカウントをインポートします。これにより、開発中のアプリケーションで使用するテスト資金にアクセスできます。

#### フロントエンドアプリケーションでの操作

フロントエンドアプリケーションは、ユーザーがNFTをミントし、ミントされたNFTを閲覧できるようにするためのインターフェースを提供します。

1. **アプリケーションの起動**: `index.html`をブラウザで開きます。MetaMaskがインストールされており、ローカルネットワークに接続されていることを確認してください。

2. **NFTのミント**: フロントエンドアプリケーションには、NFTをミントするためのボタンがあります。このボタンをクリックすると、MetaMaskがトランザクションの承認を求めるポップアップを表示します。ガス料金などの詳細を確認し、トランザクションを承認してください。

3. **NFTの表示**: ミントされたNFTは、アプリケーション内で自動的に表示されます。各NFTには、名前、説明、および画像が含まれています。これらの情報は、NFTのメタデータから取得されます。

#### 重要なポイント

- ローカルネットワークでのテストは、本番環境へのデプロイ前にスマートコントラクトとフロントエンドアプリケーションの動作を検証するための重要なステップです。
- メタデータのローカル管理は開発とテストの初期段階において便利ですが、本番環境ではIPFSなどの分散型ファイルストレージを利用することが推奨されます。
- スマートコントラクトのアドレスとABIは、フロントエンドアプリケーションで正しく設定する必要があります。これにより、アプリケーションがスマートコントラクトと適切に通信できるようになります。

このガイドに沿って、NFTアートのデモプロジェクトの構築からテストまでのプロセスを効率的に進めることができます。

