#include "game.h"
string evaluateGuess(string word, string guess) {
    string res = "";

    //first pass
    for(int j = 0; j < 5; j++) {
        if(word[j] == guess[j]) {
            res += "_";
        } else {
            res += "?";
        }
    }
	//adding second pass later
	return res;
}