import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import NFTCharacterABI from './contracts/NFTCharacter.json';
import CharacterShopABI from './contracts/CharacterShop.json';
import BattleSystemABI from './contracts/BattleSystem.json';

// コントラクトのアドレスをここに置き換えてください
const NFTCharacterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CharacterShopAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const BattleSystemAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";


function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [nftCharacter, setNftCharacter] = useState(null);
  const [characterShop, setCharacterShop] = useState(null);
  const [battleSystem, setBattleSystem] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        // ABIとアドレスを使用してコントラクトインスタンスを作成
        const nftCharacter = new web3.eth.Contract(NFTCharacterABI.abi, NFTCharacterAddress);
        const characterShop = new web3.eth.Contract(CharacterShopABI.abi, CharacterShopAddress);
        const battleSystem = new web3.eth.Contract(BattleSystemABI.abi, BattleSystemAddress);

        setNftCharacter(nftCharacter);
        setCharacterShop(characterShop);
        setBattleSystem(battleSystem);

        const totalSupply = await nftCharacter.methods.totalSupply().call();
        const characters = [];
        for (let i = 0; i < totalSupply; i++) {
          const characterId = await nftCharacter.methods.tokenByIndex(i).call();
          const character = await nftCharacter.methods.getCharacter(characterId).call();
          characters.push({ id: Number(characterId), level: Number(character[0]), power: Number(character[1]) });
        }
        setCharacters(characters);
      }
    }
    init();
  }, []);
  async function buyCharacter() {
    try {
      const price = await characterShop.methods.price().call();
      await characterShop.methods.buyCharacter().send({ from: accounts[0], value: price.toString() });
      const totalSupply = await nftCharacter.methods.totalSupply().call();
      const characterId = await nftCharacter.methods.tokenByIndex(Number(totalSupply) - 1).call();
      const character = await nftCharacter.methods.getCharacter(characterId).call();
      setCharacters([...characters, { id: Number(characterId), level: Number(character[0]), power: Number(character[1]) }]);
    } catch (error) {
      console.error("トランザクションエラー", error);
    }
  }

  async function battle(tokenId1, tokenId2) {
    try {
      await battleSystem.methods.battle(tokenId1, tokenId2).send({ from: accounts[0] });
      const character1 = await nftCharacter.methods.getCharacter(tokenId1).call();
      const character2 = await nftCharacter.methods.getCharacter(tokenId2).call();
      const updatedCharacters = characters.map(character => {
        if (Number(character.id) === Number(tokenId1)) {
          return { ...character, level: Number(character1[0]), power: Number(character1[1]) };
        } else if (Number(character.id) === Number(tokenId2)) {
          return { ...character, level: Number(character2[0]), power: Number(character2[1]) };
        } else {
          return character;
        }
      });
      setCharacters(updatedCharacters);
    } catch(error) {
      console.error("トランザクションエラー",error);
    }
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contracts...</div>;
  }

  return (
    <div>
      <h1>NFT Character Game</h1>
      <button onClick={buyCharacter}>Buy Character</button>
      <h2>Your Characters:</h2>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            Character #{character.id}, Level: {character.level}, Power: {character.power}
          </li>
        ))}
      </ul>
      <h2>Battle:</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          const tokenId1 = event.target.elements[0].value;
          const tokenId2 = event.target.elements[1].value;
          battle(tokenId1, tokenId2);
        }}
      >
        <div>
          <label>Character 1 ID:</label>
          <input type="text" />
        </div>
        <div>
          <label>Character 2 ID:</label>
          <input type="text" />
        </div>
        <button type="submit">Battle</button>
      </form>
    </div>
  );
}

export default App;

