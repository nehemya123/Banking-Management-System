#include "../include/Bank.h"
#include <iostream>
#include <fstream>
#include <iomanip>
using namespace std;

void Bank::loadAccounts() {
    ifstream file("data/accounts.txt");

    if (!file) {
        return;
    }

    int accNum;
    string name;
    string pin;
    double balance;
    char comma;

    while (file >> accNum >> comma) {
        getline(file, name, ',');
        getline(file, pin, ',');
        file >> balance;
        file.ignore();

        accounts.push_back(Account(accNum, name, pin, balance));
    }

    file.close();
}

void Bank::saveAccounts() {
    ofstream file("data/accounts.txt");

    for (const Account& acc : accounts) {
        file << acc.toFileString() << endl;
    }

    file.close();
}

void Bank::addTransaction(int accNum, string message) {
    ofstream file("data/transactions.txt", ios::app);
    file << accNum << ": " << message << endl;
    file.close();
}

void Bank::createAccount() {
    string name;
    string pin;
    double initialDeposit;

    cin.ignore();

    cout << "\nEnter full name: ";
    getline(cin, name);

    cout << "Create 4-digit PIN: ";
    cin >> pin;

    cout << "Enter initial deposit: $";
    cin >> initialDeposit;

    if (initialDeposit < 0) {
        cout << "Initial deposit cannot be negative." << endl;
        return;
    }

    int newAccountNumber = 1000 + accounts.size() + 1;

    accounts.push_back(Account(newAccountNumber, name, pin, initialDeposit));
    saveAccounts();

    addTransaction(newAccountNumber, "Account created with initial deposit $" + to_string(initialDeposit));

    cout << "\nAccount created successfully!" << endl;
    cout << "Your account number is: " << newAccountNumber << endl;
}

Account* Bank::login() {
    int accNum;
    string pin;

    cout << "\nEnter account number: ";
    cin >> accNum;

    cout << "Enter PIN: ";
    cin >> pin;

    for (Account& acc : accounts) {
        if (acc.getAccountNumber() == accNum && acc.checkPin(pin)) {
            cout << "\nLogin successful. Welcome, " << acc.getName() << "!" << endl;
            return &acc;
        }
    }

    cout << "\nInvalid account number or PIN." << endl;
    return nullptr;
}

void Bank::depositMoney(Account* acc) {
    double amount;

    cout << "\nEnter deposit amount: $";
    cin >> amount;

    if (amount <= 0) {
        cout << "Invalid amount." << endl;
        return;
    }

    acc->deposit(amount);
    saveAccounts();

    addTransaction(acc->getAccountNumber(), "Deposited $" + to_string(amount));

    cout << "Deposit successful." << endl;
}

void Bank::withdrawMoney(Account* acc) {
    double amount;

    cout << "\nEnter withdrawal amount: $";
    cin >> amount;

    if (amount <= 0) {
        cout << "Invalid amount." << endl;
        return;
    }

    if (acc->withdraw(amount)) {
        saveAccounts();
        addTransaction(acc->getAccountNumber(), "Withdrew $" + to_string(amount));
        cout << "Withdrawal successful." << endl;
    } else {
        cout << "Insufficient balance." << endl;
    }
}

void Bank::transferMoney(Account* sender) {
    int receiverAccNum;
    double amount;

    cout << "\nEnter receiver account number: ";
    cin >> receiverAccNum;

    cout << "Enter transfer amount: $";
    cin >> amount;

    if (amount <= 0) {
        cout << "Invalid amount." << endl;
        return;
    }

    Account* receiver = nullptr;

    for (Account& acc : accounts) {
        if (acc.getAccountNumber() == receiverAccNum) {
            receiver = &acc;
            break;
        }
    }

    if (receiver == nullptr) {
        cout << "Receiver account not found." << endl;
        return;
    }

    if (sender->getAccountNumber() == receiver->getAccountNumber()) {
        cout << "You cannot transfer money to your own account." << endl;
        return;
    }

    if (sender->withdraw(amount)) {
        receiver->deposit(amount);
        saveAccounts();

        addTransaction(sender->getAccountNumber(), "Transferred $" + to_string(amount) + " to account " + to_string(receiverAccNum));
        addTransaction(receiver->getAccountNumber(), "Received $" + to_string(amount) + " from account " + to_string(sender->getAccountNumber()));

        cout << "Transfer successful." << endl;
    } else {
        cout << "Insufficient balance." << endl;
    }
}

void Bank::viewTransactions(Account* acc) {
    ifstream file("data/transactions.txt");
    string line;
    string accPrefix = to_string(acc->getAccountNumber()) + ":";

    cout << "\nTransaction History" << endl;
    cout << "-------------------" << endl;

    bool found = false;

    while (getline(file, line)) {
        if (line.find(accPrefix) == 0) {
            cout << line << endl;
            found = true;
        }
    }

    if (!found) {
        cout << "No transactions found." << endl;
    }

    file.close();
}

void Bank::userMenu(Account* acc) {
    int choice;

    do {
        cout << "\n===== SecureBank User Menu =====" << endl;
        cout << "1. View Balance" << endl;
        cout << "2. Deposit Money" << endl;
        cout << "3. Withdraw Money" << endl;
        cout << "4. Transfer Money" << endl;
        cout << "5. View Transaction History" << endl;
        cout << "6. Logout" << endl;
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                acc->displayAccount();
                break;
            case 2:
                depositMoney(acc);
                break;
            case 3:
                withdrawMoney(acc);
                break;
            case 4:
                transferMoney(acc);
                break;
            case 5:
                viewTransactions(acc);
                break;
            case 6:
                cout << "Logged out." << endl;
                break;
            default:
                cout << "Invalid choice." << endl;
        }

    } while (choice != 6);
}

void Bank::adminView() {
    string password;

    cout << "\nEnter admin password: ";
    cin >> password;

    if (password != "admin123") {
        cout << "Wrong admin password." << endl;
        return;
    }

    cout << "\n===== All Bank Accounts =====" << endl;

    for (const Account& acc : accounts) {
        acc.displayAccount();
    }
}

void Bank::start() {
    int choice;

    do {
        cout << "\n========== SecureBank ==========" << endl;
        cout << "1. Create Account" << endl;
        cout << "2. Login" << endl;
        cout << "3. Admin View" << endl;
        cout << "4. Exit" << endl;
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                createAccount();
                break;
            case 2: {
                Account* user = login();
                if (user != nullptr) {
                    userMenu(user);
                }
                break;
            }
            case 3:
                adminView();
                break;
            case 4:
                cout << "Thank you for using SecureBank!" << endl;
                break;
            default:
                cout << "Invalid choice." << endl;
        }

    } while (choice != 4);
}