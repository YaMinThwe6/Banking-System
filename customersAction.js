const readWrite = require('./readAndWrite.js')

const depositMoney = (name, ID, type, amount) => { 
    const data = readWrite.bankExistingDetails()

    const checkID = data.find((data)=> data.ID===ID)
    const remainingData = data.filter((data) => data.ID!==ID)

    if(!checkID || !(checkID.ID===ID && checkID.name===name)) {
        console.log("Please check your name and ID. If you forgot your ID, contact the nearest branch.")
    } else if(!(type && amount)){
        console.log("Please check if you have entered the deposit amount and the account type.")
    } else if(type!=="Savings" && type!=="Checking") {
        console.log("Please Check your Savings/Checking Account type!")
    } else {
        if(type === "Savings" && checkID.SavingsAccountBalance!=="NA") {
            if(type === "Savings" && checkID.CheckingAccountBalance==="NA"){
                remainingData.push({
                    name,
                    ID,
                    SavingsAccountBalance:checkID.SavingsAccountBalance+amount,
                    CheckingAccountBalance:"NA"
                })
                readWrite.bankUpdatingDetails(remainingData)
                console.log("Deposited Rs."+ amount)
            } else if(type === "Savings" && checkID.CheckingAccountBalance!=="NA"){
                remainingData.push({
                    name,
                    ID,
                    SavingsAccountBalance:checkID.SavingsAccountBalance+amount,
                    CheckingAccountBalance:checkID.CheckingAccountBalance
                })
                readWrite.bankUpdatingDetails(remainingData)
                console.log("Deposited Rs."+ amount)
            }
        } else if(type==="Savings" && checkID.SavingsAccountBalance==="NA"){
            console.log("Please open a Savings Account.")
        }
        if(type === "Checking" && checkID.CheckingAccountBalance!=="NA") {
            if(type === "Checking" && checkID.SavingsAccountBalance==="NA") {
                remainingData.push({
                    name,
                    ID,
                    SavingsAccountBalance:"NA",
                    CheckingAccountBalance:checkID.CheckingAccountBalance+amount
                })
                readWrite.bankUpdatingDetails(remainingData)
                console.log("Deposited Rs."+ amount)
            } else if(type === "Checking" && checkID.SavingsAccountBalance!=="NA"){
                remainingData.push({
                    name,
                    ID,
                    SavingsAccountBalance:checkID.SavingsAccountBalance,
                    CheckingAccountBalance:checkID.CheckingAccountBalance+amount
                })
                readWrite.bankUpdatingDetails(remainingData)
                console.log("Deposited Rs."+ amount)
            }    
        } else if(type==="Checking" && checkID.CheckingAccountBalance==="NA") {
            console.log("Please open a Checking account.")
        }
    }
}

const viewBalance = (name, ID) => {
    const data = readWrite.bankExistingDetails()

    const checkID = data.find((data)=> data.ID===ID)
    
    if(!checkID || !(checkID.ID===ID && checkID.name===name)) {
        console.log("Please check your name and ID. If you forgot your ID, contact the nearest branch.")
    } else {
        console.log('Your balance')
        if(checkID.SavingsAccountBalance!=="NA") {
            console.log("Savings Account : Rs." + checkID.SavingsAccountBalance)
        }
        if(checkID.CheckingAccountBalance!=="NA") {
            console.log("Checking Account : Rs." + checkID.CheckingAccountBalance)
        }
    }    
}

