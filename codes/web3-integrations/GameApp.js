import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import NFTCharacter from './contracts/NFTCharacter.json';
import CharacterShop from './contracts/CharacterShop.json';
import BattleSystem from './contracts/BattleSystem.json';

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
        await window.ethereum.enable();
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        const networkId = await web3.eth.net.getId();
        const nftCharacterDeployedNetwork = NFTCharacter.networks[networkId];
        const nftCharacter = new web3.eth.Contract(
          NFTCharacter.abi,
          nftCharacterDeployedNetwork && nftCharacterDeployedNetwork.address,
        );
        setNftCharacter(nftCharacter);

        const characterShopDeployedNetwork = CharacterShop.networks[networkId];
        const characterShop = new web3.eth.Contract(
          CharacterShop.abi,
          characterShopDeployedNetwork && characterShopDeployedNetwork.address,
        );
        setCharacterShop(characterShop);

        const battleSystemDeployedNetwork = BattleSystem.networks[networkId];
        const battleSystem = new web3.eth.Contract(
          BattleSystem.abi,
          battleSystemDeployedNetwork && battleSystemDeployedNetwork.address,
        );
        setBattleSystem(battleSystem);

        const totalSupply = await nftCharacter.methods.totalSupply().call();
        const characters = [];
        for (let i = 0; i < totalSupply; i++) {
          const characterId = await nftCharacter.methods.tokenByIndex(i).call();
          const character = await nftCharacter.methods.getCharacter(characterId).call();
          characters.push({ id: characterId, level: character[0], power: character[1] });
        }
        setCharacters(characters);
      }
    }
    init();
  }, []);

  async function buyCharacter() {
    const price = await characterShop.methods.price().call();
    await characterShop.methods.buyCharacter().send({ from: accounts[0], value: price });
    const totalSupply = await nftCharacter.methods.totalSupply().call();
    const characterId = await nftCharacter.methods.tokenByIndex(totalSupply - 1).call();
    const character = await nftCharacter.methods.getCharacter(characterId).call();
    setCharacters([...characters, { id: characterId, level: character[0], power: character[1] }]);
  }

  async function battle(tokenId1, tokenId2) {
    await battleSystem.methods.battle(tokenId1, tokenId2).send({ from: accounts[0] });
    const character1 = await nftCharacter.methods.getCharacter(tokenId1).call();
    const character2 = await nftCharacter.methods.getCharacter(tokenId2).call();
    const updatedCharacters = characters.map(character => {
      if (character.id === tokenId1) {
        return { ...character, level: character1[0], power: character1[1] };
      } else if (character.id === tokenId2) {
        return { ...character, level: character2[0], power: character2[1] };
      } else {
        return character;
      }
    });
    setCharacters(updatedCharacters);
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