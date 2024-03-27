import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import NFTPlatform from './artifacts/contracts/NFTPlatform.sol/NFTPlatform.json';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x...'; // NFTPlatformコントラクトのアドレス
const contract = new web3.eth.Contract(NFTPlatform.abi, contractAddress);

function App() {
  const [account, setAccount] = useState('');
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    async function fetchAccount() {
      const [account] = await web3.eth.getAccounts();
      setAccount(account);
    }

    fetchAccount();
  }, []);

  async function createNFT(tokenURI) {
    await contract.methods.createNFT(tokenURI).send({ from: account });
    fetchNFTs();
  }

  async function fetchNFTs() {
    const totalSupply = await contract.methods.totalSupply().call();
    const nfts = [];

    for (let i = 1; i <= totalSupply; i++) {
      const tokenId = i;
      const tokenURI = await contract.methods.tokenURI(tokenId).call();
      const owner = await contract.methods.ownerOf(tokenId).call();

      nfts.push({ tokenId, tokenURI, owner });
    }

    setNFTs(nfts);
  }

  return (
    <div>
      <h1>NFT Platform</h1>
      <p>Your account: {account}</p>

      <h2>Create NFT</h2>
      <form onSubmit={e => {
        e.preventDefault();
        createNFT(e.target.elements.tokenURI.value);
      }}>
        <input type="text" name="tokenURI" placeholder="Token URI" required />
        <button type="submit">Create</button>
      </form>

      <h2>Your NFTs</h2>
      <ul>
        {nfts.map(nft => (
          <li key={nft.tokenId}>
            <p>Token ID: {nft.tokenId}</p>
            <p>Token URI: {nft.tokenURI}</p>
            <p>Owner: {nft.owner}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;