document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.getElementById('menu-container');
    const menuTitleElement = document.getElementById('menu-title'); // Uses the h1 tag

    // Clear previous content for testing
    if(menuContainer) menuContainer.innerHTML = '';
    if(menuTitleElement) menuTitleElement.textContent = 'Attempting to Load Menu...';

    console.log('TEST SCRIPT: DOMContentLoaded, starting fetch for menu-data.json');

    fetch('menu-data.json')
        .then(response => {
            console.log('TEST SCRIPT: Fetch response received. Status:', response.status);
            if (!response.ok) {
                console.error('TEST SCRIPT: Network response was NOT ok.', response);
                // Attempt to get text even on error to see if it's an HTML error page
                return response.text().then(text => {
                    console.error('TEST SCRIPT: Error response text:', text);
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Response body (text): ${text.substring(0, 200)}...`);
                });
            }
            console.log('TEST SCRIPT: Network response OK. Attempting to parse JSON.');
            return response.json();
        })
        .then(data => {
            console.log('TEST SCRIPT: JSON parsed successfully. Data:', data);
            if (menuTitleElement) {
                menuTitleElement.textContent = 'Menu Data Loaded Successfully!';
            }
            if (menuContainer) {
                if (data && data.length > 0) {
                    menuContainer.innerHTML = `<p>Found ${data.length} menu(s) in menu-data.json:</p><ul>`;
                    data.forEach(menu => {
                        menuContainer.innerHTML += `<li>${menu.name || 'Unnamed Menu'}</li>`;
                    });
                    menuContainer.innerHTML += `</ul>`;
                } else {
                    menuContainer.innerHTML = '<p>Menu data loaded, but it seems to be empty or not in the expected array format.</p>';
                    console.warn('TEST SCRIPT: Data received but not in expected format or empty:', data);
                }
            }
        })
        .catch(error => {
            console.error('TEST SCRIPT: CATCH BLOCK - Error fetching or parsing menu data:', error.message, error);
            if (menuTitleElement) {
                menuTitleElement.textContent = 'Error Loading Menu!';
            }
            if (menuContainer) {
                menuContainer.innerHTML = `<p><strong>Failed to load menu data.</strong> Please check the browser console for more details.</p><p>Error message: ${error.message}</p>`;
            }
        });

    console.log('TEST SCRIPT: Fetch initiated. Script execution continues...');
});