const withdrawMoney = (name, ID, type, amount) => {
    const data = readWrite.bankExistingDetails()

    const remainingData = data.filter((data) => data.ID!==ID)
    const checkID = data.find((data)=> data.ID===ID)

    if(!checkID || !(checkID.ID===ID && checkID.name===name)) {
        console.log("Please check your name and ID. If you forgot your ID, contact the nearest branch.")
    } else if(!(type && amount)){
        console.log("Please check if you have entered the withdrawal amount and the account type.")
    } else if(type!=="Savings" && type!=="Checking") {
        console.log("Please Check your Savings/Checking Account type!")
    } else {
        if(type === "Savings" && checkID.SavingsAccountBalance!=="NA" && amount<checkID.SavingsAccountBalance) {
            if(type === "Savings" && checkID.CheckingAccountBalance!=="NA"){
                remainingData.push({
                    name,
                    ID,
                    SavingsAccountBalance:checkID.SavingsAccountBalance-amount,
                    CheckingAccountBalance:checkID.CheckingAccountBalance
                })
                readWrite.bankUpdatingDetails(remainingData)
                console.log("Withdrawed Rs."+ amount)
            } else if(type === "Savings" && checkID.CheckingAccountBalance==="NA"){
                remainingData.push({
                    name,
                    ID,
                    SavingsAccountBalance:checkID.SavingsAccountBalance-amount,
                    CheckingAccountBalance:"NA"
                })
                readWrite.bankUpdatingDetails(remainingData)
                console.log("Withdrawed Rs."+ amount)
            } 
        } else if(type==="Savings" && checkID.SavingsAccountBalance==="NA"){
            console.log("Please open a Savings Account.")
        } else if(type === "Savings" && checkID.SavingsAccountBalance!=="NA" && amount>checkID.SavingsAccountBalance){
            console.log("Sorry! You have insufficient funds.")
        } 
        if(type === "Checking" && checkID.CheckingAccountBalance!=="NA" && amount < checkID.CheckingAccountBalance) {
            if(type === "Checking" && checkID.SavingsAccountBalance!=="NA"){
                remainingData.push({
                    name,
                    ID,
                    SavingsAccountBalance:checkID.SavingsAccountBalance,
                    CheckingAccountBalance:checkID.CheckingAccountBalance-amount
                })
                readWrite.bankUpdatingDetails(remainingData)
                console.log("Withdrawed Rs."+ amount)
            } else if(type === "Checking"  && checkID.SavingsAccountBalance==="NA"){
                remainingData.push({
                    name,
                    ID,
                    SavingsAccountBalance:"NA",
                    CheckingAccountBalance:checkID.CheckingAccountBalance-amount
                })
                readWrite.bankUpdatingDetails(remainingData)
                console.log("Withdrawed Rs."+ amount)
            }
        } else if(type==="Checking" && checkID.CheckingAccountBalance==="NA"){
            console.log("Please open a Checking Account.")
        } else if(type === "Checking" && checkID.CheckingAccountBalance!=="NA" && amount>checkID.CheckingAccountBalance) {
            console.log("Sorry! You have insufficient funds.")
        } 
    }
}

