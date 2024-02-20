document.getElementById('start-game').addEventListener('click', function() {
    const digitNumber = parseInt(document.getElementById('digit-number').value, 10);
    const attemptNumber = parseInt(document.getElementById('attempt-number').value, 10);
    startGame(digitNumber, attemptNumber);
});

function generateSolution(digitNumber) {
    let solution = [];
    while (solution.length < digitNumber) {
        const randomNumber = Math.floor(Math.random() * 10);
        if (!solution.includes(randomNumber)) {
            solution.push(randomNumber);
        }
    }
    return solution;
}

function startGame(digitNumber, attemptNumber) {
    const solution = generateSolution(digitNumber);
    let attemptsLeft = attemptNumber;

    document.getElementById('game-play').style.display = 'block';
    document.getElementById('game-options').style.display = 'none';
    updateAttemptsDisplay(attemptsLeft);

    document.getElementById('submit-guess').onclick = function() {
        const userGuess = document.getElementById('user-input').value.split('').map(Number);
        if (userGuess.length !== digitNumber || new Set(userGuess).size !== digitNumber) {
            alert('無効な入力です。');
            return;
        }
        const result = checkGuess(userGuess, solution);
        attemptsLeft--;
        updateAttemptsDisplay(attemptsLeft);

        if (result.eat === digitNumber) {
            document.getElementById('result').textContent = '正解！おめでとうございます！';
            endGame();
        } else if (attemptsLeft === 0) {
            document.getElementById('result').textContent = `ゲームオーバー。正解は ${solution.join('')} でした。`;
            endGame();
        } else {
            document.getElementById('result').textContent = `EAT: ${result.eat}, BITE: ${result.bite}`;
        }
    };

    document.getElementById('restart-game').style.display = 'block';
    document.getElementById('restart-game').onclick = function() {
        document.getElementById('game-play').style.display = 'none';
        document.getElementById('game-options').style.display = 'block';
        document.getElementById('result').textContent = '';
        document.getElementById('user-input').value = '';
        document.getElementById('restart-game').style.display = 'none';
    };
}

function checkGuess(guess, solution) {
    let eat = 0;
    let bite = 0;
    guess.forEach((num, index) => {
        if (solution.includes(num)) {
            if (solution[index] === num) {
                eat++;
            } else {
                bite++;
            }
        }
    });
    return { eat, bite };
}

function updateAttemptsDisplay(attemptsLeft) {
    document.getElementById('attempts').textContent = `残り回数: ${attemptsLeft}`;
}

function endGame() {
    document.getElementById('submit-guess').disabled = true;
    setTimeout(() => {
        if (confirm('もう一度プレイしますか？')) {
            document.location.reload();
        }
    }, 1000);
}