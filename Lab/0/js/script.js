class MemoryGame {
    constructor(container, message) {
        this.container = container;
        this.message = message;
        this.buttons = [];
        this.order = [];
        this.numButtons = 0;
    }

    startGame(numButtons) {
        this.resetGame();
        this.numButtons = numButtons;
        this.createButtons();
        setTimeout(() => this.scramble(), numButtons * 1000);  
    }

    resetGame() {
        this.container.innerHTML = '';
        this.buttons = [];
        this.order = [];
    }

    createButtons() {
        for (let i = 0; i < this.numButtons; i++) {
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent = i + 1;
            button.style.backgroundColor = this.getRandomColor();
            this.container.appendChild(button);
            this.buttons.push(button);
            this.order.push(button);
        }
    }

    scramble() {
        let count = 0;
        const self = this;

        self.hideNumbers();

        function scrambleInterval() {
            if (count >= self.numButtons) {
                clearInterval(interval);
                self.enableClick();
                return;
            }

            for (let i = 0; i < self.buttons.length; i++) {
                const button = self.buttons[i];
                button.style.position = 'absolute';
                button.style.left = Math.random() * (window.innerWidth - button.offsetWidth) + 'px';
                button.style.top = Math.random() * (window.innerHeight - button.offsetHeight) + 'px';
            }

            count++;
        }

        const interval = setInterval(scrambleInterval, 2000);  
    }

    hideNumbers() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].textContent = '';
        }
    }

    enableClick() {
        let currentIndex = 0;
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            button.addEventListener('click', function() {
                if (this.order[currentIndex] === button) {
                    button.textContent = i + 1; 
                    currentIndex++;
                    if (currentIndex === this.numButtons) {
                        alert(this.message.success);
                    }
                } else {
                    alert(this.message.failure);
                    this.revealOrder();
                }
            }.bind(this));
        }
    }

    revealOrder() {
        for (let i = 0; i < this.order.length; i++) {
            let button = this.order[i];
            button.textContent = i + 1;
        }
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

const buttonContainer = document.getElementById('container');
const startGameButton = document.getElementById('startGame');
const inputNumButtons = document.getElementById('numButtons');

const game = new MemoryGame(buttonContainer, messages);

startGameButton.addEventListener('click', () => {
    const numButtons = parseInt(inputNumButtons.value);
    if (numButtons >= 3 && numButtons <= 7) {
        game.startGame(numButtons);
    } else {
        alert(messages.error);
    }
});
