//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// import "@openzeppelin/";

contract soulBT is Initializable, OwnableUpgradeable, ERC721Upgradeable, ERC721URIStorage {

    // using Counters for Counters.Counter;
    string public baseURI;
    uint256 public tokenId;
    mapping (string => bool) public addressExists;
    mapping (address => uint256[]) private _ownedTokens;

    // Counters.Counter private _tokenIds;
    string private _baseTokenURI;

    // Constructor to initialize the NFT's name, symbol, and baseTokenURI
    // constructor() ERC721("soulBT Surfer NFT", "SBT") {
    // }
    function initialize(address initialOwner) public initializer {
        __ERC721_init("soulBT", "SKBT");
        // __Ownable_init(initialOwner);
    }


    // Function to mint a new NFT to a specified recipient; only the owner can call this
    function mintTo(address recipient, string memory uri) public onlyOwner {
        require(recipient != address(0), "recipient must not be the zero address");
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, uri);
        tokenId++;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }
}