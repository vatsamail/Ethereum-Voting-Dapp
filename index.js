web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
//var account;

// this is abi i.e., cc.contracts[':Voting'].interface
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"vote_for_candidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates_list","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"total_votes_for_candidate","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"check_validity_of_candidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidates_names","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);

// this is the address deploy.address
// is nothing but deploy
contractInstance = VotingContract.at('0xeef630aa8ef8ac4607be7ff996742148500f1062');

candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();

 contractInstance.vote_for_candidate(candidateName, {from: web3.eth.accounts[0], gas: 700000}, function() {
  let div_id = candidates[candidateName];
  $("#" + div_id).html(contractInstance.total_votes_for_candidate.call(candidateName).toString());
 });
}

$(document).ready(function() {
 candidateNames = Object.keys(candidates);
  for(var i=0; i<candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.total_votes_for_candidate.call(name).toNumber();
    $("#" + candidates[name]).html(val);
  }
});
