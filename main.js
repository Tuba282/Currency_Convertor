#! /usr/bin/env node
import inquirer from "inquirer";
import ora from "ora";
import figlet from "figlet";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";
// import chalk from "chalk";
async function welcome() {
    await new Promise((resolve) => {
        figlet("Welcome to Currency Convertor", { font: "Slant" }, function (err, data) {
            if (err) {
                console.dir("Oops something went wrong");
                console.log(err);
            }
            let animate = chalkAnimation.rainbow(data);
            setTimeout(() => {
                resolve(animate.stop());
            }, 3000);
        });
    });
}
await welcome();
const currency = {
    USD: 1,
    EUR: 0.9, //USD
    GBP: 0.8, //USD
    JPY: 110, //USD
    INR: 75, //USD
    PKR: 1.2, //USD
};
async function main() {
    let Answer = await inquirer.prompt([
        {
            name: "from",
            type: "list",
            message: "Please select  from currency 😉  :",
            choices: ["USD", "EUR", "GBP", "JPY", "INR", "PKR"],
        },
        {
            name: "to",
            type: "list",
            message: "Please select to currency 😉  :",
            choices: ["USD", "EUR", "GBP", "JPY", "INR", "PKR"],
        },
        {
            name: "amount",
            type: "number",
            message: "Enter youe amount ",
        },
    ]);
    async function converting() {
        await new Promise((resolve) => {
            let little_sppiner = ora("\nConverting....").start();
            setTimeout(() => {
                resolve(little_sppiner.succeed("\nAnd your currency has been converted....\n").stop());
            }, 3000);
        });
    }
    await converting();
    // "from_amount" ka variable banaya hai jisme
    // Answer.from ko type:any curency k through arahi hai
    let from_amount = currency[Answer.from];
    // "to_amount" ka variable banaya hai jisme
    //Answer.to ki value bhi curency k through arahi hai
    let to_amount = currency[Answer.to];
    //yaha Answer.amount ki value ""input_amount"" me assign/store ki hai
    let input_amount = Answer.amount;
    // here we convert the amount into our base currency USD=1
    let convert_into_base_amount = input_amount / from_amount;
    // here we convert the amount into our base currency USD=1
    let desired_amount = convert_into_base_amount * to_amount;
    //logging our desired_amount
    console.log(chalk.blueBright(desired_amount.toFixed(2)));
}
async function again() {
    do {
        await main();
        var restart = await inquirer.prompt([
            {
                name: 'again',
                type: "input",
                message: "\nYou want to convert your money again....?\n\nPress `Y` for yes "
            }
        ]);
    } while (restart.again === "Y" || restart.again === "y");
}
await again();
