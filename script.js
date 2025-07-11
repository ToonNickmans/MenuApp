document.addEventListener('DOMContentLoaded', function() {
    let allMenusData = [];
    let currentMenuIndex = 0;

    const menuContainer = document.getElementById('menu-container');
    const mainMenuNavBar = document.getElementById('category-nav');
    const searchInput = document.getElementById('searchInput');
    const menuTitleElement = document.getElementById('menu-title');
    const menuIndicatorsContainer = document.getElementById('menu-indicators');

    // --- 1. FETCH MENU DATA FROM JSON FILE ---
    fetch('menu-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            allMenusData = data;
            if (allMenusData && allMenusData.length > 0) {
                populateMainMenuNavigationBar();
                displayCurrentMenu(); // Initial display
            } else {
                console.error('Menu data loaded is empty or invalid.');
                menuContainer.innerHTML = '<p>Menu data could not be loaded or is empty.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing menu data:', error);
            menuContainer.innerHTML = '<p>Sorry, there was an error loading the menu. Please try again later.</p>';
        });

    // --- 2. POPULATE MAIN MENU NAVIGATION BAR ---
    function populateMainMenuNavigationBar() {
        if (!allMenusData || allMenusData.length === 0) return;
        mainMenuNavBar.innerHTML = '';

        allMenusData.forEach((menu, index) => {
            const menuButton = document.createElement('button');
            menuButton.textContent = menu.name;
            menuButton.setAttribute('data-menu-index', index);

            menuButton.addEventListener('click', () => {
                if (index === currentMenuIndex) return;
                currentMenuIndex = index;
                searchInput.value = '';
                displayCurrentMenu(searchInput.value);
            });
            mainMenuNavBar.appendChild(menuButton);
        });
    }

    // --- 3. POPULATE MENU CONTENT (MODIFIED FOR NEW JSON STRUCTURE) ---
    function populateMenuContent(currentMenu, filterText = '') {
        if (menuTitleElement) {
            menuTitleElement.textContent = currentMenu.name;
        }
        menuContainer.innerHTML = ''; // Clear old items

        let hasVisibleItemsOverall = false;
        const normalizedFilterText = filterText.toLowerCase();

        if (!currentMenu.categories || currentMenu.categories.length === 0) {
            menuContainer.innerHTML = '<p>This menu has no items or categories yet.</p>';
            return;
        }

        currentMenu.categories.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.classList.add('category-section');
            categorySection.id = category.id;

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category.category;
            categorySection.appendChild(categoryTitle);

            let itemsRenderedInCategory = 0;
            if (category.items && category.items.length > 0) {
                category.items.forEach(item => {
                    // **MODIFIED SEARCH LOGIC**
                    const nameMatches = item.name.toLowerCase().includes(normalizedFilterText);
                    const optionMatches = item.options.some(opt =>
                        opt.description.toLowerCase().includes(normalizedFilterText)
                    );

                    if (filterText === '' || nameMatches || optionMatches) {
                        // **MODIFIED ITEM RENDERING**
                        const productItemDiv = document.createElement('div');
                        productItemDiv.classList.add('menu-item');

                        if (item.image && item.image.trim() !== "") {
                            const imgElement = document.createElement('img');
                            imgElement.src = item.image;
                            imgElement.alt = item.name;
                            imgElement.classList.add('menu-item-image');
                            productItemDiv.appendChild(imgElement);
                        }

                        const productName = document.createElement('h3');
                        productName.textContent = item.name;
                        productItemDiv.appendChild(productName);

                        const optionsContainer = document.createElement('div');
                        optionsContainer.classList.add('options-list');

                        item.options.forEach(option => {
                            const optionRow = document.createElement('div');
                            optionRow.classList.add('option-row');

                            const optionDescription = document.createElement('span');
                            optionDescription.classList.add('option-description');
                            optionDescription.textContent = option.description;

                            const optionPrice = document.createElement('span');
                            optionPrice.classList.add('option-price');
                            optionPrice.textContent = option.price;

                            optionRow.appendChild(optionDescription);
                            optionRow.appendChild(optionPrice);
                            optionsContainer.appendChild(optionRow);
                        });

                        productItemDiv.appendChild(optionsContainer);
                        categorySection.appendChild(productItemDiv);
                        itemsRenderedInCategory++;
                        hasVisibleItemsOverall = true;
                    }
                });
            }

            if (itemsRenderedInCategory > 0) {
                menuContainer.appendChild(categorySection);
            } else if (!filterText && (!category.items || category.items.length === 0)) {
                categorySection.innerHTML += '<p>No items in this category.</p>';
                menuContainer.appendChild(categorySection);
            }
        });

        if (!hasVisibleItemsOverall && filterText) {
            menuContainer.innerHTML = '<p>No items match your search in this menu.</p>';
        } else if (!hasVisibleItemsOverall && !filterText &&
            (currentMenu.categories.length === 0 || currentMenu.categories.every(c => !c.items || c.items.length === 0))) {
            menuContainer.innerHTML = '<p>This menu currently has no items listed.</p>';
        }
    }


    // --- 4. DISPLAY CURRENT MENU ---
    function displayCurrentMenu(filterText = '') {
        if (!allMenusData || allMenusData.length === 0 || !allMenusData[currentMenuIndex]) {
            console.error("Menu data or current menu is not available for display.");
            menuContainer.innerHTML = '<p>Error loading menu content.</p>';
            return;
        }
        const currentMenu = allMenusData[currentMenuIndex];

        const menuButtons = mainMenuNavBar.querySelectorAll('button');
        menuButtons.forEach(button => {
            if (parseInt(button.getAttribute('data-menu-index')) === currentMenuIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        menuContainer.style.opacity = '0';
        menuContainer.style.transform = 'translateX(0)';

        setTimeout(() => {
            populateMenuContent(currentMenu, filterText);
            if (menuIndicatorsContainer) {
                updateMenuIndicators();
            }

            requestAnimationFrame(() => {
                menuContainer.style.opacity = '1';
            });
        }, 150);
    }

    // --- 5. UPDATE MENU INDICATORS (dots) ---
    function updateMenuIndicators() {
        if (!menuIndicatorsContainer || !allMenusData || allMenusData.length === 0) return;
        menuIndicatorsContainer.innerHTML = '';
        allMenusData.forEach((menu, index) => {
            const dot = document.createElement('span');
            dot.classList.add('indicator-dot');
            if (index === currentMenuIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                if (index === currentMenuIndex) return;
                currentMenuIndex = index;
                searchInput.value = '';
                displayCurrentMenu(searchInput.value);
            });
            menuIndicatorsContainer.appendChild(dot);
        });
    }

    // --- 6. SWIPE HANDLING ---
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 50;

    menuContainer.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    menuContainer.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        if (!allMenusData || allMenusData.length <= 1) return;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
            if (deltaX > 0) {
                currentMenuIndex = (currentMenuIndex - 1 + allMenusData.length) % allMenusData.length;
            } else {
                currentMenuIndex = (currentMenuIndex + 1) % allMenusData.length;
            }
            searchInput.value = '';
            displayCurrentMenu(searchInput.value);
        }
    }

    // --- 7. SEARCH FUNCTIONALITY ---
    searchInput.addEventListener('input', (e) => { // <--- THE FIX IS HERE
        if (!allMenusData || allMenusData.length === 0) return;
        displayCurrentMenu(e.target.value);
    });
});
