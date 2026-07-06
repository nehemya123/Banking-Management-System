#include "../include/Account.h"
#include <iostream>
#include <iomanip>
using namespace std;

Account::Account(int accNum, string userName, string userPin, double userBalance) {
    accountNumber = accNum;
    name = userName;
    pin = userPin;
    balance = userBalance;
}

int Account::getAccountNumber() const {
    return accountNumber;
}

string Account::getName() const {
    return name;
}

bool Account::checkPin(string enteredPin) const {
    return pin == enteredPin;
}

double Account::getBalance() const {
    return balance;
}

void Account::deposit(double amount) {
    balance += amount;
}

bool Account::withdraw(double amount) {
    if (amount > balance) {
        return false;
    }

    balance -= amount;
    return true;
}

void Account::displayAccount() const {
    cout << "\nAccount Number: " << accountNumber << endl;
    cout << "Name: " << name << endl;
    cout << "Balance: $" << fixed << setprecision(2) << balance << endl;
}

string Account::toFileString() const {
    return to_string(accountNumber) + "," + name + "," + pin + "," + to_string(balance);
}