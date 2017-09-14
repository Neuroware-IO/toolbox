### Introducing The Blockchain Embassy of Asia

[BCE.asia](http://bce.asia) is a non-profit digitally distributed organization that is using and promoting blockchain governance as a method for collaboration between various business entities and existing community efforts across Southeast Asia.

### The Embassy Toolkit

As part of our early research in understanding the basic foundations of crypto-currency based blockchains, we developed a set of inline tools that work within the browser and do not require any form of server-side interaction or exposure to privacy risks. For those that know how to download and investigate code, we have our [public repository](https://github.com/Neuroware-IO/toolbox), but for those that want to play-around with the technology without looking at code, they can visit our [online toolbox](http://bce.asia/toolbox/). It currently supports the following features:

* __Key Creation__ - generate standard and master extended public and private keys as well as the public address
* __Multi-Signature Accounts__ - create new multi-signature addresses and then sign and send transactions
* __Hierarchical Keys__ - check the depth and index of extended keys and derive new children via paths
* __Transaction Builder__ - create and view new transactions from API-driven unspents before relaying
* __Post & Fetch Data__ - store and verify structured data using extended keys
* __Lookup Addresses & Transactions__ - search for an address or transaction

The blockchains currently supported include:

* Bitcoin
* Bitcoin Tesnet
* Dogecoin

The APIs currently supported include:

* BlockCypher

### Caveats

This repo currently does not stand-alone as certain style sheets and JS files are still located within [BCE](https://github.com/Neuroware-IO/bceasia) repo. This is a work in progress project currently aimed at supporting the [online version](http://bce.asia/toolbox/), which willeventually be updated to standalone.