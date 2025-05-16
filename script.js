document.addEventListener('DOMContentLoaded', function() {
    let allMenusData = [];
    let currentMenuIndex = 0;

    const menuContainer = document.getElementById('menu-container');
    const mainMenuNavBar = document.getElementById('category-nav'); // Uses 'category-nav' ID
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
                displayCurrentMenu();            // Display the first menu (will fade in)
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

    // --- 4. DISPLAY CURRENT MENU (Handles Animations
