const recommendBtn = document.getElementById('recommend-btn');
const toggleModeBtn = document.getElementById('toggle-mode-btn');
const menuDisplay = document.getElementById('menu-display');
const menuImage = document.getElementById('menu-image');
const menuName = document.getElementById('menu-name');

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

function getMenuImageUrl(menu) {
  // Using Unsplash for random images based on the menu name
  // Note: Unsplash might return generic images if the query is too specific or not found.
  return `https://source.unsplash.com/random/400x300/?${encodeURIComponent(menu)}`;
}

function displayMenu(menu) {
  menuName.textContent = menu;
  menuImage.src = getMenuImageUrl(menu);
  menuImage.style.display = 'block'; // Show the image
}
