#include <iostream>
#include "game.h"
using namespace std;

int main() {
    string word = "BATON";
    string guess;

    for(int i = 0; i < 6; i++) {
        cin >> guess;

        string res = evaluateGuess(word, guess);
        cout << res << endl;

        if(res == "_____") {
            cout << "You guessed it!" << endl;
            break;
        }
    }

    return 0;
}