// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
//import metaCoinArtifact from '../../build/contracts/MetaCoin.json'
import votingArtifact from '../../build/contracts/Voting.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
const Voting = contract(votingArtifact);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts;
let account;

var candidates = {'Rama': 'candidate-1', 'Nick': 'candidate-2', 'Jose': 'candidate-3'};


const App = {
  start: function () {
    alert("Hello user!");
    const self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Voting.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs;
      account = accounts[0];
      // Load candidates and votes
      self.loadCandidatesAndVotes();

      // vote for candidates
      //self.voteForCandidate();
    })
  },

  voteForCandidate: function() {
    var candidate_name = $('#candidate').val();
    alert("This Candidate Name: "+candidate_name)
    Voting.deployed().then(function(i) {
      i.vote_for_candidate(candidate_name, {from: web3.eth.accounts[0]}).then(function(f) {
        alert("I:"+i+" Candidate: "+candidate_name);
        i.total_votes_for_candidate.call(candidate_name).then(function(f){
          $('#' + candidates[candidate_name]).html(f.toNumber());
        })
      })
    })
  },

  loadCandidatesAndVotes: function() {
    var candidates_names = Object.keys(candidates);
    for (var i = 0; i < candidates_names.length; i++) {
      let name = candidates_names[i];
      Voting.deployed().then(function(f) {
        f.total_votes_for_candidate.call(name).then(function(f){
          alert("known candidate: "+name)
          $('#' + candidates[name]).html(f.toNumber());
          //console.log(f.toNumber())
        })
      })
    }
  },

}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:9545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }

  App.start()
})
