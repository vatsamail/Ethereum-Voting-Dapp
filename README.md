# Ethereum-Voting-Dapp
### Learning Ethereum technology by developing a de-centralized voting application using *Solidity* programming language on a _windows machine_. :astonished:
### The content of this repository is based on the tutorials by [Zastrin](http://zastrin.com) :pray:

### Installations
#### Installing nodejs
* invoke windows power_shell in Administrator mode
>npm install -g --production windows-build-tools

#### installing relevant packages
>npm  install solc@0.4.23 web3@0.20.1 ganache-cli

#### installing truffle
>npm install truffle@4.1.8

### Running Ganache in a separate command prompt
>node_modules\.bin\ganache-cli


### Node Interface (non-truffle mode)
>node

#### Compiling the Dapp (non-truffle mode)
>code = fs.readFileSync('Voting.sol').toString()
>solc = require('solc')
>cc = solc.compile(code)
>abi =  JSON.parse(cc.contracts[':Voting'].interface)
>md = cc.contracts[':Voting'].metadata
>bytecode =  cc.contracts[':Voting'].bytecode
>Web3 = require('web3')

#### Deploying the Dapp (non-truffle mode)
>web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
>dapp_obj = web3.eth.contract(abi)

>me0 = web3.eth.accounts[0]
>me1 = web3.eth.accounts[1]
>me2 = web3.eth.accounts[2]

>deploy = dapp_obj.new(['Rama','Nick','Jose'],{data: bytecode, from: me0, gas: 700000})
>deploy.address

#### Testing the Dapp (non-truffle mode)
>deploy.total_votes_for_candidate('Rama')
>deploy.total_votes_for_candidate('Rama').toNumber()
>deploy.vote_for_candidate('Rama', {from: me0})
>deploy.total_votes_for_candidate.call('Rama').toNumber()
>deploy.vote_for_candidate('Rama', {from: me1})
>deploy.vote_for_candidate('Rama', {from: me2})


### Dealing with Truffle framework
##### Refer here to know the right boiler plate box required - [Truffle boxes] (https://truffleframework.com/boxes)

#### Getting truffle webpack
> mkdir truffle_voting_webpack
>cd truffle_pack
>truffle unbox webpack
make sure you change the port (from 7545 to 8545) in truffle.js where the ganache is still running.

#### Migrations - truffle
* Copy Voting.sol to contracts/
* update 2_deploy_contract.js
>npm install babel-register # assuming it is required
* copy index.html to apps/ change index.js to apps.js

#### compiling - truffle
* important on window 10 - use PowerShell
* on other flavors of windows, try git-bash
>truffle compile

#### migrating - truffle
* make sure node_modules\.bin\ganache-cli is running on an another window
>truffle migrate

#### testing in command line - truffle
* make sure node_modules\.bin\ganache-cli is running on an another window
>truffle console
>Voting.deployed().then(function(f) {f.total_votes_for_candidate.call('Rama').then(function(f) {console.log(f.toNumber())})})
>Voting.deployed().then(function(f) {f.vote_for_candidate('Rama').then(function(f) {console.log(f)})})

#### developing the frontend - javascript
* update index.js with loadCandidatesAndVotes and voteForCandidate functions
* to test, go to another Powershell and run
> npm run dev
It should run the web server which will link to - http://localhost:8080/