const createNewAccount = (name, type, amount, ID) => {
    const data = readWrite.bankExistingDetails()

    if(ID) {
        const checkID = data.find((data)=> data.ID===ID)
        const remainingData = data.filter((data) => data.ID!==ID)
        if(checkID){
            if(type==="Savings" && checkID.SavingsAccountBalance!=="NA"){
                console.log("You already have a savings account!")
            } else if(type==="Savings" && checkID.SavingsAccountBalance==="NA") {
                if(amount<1000){
                    console.log("Minimum Balance is Rs.1000")
                } else if(!(name && (type==="Savings" || type==="Checking") && amount)){
                    console.log("Please enter your Name, Account Type(Savings/Checking), and the initail deposit amount")
                } else{ 
                    remainingData.push({
                        name,
                        ID,
                        SavingsAccountBalance:amount,
                        CheckingAccountBalance:checkID.CheckingAccountBalance
                    })
                    readWrite.bankUpdatingDetails(remainingData)
                    console.log("You have successfully opened a New Savings Account.")
                }
            }
            if(type==="Checking" && checkID.CheckingAccountBalance!=="NA") {
                console.log("You already have a Checking account!")
            } else if(type==="Checking" && checkID.CheckingAccountBalance==="NA"){
                if(amount<1000){
                    console.log("Minimum Balance is Rs.1000")
                } else if(!(name && (type==="Savings" || type==="Checking") && amount)){
                    console.log("Please enter your Name, Account Type(Savings/Checking), and the initail deposit amount")
                } else {
                    remainingData.push({
                        name,
                        ID,
                        SavingsAccountBalance:checkID.SavingsAccountBalance,
                        CheckingAccountBalance:amount
                    })
                    readWrite.bankUpdatingDetails(remainingData)
                    console.log("You have successfully opened a New Checking Account.")
                }
            }
        } else if(!checkID) {
            console.log("Please Check the details you have entered!")
        }
    } else {

        var CustomerInformationNumber = Math.floor(Math.random() * 9000 + 1000)

        if(data){
            while (data.find((data)=> data.ID===CustomerInformationNumber)) { 
                CustomerInformationNumber = Math.floor(Math.random() * 9000 + 1000)
            }
        }

        if(amount<1000){
            console.log("Minimum Balance is Rs.1000")
        } else if(!(name && (type==="Savings" || type==="Checking")  && amount)){
            console.log("Please enter your Name, Account Type(Savings/Checking), and the initail deposit amount")
        } else if(type==="Savings"){
            data.push({
                name,
                ID:CustomerInformationNumber,
                SavingsAccountBalance:amount,
                CheckingAccountBalance:"NA"
            })
            readWrite.bankUpdatingDetails(data)
            console.log("You have successfully opened a New Savings Account. Please note your Customer Information Number " + CustomerInformationNumber + " for future transactions.")
        } else if(type==="Checking") {
            data.push({
                name,
                ID:CustomerInformationNumber,
                SavingsAccountBalance:"NA",
                CheckingAccountBalance:amount
            })
            readWrite.bankUpdatingDetails(data)
            console.log("You have successfully opened a New Checking Account. Please note your Customer Information Number " + CustomerInformationNumber + " for future transactions.")
        }
    }   
}

const listAvailableLoans = ()=>{
    console.log('1. Home Loan')
    console.log('2. Auto Loan')
    console.log('3. Education Loan')
    console.log('4. Personal Loan')
}

const loanDetails= (loanName)=>{
    if(loanName==="Home Loan"){
        const homeLoan = {
            InterestRateInPercent: 8.75,
            MaximumAge:70,
            minimumCibilScore: 750,

        }
        console.log(homeLoan)
    }
    if(loanName==="Auto Loan"){
        const  autoLoan = {
            InterestRateInPercent: 8.55,
            MaximumAge: 70,
            minimumCibilScore: 750
        }
        console.log(autoLoan)
    }
    if(loanName==="Education Loan"){
        const educationLoan = {
            InterestRateInPercent: 8.30,
            minimumCibilScore: 750
        }
        console.log(educationLoan)
    }
    if(loanName==="Personal Loan"){
        const personalLoan = {
            InterestRateInPercent: 10.90,
            minimumCibilScore: 750
        }
        console.log(personalLoan)
    }
}

