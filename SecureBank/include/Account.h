#ifndef ACCOUNT_H
#define ACCOUNT_H

#include <string>
using namespace std;

class Account {
private:
    int accountNumber;
    string name;
    string pin;
    double balance;

public:
    Account(int accNum, string userName, string userPin, double userBalance);

    int getAccountNumber() const;
    string getName() const;
    bool checkPin(string enteredPin) const;
    double getBalance() const;

    void deposit(double amount);
    bool withdraw(double amount);
    void displayAccount() const;
    string toFileString() const;
};

#endif