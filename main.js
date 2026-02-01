const generateBtn = document.getElementById('generate-btn');
const toggleModeBtn = document.getElementById('toggle-mode-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

generateBtn.addEventListener('click', () => {
  const numbers = generateLottoNumbers();
  displayLottoNumbers(numbers);
});

toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function displayLottoNumbers(numbers) {
  lottoNumbersContainer.innerHTML = '';
  numbers.forEach(number => {
    const numberElement = document.createElement('div');
    numberElement.classList.add('lotto-number');
    numberElement.textContent = number;
    lottoNumbersContainer.appendChild(numberElement);
  });
}
