let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentUser = null;

function saveAccounts() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function createAccount() {
  const name = document.getElementById("name").value;
  const pin = document.getElementById("pin").value;
  const deposit = Number(document.getElementById("deposit").value);
  const result = document.getElementById("accountResult");

  if (name === "" || pin === "" || isNaN(deposit)) {
    result.textContent = "Please fill out all fields.";
    return;
  }

  if (pin.length !== 4) {
    result.textContent = "PIN must be 4 digits.";
    return;
  }

  if (deposit < 0) {
    result.textContent = "Initial deposit cannot be negative.";
    return;
  }

  const accountNumber = 1001 + accounts.length;

  const newAccount = {
    accountNumber: accountNumber,
    name: name,
    pin: pin,
    balance: deposit,
    transactions: [`Account created with $${deposit.toFixed(2)}`]
  };

  accounts.push(newAccount);
  saveAccounts();

  result.textContent = `Account created successfully! Your account number is ${accountNumber}.`;
}

function login() {
  const accountNumber = Number(document.getElementById("loginAccount").value);
  const pin = document.getElementById("loginPin").value;
  const result = document.getElementById("loginResult");

  const account = accounts.find(acc => acc.accountNumber === accountNumber && acc.pin === pin);

  if (!account) {
    result.textContent = "Invalid account number or PIN.";
    return;
  }

  currentUser = account;
  result.textContent = "Login successful!";
  document.getElementById("dashboard").classList.remove("hidden");
  updateDashboard();
}

function updateDashboard() {
  document.getElementById("welcomeText").textContent = `Welcome, ${currentUser.name}`;
  document.getElementById("balanceText").textContent = `Balance: $${currentUser.balance.toFixed(2)}`;

  const transactionList = document.getElementById("transactions");
  transactionList.innerHTML = "";

  currentUser.transactions.forEach(transaction => {
    const li = document.createElement("li");
    li.textContent = transaction;
    transactionList.appendChild(li);
  });
}

function depositMoney() {
  const amount = Number(document.getElementById("amount").value);

  if (amount <= 0 || isNaN(amount)) {
    alert("Enter a valid amount.");
    return;
  }

  currentUser.balance += amount;
  currentUser.transactions.push(`Deposited $${amount.toFixed(2)}`);
  saveAccounts();
  updateDashboard();
}

function withdrawMoney() {
  const amount = Number(document.getElementById("amount").value);

  if (amount <= 0 || isNaN(amount)) {
    alert("Enter a valid amount.");
    return;
  }

  if (amount > currentUser.balance) {
    alert("Insufficient balance.");
    return;
  }

  currentUser.balance -= amount;
  currentUser.transactions.push(`Withdrew $${amount.toFixed(2)}`);
  saveAccounts();
  updateDashboard();
}

function logout() {
  currentUser = null;
  document.getElementById("dashboard").classList.add("hidden");
}

function transferMoney() {
    const receiverAccountNumber = Number(document.getElementById("receiverAccount").value);
    const amount = Number(document.getElementById("amount").value);
  
    if (amount <= 0 || isNaN(amount)) {
      alert("Enter a valid amount.");
      return;
    }
  
    if (receiverAccountNumber === currentUser.accountNumber) {
      alert("You cannot transfer money to your own account.");
      return;
    }
  
    const receiver = accounts.find(acc => acc.accountNumber === receiverAccountNumber);
  
    if (!receiver) {
      alert("Receiver account not found.");
      return;
    }
  
    if (amount > currentUser.balance) {
      alert("Insufficient balance.");
      return;
    }
  
    currentUser.balance -= amount;
    receiver.balance += amount;
  
    currentUser.transactions.push(`Transferred $${amount.toFixed(2)} to account ${receiverAccountNumber}`);
    receiver.transactions.push(`Received $${amount.toFixed(2)} from account ${currentUser.accountNumber}`);
  
    saveAccounts();
    updateDashboard();
  
    alert("Transfer successful.");
  }