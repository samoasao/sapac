
var game = {
  words: {
    "riddikulus":
      {
        picture: "https://m.popkey.co/8ba4e4/8E7ge.gif"
      },
    "obliviate": {
      picture: " https://media1.giphy.com/media/PcfozPlZSzARO/giphy.gif"
    },
    "sectumsempra": {
      picture: "https://i.pinimg.com/originals/31/f4/cc/31f4cc251b19ac9c9bb0156adb955d2b.gif"
    },
    "avada kedavra": {
      picture: "https://media.giphy.com/media/JAbAmpu1TshlS/giphy.gif"
    },
    "alohomora": {
      picture: "https://media.giphy.com/media/VmKL02u2o1Yqc/200.gif"
    },
    "lumos": {
      picture: "https://orig00.deviantart.net/b098/f/2016/018/b/1/lumos_by_colored_at_desing-d9ogjew.gif"
    },
    "expelliarmus": {
      picture: "https://data.whicdn.com/images/161544611/original.gif"
    },
    "wingardium leviosa": {
      picture: "https://thumbs.gfycat.com/ImperturbableDeliriousGoshawk-max-1mb.gif"
    },
    "accio": {
      picture: "https://i.pinimg.com/originals/88/27/52/882752d996ac8e54d08b0c941b3977ed.gif"
    },
    "expecto patronum": {
      picture: "https://media1.tenor.com/images/3487183397c506d8f8deeaad53dd222b/tenor.gif?itemid=4863337"
    },
    "stupefy": {
      picture: "https://media.giphy.com/media/wJgIwm20i6pxK/200.gif"
    }
  },
  gameStart: false,
  currentWord: "",
  underscores: [],
  wins: 0,
  guessesRemaining: 8,
  lettersGuessed: [],

  chooseNewWord: function () {
    var num = Math.floor(Math.random() * Object.keys(this.words).length);
    var keys = Object.keys(this.words);
    return keys[num].toUpperCase();
  },
  getUnderscores: function (word) {
    this.underscores = [];
    for (var i = 0; i < word.length; i++) {
      if (word[i] !== " ") {
        this.underscores.push("_");
      }
      else {
        this.underscores.push(" ");
      }
    }
    return this.underscores;
  },
  startNewGame: function () {
    this.currentWord = this.chooseNewWord();
    this.underscores = this.getUnderscores(this.currentWord);
    this.lettersGuessed = [];
    this.guessesRemaining = this.underscores.length / 2;
    document.getElementById("instructions").innerText = "Guess the Word!";
    document.getElementById("image").innerHTML = "";
    this.gameStart = true;
    console.log(this.currentWord);
  },
  updateGame: function () {
    document.getElementById("wins").innerText = "Wins: " + this.wins;
    document.getElementById("word").innerText = this.underscores.join('');
    document.getElementById("guessesRemaining").innerText = "Guesses Remaining: " + this.guessesRemaining;
    document.getElementById("lettersGuessed").innerText = this.lettersGuessed.join(' ');
  },
  wonGame: function () {
    if (this.underscores.indexOf("_") < 0) {
      return true;
    }
    else {
      return false;
    }
  }

};


document.onkeyup = function (event) {
  if (game.gameStart) {
    var userGuess = event.key.toUpperCase();

    if (game.underscores.indexOf(userGuess) < 0 && game.lettersGuessed.indexOf(userGuess) < 0) {
      var found = false;
      for (var i = 0; i < game.currentWord.length; i++) {
        if (game.currentWord[i] === userGuess) {
          game.underscores[i] = userGuess;
          found = true;
        }
      }

      if (!found) {
        game.guessesRemaining--;
        game.lettersGuessed.push(userGuess);
        if (game.guessesRemaining === 0) {
          document.getElementById("instructions").innerText = "You Lost! Press any key to play again.";
          game.gameStart = false;
        }
      }
      else if (game.wonGame()) {
        document.getElementById("instructions").innerText = "You Won! Press any key to play again.";
        document.getElementById("image").innerHTML = "<img src=\"" + game.words[game.currentWord.toLowerCase()].picture + "\" >";
        game.wins++;
        game.gameStart = false;
      }



    }

  }
  else {
    game.startNewGame();
  }

  game.updateGame();

}



