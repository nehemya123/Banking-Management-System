# SecureBank – Modern Banking Management System

SecureBank is a banking management system built with **C++** and a modern **HTML, CSS, and JavaScript** web prototype. The project allows users to create accounts, log in, deposit money, withdraw money, transfer funds, and view transaction history.

This project was created for the **DevAlpha C++ Programming Internship Program**.

##  Features

* Create bank accounts
* Login using account number and PIN
* Deposit money
* Withdraw money
* Transfer money between accounts
* View transaction history
* Admin view for all accounts
* File-based data storage in C++
* Responsive web prototype
* Modern fintech-style dashboard

---

##  Technologies Used

* C++
* Object-Oriented Programming
* File Handling
* STL Vectors
* HTML5
* CSS3
* JavaScript
* Git and GitHub

---

##  Project Structure

```text
Banking-Management-System/
├── include/
│   ├── Account.h
│   └── Bank.h
├── src/
│   ├── main.cpp
│   ├── Account.cpp
│   └── Bank.cpp
├── data/
│   ├── accounts.txt
│   └── transactions.txt
├── website/
│   ├── index.html
│   ├── signup.html
│   ├── login.html
│   ├── dashboard.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── assets/
│   └── screenshots/
├── Makefile
└── README.md
```

---

##  How to Run the C++ Application

Clone the repository:

```bash
git clone https://github.com/nehemya123/Banking-Management-System.git
cd Banking-Management-System
```

Run using Makefile:

```bash
make run
```

Or compile manually:

```bash
g++ -std=c++17 src/main.cpp src/Account.cpp src/Bank.cpp -o SecureBank
./SecureBank
```

---

##  How to Run the Web Prototype

Open this file in your browser:

```text
website/index.html
```

The web prototype uses browser local storage to simulate account creation, login, deposits, withdrawals, transfers, and transaction history.

---

##  What I Learned

Through this project, I practiced:

* Building a modular C++ project
* Using header and implementation files
* Applying object-oriented programming
* Reading from and writing to files
* Managing user input and validation
* Creating a web prototype with HTML, CSS, and JavaScript
* Organizing a project for GitHub

---

##  Future Improvements

* Connect the web interface to a real backend
* Add database support using MySQL or PostgreSQL
* Encrypt user PINs/passwords
* Add two-factor authentication
* Generate PDF bank statements
* Add spending analytics
* Add account types such as checking and savings
* Deploy the web prototype online

---

##  Author

**Nehemya Assefa**
DevAlpha C++ Programming Internship
June 2026 – July 2026

