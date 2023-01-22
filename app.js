const bank = require('./customersAction.js')
const bankOfficials = require('./bankOffcialsActions.js')

//To Check Balance, give the name of the account holder and Customer Information Number(CIN)
bank.viewBalance("YMT",8518)

// To deposit money, give the name of the account holder, Customer Information Number(CIN), Account Type - as in Checking/Savings, and the amount you want to deposit.
bank.depositMoney("YMT",8518,"Checking",1000)

//To deposit money, give the name of the account holder, Customer Information Number(CIN), Account Type - as in Checking/Savings, and the amount you want to withdraw.
bank.withdrawMoney("YMT",8518,"Savings",100)

// To create a new account, give your name, Account Type, and Minimum deposit Rs.1000 
bank.createNewAccount("Vinu","Savings",5000)
// And if you are an already existing account holder and you want to open an another type of account, then you can include your CIN as fourth parameter.
bank.createNewAccount("Abhi","Savings",2000,2038)

// To Check the all available loans
bank.listAvailableLoans()

// To check the minimum requirement of a particular loan - (Parameters can be Home Loan, Personal Loan, Auto Loan, Education Loan)
bank.loanDetails('Education Loan')

// To apply for a loan, give your name, type of ID proof, your monthly income, your monthly expense, your CIBIL Score, and the type of loan you want - (Home/Personal/Auto/Education).
bank.applyForLoan("Abhi", "aadharCard", 12000, 3000, 800, "Home")
// If you are apllying for education loan, you need to provide a proof that you are a student
bank.applyForLoan("Shwe", "voter ID", 0, 0, 800, "Education","Student ID")

// To pay back the loan, provide the amount you want to pay and Unique Reference ID
bank.payBackLoan(1000,5946)



// For Bank Officials Actions

// To check the number of savings account
bankOfficials.numberOfSavingsAccount()

// To check the number of checking account
bankOfficials.numberOfCheckingAccount()

