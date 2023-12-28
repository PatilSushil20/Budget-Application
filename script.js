const userTitle = document.getElementById('title');
const userAmount = document.getElementById('amount');
const typeOfBudget = document.getElementById("type");
const showTIncome = document.getElementById('tIncome');
const showTExpence = document.getElementById('tExpence');
let income = []
let expence = []

// ------------------- retriving data from the localstorage -------------------
document.addEventListener('DOMContentLoaded', () => {
    const storedData = JSON.parse(localStorage.getItem('budgetData'));
    if (storedData) {
        income = storedData.income || [];
        expence = storedData.expence || [];
        updateDisplay();
        totalIncome();
        totalExpence();
        totalSaving();
    }
});

// ------------------- Calculate total income -------------------
const totalIncome = () => {
    const tIncome = income.reduce((total, element) => {
        return total + parseInt(element.amount);
    }, 0)
    showTIncome.innerHTML = amountFormate(tIncome);
}


// ------------------- Calculate total expence -------------------
const totalExpence = () => {
    const tExpence = expence.reduce((total, element) => {
        return total + parseInt(element.amount);
    }, 0)
    showTExpence.innerHTML = amountFormate(tExpence);
}


// ------------------- Calculate total savings -------------------
const totalSaving = () => {
    const displaySaving = document.getElementById("tSaving")
    const totalIncome = income.reduce((total, element) => { return total + parseInt(element.amount) }, 0)
    const totalExpence = expence.reduce((total, element) => { return total + parseInt(element.amount) }, 0)

    const totalSavings = totalIncome - totalExpence;
    displaySaving.innerHTML = amountFormate(totalSavings)
}


// ------------------- Calculate total remove expence or income -------------------
const removeCart = (id) => {
    const concatArray = income.concat(expence);
    const updatedArray = concatArray.filter(element => element.id != id)

    income = updatedArray.filter(element => element.type === 'income');
    expence = updatedArray.filter(element => element.type === 'expence');

    updateDisplay()
    totalIncome()
    totalExpence()
    totalSaving();
    saveToLocalStorage();
}


// ------------------- Update the display -------------------
const updateDisplay = () => {
    const incomeList = document.getElementById("displayIncome");
    const expenceList = document.getElementById("displayExpence");

    incomeList.innerHTML = "";
    expenceList.innerHTML = "";

    income.concat(expence).forEach((element) => {
        const itemContainer = document.createElement("li");
        itemContainer.innerHTML = `<span>${element.title}</span>
                                   <span>${amountFormate(parseInt(element.amount))}</span>
                                    <span onclick="removeCart(${element.id})">X</span>`
        if (element.type == 'income') {
            incomeList.appendChild(itemContainer)
        }
        else {
            expenceList.appendChild(itemContainer)
        }
    })
}


// ------------------- formating amount Using localstring -------------------
const amountFormate = (amount) => {
    return (
        "₹ " +
        amount.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            currency: "INR",
        })
    );
}


// ------------------- Store data in localstorage -------------------
const saveToLocalStorage = () => {
    localStorage.setItem('budgetData', JSON.stringify({ income, expence }));
};



// ------------------- create budget list -------------------
document.addEventListener("submit", (event) => {
    event.preventDefault();
    if (userTitle.value != "" && userAmount.value != "" && typeOfBudget.value != "") {
        const object = {
            title: userTitle.value,
            amount: userAmount.value,
            type: typeOfBudget.value,
            id: Math.floor(Math.random() * 1000)
        }

        if (typeOfBudget.value == 'income') {
            income.push(object)
            totalIncome()
            totalSaving()
        }
        else {
            expence.push(object)
            totalExpence()
            totalSaving()
        }
        updateDisplay()
        saveToLocalStorage()
        userTitle.value = "";
        userAmount.value = "";
    }
})