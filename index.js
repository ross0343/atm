#! /usr/bin/env node
import inquirer from "inquirer";
class Atm {
    currentBalance;
    constructor(currentBalance) {
        this.currentBalance = currentBalance;
    }
    deposit(amount) {
        this.currentBalance += amount;
        console.log(`You Deposit Amount Is: ${amount} , Your Current Balance Is: ${this.currentBalance}`);
    }
    withdraw(amount) {
        if (amount <= this.currentBalance) {
            this.currentBalance -= amount;
            console.log(`Withdrawal Amount Is: ${amount} Your Current Balance Is: ${this.currentBalance} `);
        }
        else {
            console.log(`Insufficient Balance ${this.currentBalance} Cannot Perform Your Tranaction`);
        }
    }
    fastCash(amount) {
        if (this.currentBalance > amount) {
            this.withdraw(amount);
        }
        else {
            console.log(`Insufficient Balance ${this.currentBalance}`);
        }
    }
    checkBalance() {
        console.log(`Currenet Balance ${this.currentBalance}`);
    }
}
let atm = new Atm(100000);
async function tranactionPerform() {
    while (true) {
        let task = await inquirer.prompt([{
                name: 'Perform',
                type: "list",
                message: "Please Choose An Option",
                //choices: ["Deposit", "Withdraw", "Fast Cash", "Check Balance", " Exit"]
                choices: ["Deposit", "Withdraw", "Fast Cash", "Check Balance"]
            }]);
        switch (task.Perform) {
            case "Deposit":
                const { depositAmount } = await inquirer.prompt([{
                        type: "number",
                        name: "depositAmount",
                        message: "Enter Amount To Deposit:"
                    }]);
                atm.deposit(depositAmount);
                break;
            case 'Withdraw':
                const { withdrawAmount } = await inquirer.prompt({
                    type: 'number',
                    name: 'withdrawAmount',
                    message: 'Enter withdrawal amount:'
                });
                atm.withdraw(withdrawAmount);
                break;
            case 'Check Balance':
                atm.checkBalance();
                break;
            case 'Fast Cash':
                let { fastCashAmount } = await inquirer.prompt([{
                        name: 'fastCashAmount',
                        type: 'list',
                        message: 'Please Choose A Selected Amount',
                        choices: [100, 200, 500, 1000, 5000, 10000]
                    }]);
                atm.fastCash(fastCashAmount);
                break;
            // case 'Exit':
            //     let { confirmExit } = await inquirer.prompt({
            //         name: 'confirmExit',
            //         type: 'confirm',
            //         message: "Are You Sure To Exit"
            //     });
            //     if (confirmExit) {
            //         console.log('Exiting.....');
            //         process.exit();
            //     } else {
            //         console.log('Do You Want To Perform Your Transaction');
            //     }
            //     break; 
            default:
                console.log("Invalid Option");
        }
    }
}
tranactionPerform();
