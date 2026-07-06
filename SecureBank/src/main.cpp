#include "../include/Bank.h"

int main() {
    Bank bank;

    bank.loadAccounts();
    bank.start();

    return 0;
}
