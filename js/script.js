window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const game = new Game();

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    game.start();
    game.gameLoop();
  }

  if (game.lives === 0) {
    game.endGame();
  }

  function handleKeydown(event) {
    console.log("keydown");
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -5;
          break;
        case "ArrowUp":
          game.player.directionY = -5;
          break;
        case "ArrowRight":
          game.player.directionX = 5;
          break;
        case "ArrowDown":
          game.player.directionY = 5;
          break;
      }
    }
  }

  function handleKeyup(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = 0;
          break;
        case "ArrowUp":
          game.player.directionY = 0;
          break;
        case "ArrowRight":
          game.player.directionX = 0;
          break;
        case "ArrowDown":
          game.player.directionY = 0;
          break;
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

  const questions = [
    {
      question: "which option is correct",
      options: ["small", "smol"],
      correctAnswer: "smol",
    },
    {
      question: "are you gay",
      options: ["yes", "no"],
      correctAnswer: "yes",
    },
    {
      question: "what is the largest mammal in the world?",
      options: ["you", "Blue Whale"],
      correctAnswer: "you",
    },
  ];

  let currentQuestionIndex = 0;

  function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    questionContainer.innerHTML = `<p>${questions[currentQuestionIndex].question}</p>`;

    optionsContainer.innerHTML = "";
    questions[currentQuestionIndex].options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(button);
    });
  }

  function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedOption === correctAnswer;

    console.log(
      `selected: ${selectedOption}, corr answer: ${correctAnswer}, ${isCorrect}`
    );

    if (isCorrect) {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        game.winLevel();
      }
    } else {
      // alert("your answer cost you a life");
      game.endGame();
    }
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      winLevel();
    }
  }

  // first question
  displayQuestion();
};
