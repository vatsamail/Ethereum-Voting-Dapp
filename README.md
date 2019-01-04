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
