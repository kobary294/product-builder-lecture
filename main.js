const recommendBtn = document.getElementById('recommend-btn');
const toggleModeBtn = document.getElementById('toggle-mode-btn');
const menuDisplay = document.getElementById('menu-display');

const dinnerMenus = [
  "치킨",
  "피자",
  "삼겹살",
  "초밥",
  "파스타",
  "햄버거",
  "김치찌개",
  "된장찌개",
  "부대찌개",
  "떡볶이"
];

recommendBtn.addEventListener('click', () => {
  const recommendedMenu = recommendDinnerMenu();
  displayMenu(recommendedMenu);
});

toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

function recommendDinnerMenu() {
  const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
  return dinnerMenus[randomIndex];
}

function displayMenu(menu) {
  menuDisplay.textContent = menu;
}
