document.addEventListener('DOMContentLoaded', function() {
    // --- 1. ALL MENU DATA ---
    // Your existing menuData is now the 'categories' for the "Main Menu"
    const allMenusData = [
        {
            name: "Main Menu",
            categories: [
                {
                    category: "Crown Jewels",
                    id: "crown-jewels",
                    items: [
                        { name: "Black Widow", description: "1 g", price: "€7.00" }
                    ]
                },
                {
                    category: "Edel Weeds",
                    id: "edel-weeds",
                    items: [
                        { name: "Blue", description: "2 g", price: "€15.00" },
                        { name: "Green", description: "10 g", price: "€20.00" },
                        { name: "Blend", description: "20 g", price: "€30.00" }
                    ]
                },
                {
                    category: "Extracten",
                    id: "extracten",
                    items: [
                        { name: "Sensy - Zero Zero", description: "1 g", price: "€14.50" },
                        { name: "Sensy - Zero Zero", description: "2 g", price: "€26.00" },
                        { name: "King Kush - RED", description: "3 g", price: "€24.20" },
                        { name: "King Kush - GREEN", description: "3 g", price: "€24.20" },
                        { name: "King Kush - ICE", description: "3 g", price: "€24.20" },
                        { name: "King Kush - TERP", description: "3 g", price: "€24.20" },
                        { name: "King Kush - CRUMBLE", description: "3 g", price: "€24.20" }
                    ]
                },
                {
                    category: "Hempster Life",
                    id: "hempster-life",
                    items: [
                        { name: "Bubblegum", description: "2 g", price: "€24.90" },
                        { name: "Bubba Koi", description: "2 g", price: "€21.90" },
                        { name: "Caramel Candy", description: "2 g", price: "€24.90" },
                        { name: "Gorilla Glue", description: "2 g", price: "€21.90" },
                        { name: "Harley Queen", description: "2 g", price: "€24.90" },
                        { name: "Strawberry", description: "2 g", price: "€24.90" }
                    ]
                },
                {
                    category: "Jane's Garden",
                    id: "janes-garden",
                    items: [
                        { name: "Blueberry", description: "2 g", price: "€26.00" },
                        { name: "Buddha Cheese", description: "2 g", price: "€26.00" },
                        { name: "Gelato", description: "5 g", price: "€62.50" },
                        { name: "Sour Lemon", description: "5 g", price: "€57.50" },
                        { name: "Super Silver Haze", description: "2 g", price: "€26.00" },
                        { name: "Super Silver Haze", description: "5 g", price: "€57.50" },
                        { name: "White Widow", description: "2 g", price: "€26.00" }
                    ]
                },
                {
                    category: "King Kush",
                    id: "king-kush",
                    items: [
                        { name: "Caramello", description: "2 g", price: "€26.00" },
                        { name: "Caramello", description: "4 g", price: "€50.00" },
                        { name: "Chocolope", description: "2 g", price: "€26.00" },
                        { name: "Chocolope", description: "4 g", price: "€50.00" },
                        { name: "Critical Kush", description: "2 g", price: "€26.00" },
                        { name: "Critical Kush", description: "4 g", price: "€50.00" },
                        { name: "Lemon Haze", description: "2 g", price: "€26.00" },
                        { name: "SoMango", description: "2 g", price: "€21.90" },
                        { name: "SoMango", description: "4 g", price: "€40.00" },
                        { name: "Super Skunk", description: "2 g", price: "€26.00" },
                        { name: "Super Skunk", description: "4 g", price: "€50.00" },
                        { name: "Lemon Haze", description: "1 g", price: "€15.00" },
                        { name: "Lemon Haze", description: "5 g", price: "€62.50" }
                    ]
                },
                {
                    category: "Sensy",
                    id: "sensy",
                    items: [
                        { name: "Blueberry", description: "2 g", price: "€21.90" },
                        { name: "Cali", description: "5 g", price: "€20.00" },
                        { name: "Cali", description: "3 g", price: "€14.00" },
                        { name: "OG Kush", description: "2 g", price: "€19.90" },
                        { name: "Super Haze", description: "2 g", price: "€19.90" },
                        { name: "Super Haze", description: "1 g", price: "€10.00" },
                        { name: "Vanilla Kush", description: "2 g", price: "€21.90" },
                        { name: "Weedy", description: "5 g", price: "€20.00" },
                        { name: "Weedy", description: "3 g", price: "€14.00" },
                        { name: "Grass", description: "15 g", price: "€19.90" },
                        { name: "Blend", description: "20 g", price: "€35.00" }
                    ]
                },
                {
                    category: "Spek",
                    id: "spek",
                    items: [
                        { name: "Hawaiian Snow", description: "3 g", price: "€24.20" },
                        { name: "Kosher Kush", description: "3 g", price: "€24.20" },
                        { name: "Skywalker OG", description: "3 g", price: "€24.20" }
                    ]
                }
            ]
        },
        {
            name: "Grinders",
            categories: [
                {
                    category: "Metal Grinders", id: "metal-grinders", items: [
                        { name: "Small Metal Grinder", description: "2-part", price: "€10.00" },
                        { name: "Large Metal Grinder", description: "4-part with kief catcher", price: "€25.00" }
                    ]
                },
                {
                    category: "Plastic Grinders", id: "plastic-grinders", items: [
                        { name: "Basic Plastic Grinder", description: "Assorted colors", price: "€5.00" }
                    ]
                }
                // Add more categories and items for Grinders here
            ]
        },
        {
            name: "Bongs & Pipes",
            categories: [
                {
                    category: "Glass Bongs", id: "glass-bongs", items: [
                        { name: "Mini Glass Bong", description: "15cm height", price: "€30.00" },
                        { name: "Percolator Bong", description: "Smooth hits", price: "€75.00" }
                    ]
                },
                {
                    category: "Pipes", id: "pipes", items: [
                        { name: "Wooden Pipe", description: "Classic design", price: "€12.00" },
                        { name: "Metal Pipe", description: "Durable", price: "€10.00" }
                    ]
                }
                // Add more categories and items for Bongs & Pipes here
            ]
        },
        {
            name: "CBD Oils & Cosmetics",
            categories: [
                {
                    category: "CBD Oils", id: "cbd-oils", items: [
                        { name: "CBD Oil 5%", description: "10ml bottle", price: "€20.00" },
                        { name: "CBD Oil 10%", description: "10ml bottle", price: "€35.00" }
                    ]
                },
                {
                    category: "CBD Cosmetics", id: "cbd-cosmetics", items: [
                        { name: "CBD Face Cream", description: "Soothing and moisturizing", price: "€28.00" },
                        { name: "CBD Lip Balm", description: "For dry lips", price: "€8.00" }
                    ]
                }
                // Add more categories and items for CBD products here
            ]
        }
    ];

    let currentMenuIndex = 0;

    const menuContainer = document.getElementById('menu-container');
    const categoryNav = document.getElementById('category-nav');
    const searchInput = document.getElementById('searchInput');
    const menuTitleElement = document.getElementById('menu-title'); // Make sure this ID exists in your H1 tag
    const menuIndicatorsContainer = document.getElementById('menu-indicators'); // Make sure this div exists in your HTML

    // --- RENDER CURRENT MENU AND CATEGORIES ---
    function displayCurrentMenu(filterText = '') {
        menuContainer.classList.add('loading'); // For fade effect

        setTimeout(() => {
            const currentMenu = allMenusData[currentMenuIndex];
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
                        item.description.toLowerCase().includes(normalizedFilterText)
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
                                filterText === '' || // Show all if no filter
                                item.name.toLowerCase().includes(normalizedFilterText) ||
                                item.description.toLowerCase().includes(normalizedFilterText)
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
                        if (!filterText || categoryHasVisibleItemsInSearch) {
                           categoryNav.appendChild(categoryButton);
                        }
                    } else if (!filterText && (!category.items || category.items.length === 0)) {
                        // Category is genuinely empty, show message and button
                        categorySection.innerHTML += '<p>No items in this category.</p>';
                        menuContainer.appendChild(categorySection);
                        categoryNav.appendChild(categoryButton);
                    } else if (filterText && itemsRenderedInCategory === 0 && categoryHasVisibleItemsInSearch) {
                        // This case should ideally not happen if categoryHasVisibleItemsInSearch is true
                        // But if it means there were items but filter hid all, still show button
                         categoryNav.appendChild(categoryButton);
                    } else if (!filterText && itemsRenderedInCategory === 0 && category.items && category.items.length > 0) {
                        // If not filtering, but somehow all items got filtered out from a non-empty category
                        // (This condition might be redundant with current logic but kept for robustness)
                        categorySection.innerHTML += '<p>No items currently match criteria in this category.</p>';
                        menuContainer.appendChild(categorySection);
                        categoryNav.appendChild(categoryButton);
                    }


                    // If category nav button needs to be displayed even if empty (when not filtering)
                    if (!filterText && itemsRenderedInCategory === 0) {
                        const existingButton = Array.from(categoryNav.children).find(btn => btn.getAttribute('data-category-id') === category.id);
                        if (!existingButton) {
                            categoryNav.appendChild(categoryButton); // Add if not already added
                        }
                    }

                });
            }

            if (!hasVisibleItemsOverall && filterText) {
                menuContainer.innerHTML = '<p>No items match your search in this menu.</p>';
                // Repopulate categoryNav for the current menu if search yields no results.
                categoryNav.innerHTML = ''; // Clear previous
                currentMenu.categories.forEach(cat => {
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
        }, 150); // Corresponds to half of a 0.3s opacity transition
    }

    // --- UPDATE MENU INDICATORS ---
    function updateMenuIndicators() {
        if (!menuIndicatorsContainer) return;
        menuIndicatorsContainer.innerHTML = '';
        allMenusData.forEach((menu, index) => {
            const dot = document.createElement('span');
            dot.classList.add('indicator-dot');
            if (index === currentMenuIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentMenuIndex = index;
                searchInput.value = ''; // Clear search on menu change
                displayCurrentMenu();
            });
            menuIndicatorsContainer.appendChild(dot);
        });
    }

    // --- SWIPE HANDLING ---
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
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) { // Swipe Right (previous menu)
                currentMenuIndex = (currentMenuIndex - 1 + allMenusData.length) % allMenusData.length;
            } else { // Swipe Left (next menu)
                currentMenuIndex = (currentMenuIndex + 1) % allMenusData.length;
            }
            searchInput.value = ''; // Clear search on menu change
            displayCurrentMenu();
        }
    }

    // --- SEARCH FUNCTIONALITY ---
    searchInput.addEventListener('input', (e) => {
        displayCurrentMenu(e.target.value);
    });

    // --- INITIAL LOAD ---
    displayCurrentMenu(); // Load the first menu initially
});
