const readWrite = require('./readAndWrite.js')

const numberOfSavingsAccount = ()=>{
    const data = readWrite.bankExistingDetails()
    const savingsAccountData = data.filter((data)=>data.SavingsAccountBalance!=="NA")
    console.log(savingsAccountData.length)
}

const numberOfCheckingAccount = () => {
    const data = readWrite.bankExistingDetails()
    const checkingAccountData = data.filter((data)=>data.CheckingAccountBalance!=="NA")
    console.log(checkingAccountData.length)
}

module.exports={
    numberOfSavingsAccount,
    numberOfCheckingAccount
}