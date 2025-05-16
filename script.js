document.addEventListener('DOMContentLoaded', function() {
    let allMenusData = [];
    let currentMenuIndex = 0;

    const menuContainer = document.getElementById('menu-container');
    const mainMenuNavBar = document.getElementById('category-nav'); // Renamed for clarity, still uses 'category-nav' ID
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
                populateMainMenuNavigationBar(); // Populate the main menu buttons
                displayCurrentMenu();         // Display the first menu (will fade in)
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
        mainMenuNavBar.innerHTML = ''; // Clear existing buttons

        allMenusData.forEach((menu, index) => {
            const menuButton = document.createElement('button');
            menuButton.textContent = menu.name;
            menuButton.setAttribute('data-menu-index', index);

            menuButton.addEventListener('click', () => {
                if (index === currentMenuIndex) return; // Do nothing if already active

                let slideParams = null;
                if (index > currentMenuIndex) {
                    slideParams = { outClass: 'menu-slide-out-left', inClass: 'menu-slide-in-from-right' };
                } else {
                    slideParams = { outClass: 'menu-slide-out-right', inClass: 'menu-slide-in-from-left' };
                }
                currentMenuIndex = index;
                searchInput.value = '';
                displayCurrentMenu(searchInput.value, slideParams);
            });
            mainMenuNavBar.appendChild(menuButton);
        });
    }

    // --- 3. HELPER TO POPULATE MENU CONTENT (CATEGORIES AS H2, ITEMS WITH IMAGES) ---
    function populateMenuContent(currentMenu, filterText = '') {
        if (menuTitleElement) {
            menuTitleElement.textContent = currentMenu.name;
        }
        menuContainer.innerHTML = ''; // Clear old items from main container

        let hasVisibleItemsOverall = false;
        const normalizedFilterText = filterText.toLowerCase();

        if (!currentMenu.categories || currentMenu.categories.length === 0) {
            menuContainer.innerHTML = '<p>This menu has no items or categories yet.</p>';
            return; // Exit if no categories to render
        }

        currentMenu.categories.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.classList.add('category-section');
            categorySection.id = category.id; // Keep ID for potential future direct linking

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category.category;
            categorySection.appendChild(categoryTitle);

            let itemsRenderedInCategory = 0;
            if (category.items && category.items.length > 0) {
                category.items.forEach(item => {
                    if (
                        filterText === '' ||
                        item.name.toLowerCase().includes(normalizedFilterText) ||
                        (item.description && item.description.toLowerCase().includes(normalizedFilterText))
                    ) {
                        const menuItemDiv = document.createElement('div');
                        menuItemDiv.classList.add('menu-item');

                        // Add image if available
                        if (item.image && item.image.trim() !== "") {
                            const imgElement = document.createElement('img');
                            imgElement.src = item.image;
                            imgElement.alt = item.name;
                            imgElement.classList.add('menu-item-image');
                            menuItemDiv.appendChild(imgElement);
                        }

                        const itemName = document.createElement('h3');
                        itemName.textContent = item.name;
                        const itemPrice = document.createElement('span');
                        itemPrice.classList.add('price');
                        itemPrice.textContent = item.price;
                        const itemDescription = document.createElement('p');
                        itemDescription.textContent = item.description;

                        itemName.appendChild(itemPrice);
                        menuItemDiv.appendChild(itemName);
                        menuItemDiv.appendChild(itemDescription);
                        categorySection.appendChild(menuItemDiv);
                        itemsRenderedInCategory++;
                        hasVisibleItemsOverall = true;
                    }
                });
            }

            if (itemsRenderedInCategory > 0) {
                menuContainer.appendChild(categorySection);
            } else if (!filterText && (!category.items || category.items.length === 0)) {
                // If not filtering and category is defined as empty
                categorySection.innerHTML += '<p>No items in this category.</p>';
                menuContainer.appendChild(categorySection);
            }
        });


        if (!hasVisibleItemsOverall && filterText) {
            menuContainer.innerHTML = '<p>No items match your search in this menu.</p>';
        } else if (!hasVisibleItemsOverall && !filterText &&
                   (currentMenu.categories.length === 0 || currentMenu.categories.every(c => !c.items || c.items.length === 0))) {
            // If not filtering and the current menu genuinely has no items across all its categories
            menuContainer.innerHTML = '<p>This menu currently has no items listed.</p>';
        }
    }

    // --- 4. DISPLAY CURRENT MENU (Handles Animations, Calls Content Population) ---
    function displayCurrentMenu(filterText = '', slideParams = null) {
        if (!allMenusData || allMenusData.length === 0 || !allMenusData[currentMenuIndex]) {
            console.error("Menu data or current menu is not available for display.");
            menuContainer.innerHTML = '<p>Error loading menu content.</p>'; // Show error in main container
            return;
        }
        const currentMenu = allMenusData[currentMenuIndex];

        // Update active state in the main menu navigation bar (#category-nav)
        const menuButtons = mainMenuNavBar.querySelectorAll('button');
        menuButtons.forEach(button => {
            if (parseInt(button.getAttribute('data-menu-index')) === currentMenuIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        const performContentUpdateAndTransition = () => {
            populateMenuContent(currentMenu, filterText);
            if (menuIndicatorsContainer) {
                updateMenuIndicators();
            }

           // MODIFIED part in performContentUpdateAndTransition function:
// ... after populateMenuContent(currentMenu, filterText); and if (menuIndicatorsContainer) { updateMenuIndicators(); } ...

            if (slideParams && slideParams.inClass) {
                // At this point, menuContainer has slideParams.inClass (e.g., transform: translateX(100%); opacity: 0;)
                // and its content has just been updated.
                // We want it to animate to its default state (transform: translateX(0); opacity: 1;).
                // The transition property on #menu-container will handle this.
                
                // Ensure opacity is set to 1 for the target state of the transition
                menuContainer.style.opacity = '1';
                // Removing the class will trigger the transform to animate to translateX(0)
                menuContainer.classList.remove(slideParams.inClass);
            } else {
                // Simple fade-in for non-slide scenarios (initial load, search filter)
                menuContainer.style.opacity = '1';
            }
// ...
        };

        // Clear previous animation classes and start fade out / slide out
        menuContainer.classList.remove('menu-slide-out-left', 'menu-slide-out-right', 'menu-slide-in-from-left', 'menu-slide-in-from-right');
        menuContainer.style.opacity = '0'; // Start by making it invisible or as part of slide-out

        if (slideParams && slideParams.outClass) {
            menuContainer.classList.add(slideParams.outClass); // This also sets opacity to 0 via CSS

            menuContainer.addEventListener('transitionend', function onSlideOut() {
                menuContainer.removeEventListener('transitionend', onSlideOut);
                // Prepare for slide-in: remove outClass, add inClass (positions off-screen)
                menuContainer.classList.remove(slideParams.outClass);
                if (slideParams.inClass) {
                    menuContainer.classList.add(slideParams.inClass);
                }
                performContentUpdateAndTransition();
            }, { once: true });
        } else { // Fallback to simple fade (e.g., for initial load or search filter)
            setTimeout(() => { // Allow opacity:0 to take effect
                performContentUpdateAndTransition();
            }, 50); // A short delay for opacity to set before content update
        }
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

                let slideParams = null;
                if (index > currentMenuIndex) {
                    slideParams = { outClass: 'menu-slide-out-left', inClass: 'menu-slide-in-from-right' };
                } else {
                    slideParams = { outClass: 'menu-slide-out-right', inClass: 'menu-slide-in-from-left' };
                }
                currentMenuIndex = index;
                searchInput.value = '';
                displayCurrentMenu(searchInput.value, slideParams);
            });
            menuIndicatorsContainer.appendChild(dot);
        });
    }

    // --- 6. SWIPE HANDLING ---
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimum pixels for a swipe

    menuContainer.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    menuContainer.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (!allMenusData || allMenusData.length <= 1) return; // No swipe if only one/no menu
        const deltaX = touchEndX - touchStartX;
        let slideParams = null;

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) { // Swipe Right (current menu slides out to right, new one comes from left)
                slideParams = { outClass: 'menu-slide-out-right', inClass: 'menu-slide-in-from-left' };
                currentMenuIndex = (currentMenuIndex - 1 + allMenusData.length) % allMenusData.length;
            } else { // Swipe Left (current menu slides out to left, new one comes from right)
                slideParams = { outClass: 'menu-slide-out-left', inClass: 'menu-slide-in-from-right' };
                currentMenuIndex = (currentMenuIndex + 1) % allMenusData.length;
            }
            searchInput.value = ''; // Clear search on menu change
            displayCurrentMenu(searchInput.value, slideParams);
        }
    }

    // --- 7. SEARCH FUNCTIONALITY ---
    searchInput.addEventListener('input', (e) => {
        if (!allMenusData || allMenusData.length === 0) return;
        // Search updates content with a fade (no slide)
        displayCurrentMenu(e.target.value, null);
    });
});
