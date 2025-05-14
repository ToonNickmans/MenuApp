document.addEventListener('DOMContentLoaded', function() {
    const menuData = [
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
                { name: "Lemon Haze", description: "1 g", price: "€15.00" }, // Added this Lemon Haze variant here
                { name: "Lemon Haze", description: "5 g", price: "€62.50" }  // Added this Lemon Haze variant here
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
    ];

    const menuContainer = document.getElementById('menu-container');
    const categoryNav = document.getElementById('category-nav');
    const searchInput = document.getElementById('searchInput');

    function renderMenu(filterText = '') {
        menuContainer.innerHTML = ''; // Clear existing items
        categoryNav.innerHTML = ''; // Clear existing category buttons

        const normalizedFilterText = filterText.toLowerCase();
        let hasVisibleItemsOverall = false;

        menuData.forEach(category => {
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
            // Only add category button if it will have visible items or no filter is active
            let categoryHasVisibleItems = category.items.some(item =>
                item.name.toLowerCase().includes(normalizedFilterText) ||
                item.description.toLowerCase().includes(normalizedFilterText)
            );

            if (!filterText || categoryHasVisibleItems) {
                 categoryNav.appendChild(categoryButton);
            }

            const categorySection = document.createElement('div');
            categorySection.classList.add('category-section');
            categorySection.id = category.id;

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category.category;
            categorySection.appendChild(categoryTitle);

            let itemsRenderedInCategory = 0;
            category.items.forEach(item => {
                if (
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

            if (itemsRenderedInCategory > 0) {
                menuContainer.appendChild(categorySection);
            } else if (filterText && itemsRenderedInCategory === 0) {
                // If filtering and category has no matching items, don't add the section
                // It will be hidden anyway by not appending
            }
        });

         if (!hasVisibleItemsOverall && filterText) {
            menuContainer.innerHTML = '<p>No items match your search.</p>';
             // Clear category buttons if no items match at all during search
            categoryNav.innerHTML = '';
            // Re-add all category buttons if search yields no results, so user can click them.
            menuData.forEach(category => {
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
                categoryNav.appendChild(categoryButton);
            });
        }
    }

    searchInput.addEventListener('input', (e) => {
        renderMenu(e.target.value);
    });

    // Initial render
    renderMenu();
});