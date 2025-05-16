document.addEventListener('DOMContentLoaded', function() {
    let allMenusData = []; // Will be populated from menu-data.json
    let currentMenuIndex = 0;

    const menuContainer = document.getElementById('menu-container');
    const categoryNav = document.getElementById('category-nav');
    const searchInput = document.getElementById('searchInput');
    const menuTitleElement = document.getElementById('menu-title');
    const menuIndicatorsContainer = document.getElementById('menu-indicators');

    // --- FETCH MENU DATA FROM JSON FILE ---
    fetch('menu-data.json') // Ensure 'menu-data.json' is in the same directory or provide correct path
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); // Parses the JSON response into a JavaScript object/array
        })
        .then(data => {
            allMenusData = data; // Assign fetched data
            if (allMenusData && allMenusData.length > 0) {
                displayCurrentMenu(); // Load the first menu initially now that data is available
            } else {
                console.error('Menu data loaded is empty or invalid.');
                menuContainer.innerHTML = '<p>Menu data could not be loaded or is empty.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing menu data:', error);
            menuContainer.innerHTML = '<p>Sorry, there was an error loading the menu. Please try again later.</p>';
        });

    // --- RENDER CURRENT MENU AND CATEGORIES (displayCurrentMenu) ---
    // This function is the same as the one I provided in the previous update
    // It uses the 'allMenusData' and 'currentMenuIndex' variables
    function displayCurrentMenu(filterText = '') {
        menuContainer.classList.add('loading');

        setTimeout(() => {
            const currentMenu = allMenusData[currentMenuIndex];
            if (!currentMenu) { // Safety check if allMenusData is not populated yet or index is wrong
                console.error("Current menu data is not available.");
                menuContainer.innerHTML = '<p>Error: Menu not found.</p>';
                menuContainer.classList.remove('loading');
                return;
            }

            if (menuTitleElement) {
                menuTitleElement.textContent = currentMenu.name;
            }
            categoryNav.innerHTML = '';
            menuContainer.innerHTML = '';

            let hasVisibleItemsOverall = false;
            const normalizedFilterText = filterText.toLowerCase();

            if (!currentMenu.categories || currentMenu.categories.length === 0) {
                menuContainer.innerHTML = '<p>This menu has no items or categories yet.</p>';
            } else {
                currentMenu.categories.forEach(category => {
                    const categoryButton = document.createElement('button');
                    categoryButton.textContent = category.category;
                    categoryButton.setAttribute('data-category-id', category.id);
                    categoryButton.addEventListener('click', () => {
                        const sectionElement = document.getElementById(category.id);
                        if (sectionElement) {
                            sectionElement.scrollIntoView({ behavior: 'smooth' });
                        }
                        document.querySelectorAll('#category-nav button').forEach(btn => btn.classList.remove('active'));
                        categoryButton.classList.add('active');
                    });

                    let categoryHasVisibleItemsInSearch = category.items.some(item =>
                        item.name.toLowerCase().includes(normalizedFilterText) ||
                        (item.description && item.description.toLowerCase().includes(normalizedFilterText))
                    );

                    const categorySection = document.createElement('div');
                    categorySection.classList.add('category-section');
                    categorySection.id = category.id;

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
                         // Add category button if section has items, or if not filtering (to show all categories)
                        if (!filterText || categoryHasVisibleItemsInSearch) {
                           categoryNav.appendChild(categoryButton);
                        }
                    } else if (!filterText && (!category.items || category.items.length === 0)) {
                        categorySection.innerHTML += '<p>No items in this category.</p>';
                        menuContainer.appendChild(categorySection);
                        categoryNav.appendChild(categoryButton); // Show button even if category is empty (when not filtering)
                    }
                    // Ensure all category buttons are shown when not filtering, even if a category becomes empty after filtering.
                    // This specific logic for adding category buttons might need refinement based on exact desired behavior
                    // for empty categories vs categories empty *due to filtering*.
                    // The primary goal is that categoryNav should reflect current menu's categories.

                });
            }

            if (!hasVisibleItemsOverall && filterText) {
                menuContainer.innerHTML = '<p>No items match your search in this menu.</p>';
                categoryNav.innerHTML = ''; // Clear search-specific buttons
                currentMenu.categories.forEach(cat => { // Re-add all categories for current menu
                    const btn = document.createElement('button');
                    btn.textContent = cat.category;
                    btn.setAttribute('data-category-id', cat.id);
                    btn.addEventListener('click', () => {
                         document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth' });
                         document.querySelectorAll('#category-nav button').forEach(b => b.classList.remove('active'));
                         btn.classList.add('active');
                    });
                    categoryNav.appendChild(btn);
                });
            } else if (!hasVisibleItemsOverall && !filterText && (!currentMenu.categories || currentMenu.categories.length === 0 || currentMenu.categories.every(c => !c.items || c.items.length === 0))) {
                menuContainer.innerHTML = '<p>This menu currently has no items listed.</p>';
            }

            if (menuIndicatorsContainer) {
                updateMenuIndicators();
            }
            menuContainer.classList.remove('loading');
        }, 150);
    }

    // --- UPDATE MENU INDICATORS ---
    // This function is the same as the one I provided in the previous update
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
                currentMenuIndex = index;
                searchInput.value = '';
                displayCurrentMenu();
            });
            menuIndicatorsContainer.appendChild(dot);
        });
    }

    // --- SWIPE HANDLING ---
    // This logic is the same as the one I provided in the previous update
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

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
        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                currentMenuIndex = (currentMenuIndex - 1 + allMenusData.length) % allMenusData.length;
            } else {
                currentMenuIndex = (currentMenuIndex + 1) % allMenusData.length;
            }
            searchInput.value = '';
            displayCurrentMenu();
        }
    }

    // --- SEARCH FUNCTIONALITY ---
    // This listener is the same as the one I provided in the previous update
    searchInput.addEventListener('input', (e) => {
        if (!allMenusData || allMenusData.length === 0) return; // Don't search if no data
        displayCurrentMenu(e.target.value);
    });

    // Note: Initial call to displayCurrentMenu() is now inside the .then() block of the fetch call.
});
