# SecureBank – Modern Banking Management System

![C++](https://img.shields.io/badge/C%2B%2B-17-blue?logo=cplusplus)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Git](https://img.shields.io/badge/Git-Version%20Control-orange?logo=git)

A modern banking management system developed with **C++** and a responsive **HTML, CSS, and JavaScript** web prototype. The project demonstrates object-oriented programming, file handling, authentication, banking operations, and a modern fintech-inspired user interface.

Developed as part of the **DevAlpha C++ Programming Internship (June–July 2026).**

---
# Features

## C++ Banking Application

* Create new bank accounts
* Secure account login
* Deposit funds
* Withdraw funds
* Transfer money between accounts
* View account balance
* View transaction history
* Administrator dashboard
* Persistent file storage
* Object-Oriented Programming architecture

---

## Web Prototype

* Responsive banking interface
* Modern fintech-inspired dashboard
* Account registration
* User authentication
* Deposit and withdrawal system
* Money transfer simulation
* Dashboard analytics
* Transaction search
* Transaction timestamps
* CSV statement download
* Account lock after three failed login attempts
* Local browser storage simulation

---

# Technologies Used

### Programming Languages

* C++
* HTML5
* CSS3
* JavaScript

### Software Engineering

* Object-Oriented Programming (OOP)
* File Handling
* STL (Standard Template Library)
* Modular Project Architecture
* Git
* GitHub

---

# Project Structure

```text
Banking-Management-System/
│
├── include/
│   ├── Account.h
│   └── Bank.h
│
├── src/
│   ├── main.cpp
│   ├── Account.cpp
│   └── Bank.cpp
│
├── data/
│   ├── accounts.txt
│   └── transactions.txt
│
├── website/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── script.js
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   └── storage.js
│   │
│   └── assets/
│
├── Makefile
└── README.md
```

---

# Running the C++ Application

Clone the repository:

```bash
git clone https://github.com/nehemya123/Banking-Management-System.git
cd Banking-Management-System
```

Using the Makefile:

```bash
make run
```

Or compile manually:

```bash
g++ -std=c++17 src/main.cpp src/Account.cpp src/Bank.cpp -o SecureBank
./SecureBank
```

---

# Running the Web Prototype

Open the following file in your browser:

```text
website/index.html
```

The web prototype demonstrates the user interface and banking workflow using browser local storage.

---

# Skills Demonstrated

* Object-Oriented Programming
* Software Design
* File Input/Output
* User Authentication
* Financial Transaction Processing
* Responsive Web Design
* Front-End Development
* Git Version Control
* Problem Solving
* Software Documentation

---

# Future Improvements

* Database integration (MySQL or PostgreSQL)
* Password encryption
* REST API backend
* User profile management
* Spending analytics with interactive charts
* Email notifications
* Two-factor authentication
* Mobile application
* Cloud deployment

---

# Project Highlights

✔ Modular C++ architecture

✔ Modern fintech-style web interface

✔ Secure authentication workflow

✔ Dashboard analytics

✔ Transaction search

✔ CSV statement export

✔ Account security with login lockout

✔ Responsive UI

---

# Author

**Nehemya Assefa**

Computer Science Student
University of Minnesota

DevAlpha C++ Programming Internship
June 2026 – July 2026

---

### If you found this project interesting, feel free to star the repository.
