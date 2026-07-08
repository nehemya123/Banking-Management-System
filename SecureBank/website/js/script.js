let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentUser = null;

function saveAccounts() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}
function getTimestamp() {
    return new Date().toLocaleString();
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
    failedAttempts: 0,
    locked: false,
    transactions: [`${getTimestamp()} • Account created with $${deposit.toFixed(2)}`]
  };

  accounts.push(newAccount);
  saveAccounts();

  result.textContent = `Account created successfully! Your account number is ${accountNumber}.`;
}

function login() {
    const accountNumber = Number(document.getElementById("loginAccount").value);
    const pin = document.getElementById("loginPin").value;
    const result = document.getElementById("loginResult");
  
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
  
    if (!account) {
      result.textContent = "Account not found.";
      return;
    }
  
    if (account.locked) {
      result.textContent = "This account is locked due to too many failed login attempts.";
      return;
    }
  
    if (account.pin !== pin) {
      account.failedAttempts += 1;
  
      if (account.failedAttempts >= 3) {
        account.locked = true;
        result.textContent = "Account locked after 3 failed login attempts.";
      } else {
        result.textContent = `Wrong PIN. Attempt ${account.failedAttempts} of 3.`;
      }
  
      saveAccounts();
      return;
    }
  
    account.failedAttempts = 0;
    saveAccounts();
  
    localStorage.setItem("currentUser", JSON.stringify(account));
    window.location.href = "dashboard.html";
  }

  function loadDashboard() {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (!savedUser) {
      window.location.href = "login.html";
      return;
    }
  
    currentUser = accounts.find(acc => acc.accountNumber === savedUser.accountNumber);
  
    if (!currentUser) {
      window.location.href = "login.html";
      return;
    }
  
    document.getElementById("userName").textContent = currentUser.name;
    document.getElementById("cardName").textContent = currentUser.name;
    document.getElementById("balance").textContent = `$${currentUser.balance.toFixed(2)}`;

    searchTransactions();
    updateStats();
  
    const transactionList = document.getElementById("transactions");
    transactionList.innerHTML = "";
  
    currentUser.transactions.slice(-5).reverse().forEach(transaction => {
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
    currentUser.transactions.push(
        `${getTimestamp()} • Deposited $${amount.toFixed(2)}`
    );
  
    saveAccounts();
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    loadDashboard();
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
    currentUser.transactions.push(
        `${getTimestamp()} • Withdrew $${amount.toFixed(2)}`
    );
  
    saveAccounts();
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    loadDashboard();
  }
  
  function transferMoney() {
    const receiverAccountNumber = Number(document.getElementById("receiverAccount").value);
    const amount = Number(document.getElementById("transferAmount").value);
  
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
  
    currentUser.transactions.push(
        `${getTimestamp()} • Transferred $${amount.toFixed(2)} to account ${receiverAccountNumber}`
    );
    receiver.transactions.push(`Received $${amount.toFixed(2)} from account ${currentUser.accountNumber}`);
  
    saveAccounts();
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    loadDashboard();
  
    alert("Transfer successful.");
  }
  function searchTransactions() {

    const search =
        document.getElementById("searchTransaction")
        .value
        .toLowerCase();

    const transactionList =
        document.getElementById("transactions");

    transactionList.innerHTML = "";

    currentUser.transactions
        .slice()
        .reverse()
        .forEach(transaction => {

            if (transaction.toLowerCase().includes(search)) {

                const li = document.createElement("li");
                li.textContent = transaction;

                transactionList.appendChild(li);

            }

        });
}

  
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
  
  if (document.body.classList.contains("dark-app")) {
    loadDashboard();
  }  
  function searchTransactions() {

    const search =
        document.getElementById("searchTransaction")
        .value
        .toLowerCase();

    const transactionList =
        document.getElementById("transactions");

    transactionList.innerHTML = "";

    currentUser.transactions
        .slice()
        .reverse()
        .forEach(transaction => {

            if(transaction.toLowerCase().includes(search)){

                const li = document.createElement("li");
                li.textContent = transaction;

                transactionList.appendChild(li);

            }

        });

}
function updateStats() {
    const transactions = currentUser.transactions || [];
  
    const deposits = transactions.filter(t => t.toLowerCase().includes("deposited")).length;
    const withdrawals = transactions.filter(t => t.toLowerCase().includes("withdrew")).length;
    const transfers = transactions.filter(t => t.toLowerCase().includes("transferred")).length;
  
    document.getElementById("totalTransactions").textContent = transactions.length;
    document.getElementById("depositCount").textContent = deposits;
    document.getElementById("withdrawCount").textContent = withdrawals;
    document.getElementById("transferCount").textContent = transfers;
  }