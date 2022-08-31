const Web3 = require('web3')
const rpcURL = "https://kovan.infura.io/v3/998b75ac3dc44270b7826686f6684bec"
const web3 = new Web3(rpcURL)
const fs = require('fs')

var contract_info = {
  "address": '',
  "abi" : '',
  "bytecode": ''
}

// const contractFile = require('./contractFile');
const contractFile = JSON.parse(fs.readFileSync('./contract_compiled.json', 'utf-8'))


// 2. Create account variables
const accountFrom = {
    privateKey: '759940301e3e5b2656637a22ab7d78ec0cf656690862fe7d337bd5eafc2a4e91',
    address: '0xA2cEc1aC87A2f6c44C950ed598dC1feEbEe67F4E'
}

// 4. Get the bytecode and API
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

const args = process.argv.slice(2)
const inputGoal = args[0]

// 5. Create deploy function
const deploy = async () => {
    console.log(`Attempting to deploy from account ${accountFrom.address}`);
  
    // 6. Create contract instance
    const piggybank = new web3.eth.Contract(abi);
  
    // 7. Create constructor tx
    const piggybankTx = piggybank.deploy({
      data: bytecode,
      arguments: [parseInt(inputGoal)],
    });
  
    // 8. Sign transacation and send
    const createTransaction = await web3.eth.accounts.signTransaction(
      {
        data: piggybankTx.encodeABI(),
        gas: await piggybankTx.estimateGas() + 50000,
      },
      accountFrom.privateKey
    );
  
    // 9. Send tx and wait for receipt
    const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
    console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
    write(contract_info, createReceipt.contractAddress, abi, bytecode)
  };
  
function write(contract_info, contract_address, contract_abi, contract_bytecode ){
  contract_info.address = contract_address
  contract_info.abi = contract_abi
  contract_info.bytecode = contract_bytecode
  fs.writeFile('contract_info.json', JSON.stringify(contract_info), (err) => {
   if (err) {
       throw err;
   }
   console.log("JSON data is saved.");
  });
}

  // 10. Call deploy function
  deploy();