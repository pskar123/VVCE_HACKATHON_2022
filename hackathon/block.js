var web3;
var address = "0xCb89c75e6C3e3d7ee906CFDE2a0B22234554fadE";
async function Connect() {
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
}
if (typeof web3 !== 'undefine') {
    web3 = new Web3(window.web3.currentProvider);
}
else {
    web3 = new Web3(new Web3.Provider.HttpProvider("HTTP://127.0.0.1:7545"));
}
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "deposite_money",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
	
var contract = new web3.eth.Contract(abi, address);

function deposite() {
    var inputval = document.getElementById("amount").value;
    web3.eth.getAccounts().then(function (account) {
        return contract.methods.deposite_money(inputval).send({ from: account[0] });
    }).then(function (tmp) {
        $("#amount").val("");
        show_balance();
    }).catch(function (tmp) {
        alert(tmp);
    })
}

function withdraw(){
    var inputval=document.getElementById("amount").value;
    web3.eth.getAccounts().then(function(account){
         return contract.methods.withdraw(inputval).send({from:account[0]});
    }).then(function(tmp){
         $("#amount").val("");
         show_balance();
     }).catch(function(tmp){
         alert(tmp);
     })
    }

    function show_balance(){
        contract.methods.getBalance().call().then(function(balance){
            $("#balance").html(balance);
       })
    }