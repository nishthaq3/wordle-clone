#include "game.h"
#include <vector>
#include <cstdlib>
#include <ctime>
string evaluateGuess(string word, string guess) {
    string res = "";
	vector<int> freq(26,0);

	for(char ch : word){
		freq[ch-'A']++;
	}
    //first pass
    for(int j = 0; j < 5; j++) {
        if(word[j] == guess[j]) {
            res += "_";
			freq[word[j] - 'A']--;
        } else {
            res += "?";
        }
    }
	
	//second pass
	for(int j = 0; j < 5; j++) {
    if(res[j] == '?') {
        if(freq[guess[j] - 'A'] > 0) {
            res[j] = '~';
            freq[guess[j] - 'A']--;
        } else {
            res[j] = 'X';
        }
    }
}
	return res;
}
string getRandomWord(){
	vector<string> words={
		"BATON",
		"APPLE",
		"POWER",
		"FIELD",
		"ADIEU",
		"EARTH"
	};
	srand(time(0));
	int randomIndex=rand()%words.size();
	return words[randomIndex];
}