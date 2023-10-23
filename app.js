const contractAddress = '0xDA0bab807633f07f013f94DD0E6A4F96F8742B53'; // Replace with your contract address
const contractABI = [[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "productCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
    // ABI of your Solidity contract
];

// Use the WebSocket (WSS) provider for real-time interactions
const providerUrl = 'wss://floral-frequent-orb.quiknode.pro/fdd92c34b58025133dd05a3f7fc8a08f14b705ce/';
const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getProduct() {
    const productId = document.getElementById("productId").value;
    const result = await contract.methods.getProduct(productId).call();
    document.getElementById("productInfo").innerText = `Name: ${result[0]}, Price: ${result[1]}, Quantity: ${result[2]}`;
}

async function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;

    const accounts = await web3.eth.getAccounts();
    await contract.methods.addProduct(name, price, quantity).send({ from: accounts[0] });
}

// Event listeners for buttons
document.getElementById("getButton").addEventListener("click", getProduct);
document.getElementById("addButton").addEventListener("click", addProduct);
