const fs = require('fs')

const bankExistingDetails = () => {
    try {
        const databuffer = fs.readFileSync('cif.json')
        const tostring = databuffer.toString()
        const currentdata = JSON.parse(tostring)
        return currentdata
    }
    catch {
        return []
    }
}

const bankUpdatingDetails = (data) => {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync('cif.json', dataJSON)
}

const loanExistingDetails = () => {
    try {
        const databuffer = fs.readFileSync('loan.json')
        const tostring = databuffer.toString()
        const currentdata = JSON.parse(tostring)
        return currentdata
    }
    catch {
        return []
    }
}

const rejectedLoanExistingDetails = () => {
    try {
        const databuffer = fs.readFileSync('rejectedData.json')
        const tostring = databuffer.toString()
        const currentdata = JSON.parse(tostring)
        return currentdata
    }
    catch {
        return []
    }
}

const loanUpdatingDetails = (data) => {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync('loan.json', dataJSON)
}

const rejectedLoanUpdatingDetails = (data) => {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync('rejectedData.json', dataJSON)
}

module.exports = {
    bankExistingDetails,
    bankUpdatingDetails,
    loanExistingDetails,
    rejectedLoanExistingDetails,
    loanUpdatingDetails,
    rejectedLoanUpdatingDetails
}