const applyForLoan = (name, idProof, monthlyIncome, monthlyExpenditure, CibilScore, loanType, studentIDProof) => {

    const data = readWrite.loanExistingDetails()
    const rejectedData = readWrite.rejectedLoanExistingDetails()

    if (CibilScore>=750) {
        if (!studentIDProof) {
            if (loanType === "Home" || loanType === "Auto" || loanType === "Personal") {
                if (monthlyExpenditure/monthlyIncome<=0.36) {
                    const urid= Math.floor(Math.random() * 9000 + 1000)
                    data.push({
                        name,
                        idProof,
                        monthlyIncome,
                        monthlyExpenditure,
                        CibilScore,
                        loanType,
                        uniqueID: urid,
                        loan:2000000
                    })
                    readWrite.loanUpdatingDetails(data)
                    console.log("Congrats! You have successfully applied for the loan. Please note your unique reference ID " + urid + " for your future reference.")
                } else {
                    rejectedData.push({
                        name,
                        idProof,
                        monthlyIncome,
                        monthlyExpenditure,
                        CibilScore,
                        loanType
                    })
                    readWrite.rejectedLoanUpdatingDetails(rejectedData)
                    console.log("Sorry! You are not eligible for the loan.")
                }
            } else {
                rejectedData.push({
                    name,
                    idProof,
                    monthlyIncome,
                    monthlyExpenditure,
                    CibilScore,
                    loanType
                })
                readWrite.rejectedLoanUpdatingDetails(rejectedData)
                console.log("Sorry! You are not eligible for the loan.");
            }
        } else if (studentIDProof) {
            if (loanType === "Education") {
                const urid= Math.floor(Math.random() * 9000 + 1000)
                data.push({
                    name,
                    idProof,
                    monthlyIncome,
                    monthlyExpenditure,
                    CibilScore,
                    loanType,
                    studentIDProof,
                    uniqueID:urid,
                    loan:50000
                })
                readWrite.loanUpdatingDetails(data)
                console.log("Congrats! You have successfully applied for the loan. Please note your unique reference ID " + urid + " for your future reference.")
            } else {
                rejectedData.push({
                    name,
                    idProof,
                    monthlyIncome,
                    monthlyExpenditure,
                    CibilScore,
                    loanType
                })
                readWrite.rejectedLoanUpdatingDetails(rejectedData)
                console.log("Sorry! You are not eligible for the loan.");
            }
        }
    } else if(name===undefined && idProof===undefined && loanType===undefined){
        console.log("Please provide necessary details to apply for the loan.")
        console.log("Your Name, ID Proof, Address Proof, Your Monthly Income, Your Monthly Expenditure, Your Cibil Score, Loan Type, and if you want education loan, please provide Your student ID proof.")
    } else if (CibilScore<=749) {
        rejectedData.push({
            name,
            idProof,
            monthlyIncome,
            monthlyExpenditure,
            CibilScore,
            loanType
        })
        readWrite.rejectedLoanUpdatingDetails(rejectedData)
        console.log("Sorry! You are not eligible for the loan.")
    }
}

const payBackLoan = (amount,uniqueID)=>{ 

    const data = readWrite.loanExistingDetails()

    const checkID = data.find((data)=> data.uniqueID===uniqueID)

    const remainingData = data.filter((data) => data.uniqueID!==uniqueID)

    if(checkID){
        if(amount > checkID.loan){
            console.log("You need to pay only Rs." + checkID.loan+ ". Please pay exactly.")
        } else if(amount===checkID.loan){
            readWrite.loanUpdatingDetails(remainingData)
            console.log("Congrats! You have successfully paid back the loan.")
        } else {
            const remaining= checkID.loan-amount
            if(checkID.loanType==="Education") {
                remainingData.push({
                    name:checkID.name, 
                    idProof:checkID.idProof,
                    monthlyIncome:checkID.monthlyIncome,
                    monthlyExpenditure:checkID.monthlyExpenditure,
                    CibilScore:checkID.CibilScore,
                    loanType:checkID.loanType,
                    studentIDProof:checkID.studentIDProof,
                    uniqueID:checkID.uniqueID,
                    loan:remaining
                })
                readWrite.loanUpdatingDetails(remainingData)
                console.log("Paid Rs." + amount + ". Balance amount: Rs." + remaining )
            } else {
                remainingData.push({
                    name:checkID.name, 
                    idProof:checkID.idProof,
                    monthlyIncome:checkID.monthlyIncome,
                    monthlyExpenditure:checkID.monthlyExpenditure,
                    CibilScore:checkID.CibilScore,
                    loanType:checkID.loanType,
                    uniqueID:checkID.uniqueID,
                    loan:remaining
                })
                readWrite.loanUpdatingDetails(remainingData)
                console.log("Paid Rs." + amount + ". Balance amount: Rs." + remaining)
            }
        }
    } else {
        console.log("Please check the your unique reference ID.")
    }
    
    

}

module.exports = {
    depositMoney,
    viewBalance,
    withdrawMoney,
    createNewAccount,
    loanDetails,
    listAvailableLoans,
    applyForLoan,
    payBackLoan
} 

