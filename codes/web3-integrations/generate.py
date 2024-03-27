from flask import Flask, render_template, request, jsonify
from web3 import Web3
import json

app = Flask(__name__)

# Web3の設定
w3 = Web3(Web3.HTTPProvider("http://localhost:8545"))
contract_address = "0x1234..."
with open("abi.json") as f:
    abi = json.load(f)
contract = w3.eth.contract(address=contract_address, abi=abi)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    noise = tf.random.normal([1, 100])
    generated_image = generator(noise, training=False)
    
    # 生成画像をIPFSに保存
    ipfs_hash = ipfs_client.add_bytes(generated_image.numpy().tobytes())
    token_uri = f"ipfs://{ipfs_hash}"
    
    # NFTを発行
    tx_hash = contract.functions.mintNFT(request.form["address"], token_uri).transact()
    receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    token_id = contract.functions.tokenOfOwnerByIndex(request.form["address"], 0).call()
    
    return jsonify({"token_id": token_id, "token_uri": token_uri})

if __name__ == "__main__":
    app.run(debug=True)