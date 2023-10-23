// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    address public owner;

    struct Product {
        string name;
        uint256 price;
        uint256 quantity;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    constructor() {
        owner = msg.sender;
    }

    function addProduct(string memory _name, uint256 _price, uint256 _quantity) public {
        require(msg.sender == owner, "Only the owner can add products");
        productCount++;
        products[productCount] = Product(_name, _price, _quantity);
    }

    function getProduct(uint256 _productId) public view returns (string memory, uint256, uint256) {
        require(_productId <= productCount && _productId > 0, "Product does not exist");
        Product memory product = products[_productId];
        return (product.name, product.price, product.quantity);
    }
}
