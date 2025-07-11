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
            menuContainer.innerHTML = `<p>Sorry, there was an error loading the menu. Please check the browser console for details.</p><p>Error: ${error.message}</p>`;
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
                displayCurrentMenu();
            });
            mainMenuNavBar.appendChild(menuButton);
        });
    }

    // --- 3. HELPER TO POPULATE MENU CONTENT (Handles single price AND multiple options) ---
    function populateMenuContent(currentMenu, filterText = '') {
        if (menuTitleElement) {
            menuTitleElement.textContent = currentMenu.name;
        }
        menuContainer.innerHTML = '';

        let hasAnyContentAtAll = false;
        const normalizedFilterText = filterText.toLowerCase();

        if (!currentMenu.categories || currentMenu.categories.length === 0) {
            menuContainer.innerHTML = '<p>This menu has no items or categories yet.</p>';
            return;
        }

        currentMenu.categories.forEach(category => {
            const itemsToFilter = category.items || [];
            
            const filteredItems = itemsToFilter.filter(item => {
                if (filterText === '') return true;
                const nameMatches = item.name.toLowerCase().includes(normalizedFilterText);
                
                // Check if search text matches in any of the options' descriptions
                const optionMatches = item.options && item.options.some(opt => 
                    opt.description.toLowerCase().includes(normalizedFilterText)
                );

                // Or check the single description if it exists
                const singleDescriptionMatches = item.description && item.description.toLowerCase().includes(normalizedFilterText);

                return nameMatches || optionMatches || singleDescriptionMatches;
            });

            if (filteredItems.length > 0) {
                hasAnyContentAtAll = true;
                const categorySection = document.createElement('div');
                categorySection.classList.add('category-section');
                categorySection.id = category.id;

                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category.category;
                categorySection.appendChild(categoryTitle);

                filteredItems.forEach(item => {
                    const menuItemDiv = document.createElement('div');
                    menuItemDiv.classList.add('menu-item');

                    if (item.image && item.image.trim() !== "") {
                        const imgElement = document.createElement('img');
                        imgElement.src = item.image;
                        imgElement.alt = item.name;
                        imgElement.classList.add('menu-item-image');
                        menuItemDiv.appendChild(imgElement);
                    }

                    const productName = document.createElement('h3');
                    productName.textContent = item.name;
                    menuItemDiv.appendChild(productName);

                    // **NEW LOGIC: Check for multiple options vs single price**
                    if (item.options && Array.isArray(item.options)) {
                        // Create list for multiple options
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
                        menuItemDiv.appendChild(optionsContainer);
                    } else {
                        // Fallback to single description/price display
                        const itemDescription = document.createElement('p');
                        itemDescription.textContent = item.description;
                        
                        // Add the price to the h3 tag for single items
                        const itemPrice = document.createElement('span');
                        itemPrice.classList.add('price'); // Use a general price class
                        itemPrice.textContent = item.price;
                        productName.appendChild(itemPrice); // Append price to the h3

                        menuItemDiv.appendChild(itemDescription);
                    }
                    
                    categorySection.appendChild(menuItemDiv);
                });
                menuContainer.appendChild(categorySection);
            }
        });

        if (!hasAnyContentAtAll && filterText) {
            menuContainer.innerHTML = '<p>No items match your search in this menu.</p>';
        }
    }

    // --- 4. DISPLAY CURRENT MENU (Simplified Fade Animation) ---
    function displayCurrentMenu(filterText = '') {
        if (!allMenusData || allMenusData.length === 0 || !allMenusData[currentMenuIndex]) {
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
        
        setTimeout(() => {
            populateMenuContent(currentMenu, filterText);
            if (menuIndicatorsContainer) {
                updateMenuIndicators();
            }
            menuContainer.style.opacity = '1';
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
                displayCurrentMenu();
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
            displayCurrentMenu(); 
        }
    }

    // --- 7. SEARCH FUNCTIONALITY ---
    searchInput.addEventListener('input', (e) => {
        if (!allMenusData || allMenusData.length === 0) return;
        displayCurrentMenu(e.target.value); 
    });
});
