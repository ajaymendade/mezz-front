# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MezzproInvoice is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MezzproInvoice", "INVOICE") {}

    function tokenizeInvoice(address _seller, address _buyer, uint256 _amount, uint256 _dueDate) external onlyOwner {
    require(_seller != address(0) && _buyer != address(0), "Invalid addresses");
    require(_amount > 0, "Amount should be greater than 0");

    uint256 tokenAmount = _amount;  // Assuming 1 INR = 1 NFT

    // Loop to mint tokens to _seller and store due date
    for (uint256 i = 0; i < tokenAmount; i++) {
        uint256 tokenId = _tokenIdCounter.current();
        _mint(_seller, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked(tokenId))); // Set the URI
        _tokenIdCounter.increment();

        // Store the due date associated with the token
        tokenDueDates[tokenId] = _dueDate;
    }
}

// Mapping to store due dates associated with tokens
mapping(uint256 => uint256) public tokenDueDates;

 
// Fetch the count of NFTs owned by an address
    function getTokenBalanceCount(address _address) external view returns (uint256) {
        return balanceOf(_address);
    
    }
function redeemTokensOnDueDate(uint256 _tokenId, address _redeemer) external {
    require(_exists(_tokenId), "Token does not exist");
    require(ownerOf(_tokenId) == _redeemer, "Only the token owner can redeem tokens");
    
    uint256 dueDate = tokenDueDates[_tokenId];
    require(block.timestamp >= dueDate, "Tokens can only be redeemed after due date");

    _burn(_tokenId); // Burn the token
}
 
}
