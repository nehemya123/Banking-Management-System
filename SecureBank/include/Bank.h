#ifndef BANK_H
#define BANK_H

#include "Account.h"
#include <vector>
#include <string>
using namespace std;

class Bank {
private:
    vector<Account> accounts;

public:
    void loadAccounts();
    void saveAccounts();
    void addTransaction(int accNum, string message);

    void createAccount();
    Account* login();

    void depositMoney(Account* acc);
    void withdrawMoney(Account* acc);
    void transferMoney(Account* sender);
    void viewTransactions(Account* acc);

    void userMenu(Account* acc);
    void adminView();
    void start();
};

#endif