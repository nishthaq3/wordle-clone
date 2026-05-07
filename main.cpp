#include <iostream>
#include "game.h"
#include <cctype>
using namespace std;

int main() {
    string word = getRandomWord();
    string guess;
	bool didGuess=false;

    for(int i = 0; i < 6; i++) {
		cout << "Attempt " << i + 1 << "/6: ";
        cin >> guess;
		if(guess.length() != 5){
			cout<<"Enter exactly 5 letters"<<endl;
			i--;
			continue;
		}
		for(char &c : guess) {
    		c = toupper(c);
		}
        string res = evaluateGuess(word, guess);
        cout << res << endl;

        if(res == "_____") {
			didGuess=true;
            cout << "You guessed it!" << endl;
            break;
        }
    }
	if(!didGuess){
		cout<<"Game over. The word was "<<word<<endl;
	}
    return 0;
}