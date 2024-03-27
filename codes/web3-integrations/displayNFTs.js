import Web3 from 'web3';
import NFTArtABI from './NFTArt.json';

const web3 = new Web3(window.ethereum);
const contractAddress = '0x1234...'; // NFTArtコントラクトのアドレス
const NFTArtContract = new web3.eth.Contract(NFTArtABI, contractAddress);

// NFTの一覧を表示する関数
async function displayNFTs() {
  const totalSupply = await NFTArtContract.methods.totalSupply().call();
  
  for (let i = 1; i <= totalSupply; i++) {
    const tokenURI = await NFTArtContract.methods.tokenURI(i).call();
    const metadata = await fetch(tokenURI).then(res => res.json());
    
    // NFTの情報を表示するHTMLを生成
    const nftElement = `
      <div class="nft-item">
        <img src="${metadata.image}" alt="${metadata.name}">
        <h3>${metadata.name}</h3>
        <p>${metadata.description}</p>
        <button onclick="buyNFT(${i})">Buy</button>
      </div>
    `;
    
    // HTMLをページに追加
    document.getElementById('nft-list').innerHTML += nftElement;
  }
}

// NFTを購入する関数
async function buyNFT(tokenId) {
  const accounts = await web3.eth.requestAccounts();
  const price = web3.utils.toWei('0.1', 'ether'); // NFTの価格（0.1ETH）
  
  await NFTArtContract.methods.safeTransferFrom(contractAddress, accounts[0], tokenId).send({
    from: accounts[0],
    value: price
  });
  
  alert('NFT purchased successfully!');
}

// ページの読み込み時にNFTの一覧を表示
window.onload = displayNFTs;