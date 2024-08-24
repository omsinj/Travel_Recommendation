document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchBtn');
    const clearButton = document.getElementById('clearBtn');
    const searchBar = document.getElementById('search_box');
    const resultsContainer = document.getElementById('resultsContainer');

    searchButton.addEventListener('click', () => {
        const query = searchBar.value.toLowerCase().trim();

        if (query) {
            fetch('places.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const filteredResults = filterData(data, query);
                    displayResults(filteredResults);
                })
                .catch(error => console.log('Error fetching data:', error));
        }
    });

    clearButton.addEventListener('click', () => {
        searchBar.value = '';
        resultsContainer.innerHTML = '';  // Clear results on clear button click
        resultsContainer.style.display = 'none';
    });

    function filterData(data, query) {
        const results = [];

        // Search in countries and their cities
        data.countries.forEach(country => {
           
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(query)) {
                    results.push({
                        name: city.name,
                        imageUrl: city.imageUrl,
                        description: city.description
                    });
                }
            });
        });

        // Search in temples
        data.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(query)) {
                results.push({
                    name: temple.name,
                    imageUrl: temple.imageUrl,
                    description: temple.description
                });
            }
        });

        // Search in beaches
        data.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(query)) {
                results.push({
                    name: beach.name,
                    imageUrl: beach.imageUrl,
                    description: beach.description
                });
            }
        });

        return results;
    }

    function displayResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results
        resultsContainer.style.display = 'flex';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found</p>';
            return;
        }

        results.forEach(result => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = result.imageUrl;
            img.alt = result.name;

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const h2 = document.createElement('h2');
            h2.textContent = result.name;

            const p = document.createElement('p');
            p.textContent = result.description;

            const visitButton = document.createElement('a');
            visitButton.href = '#';
            visitButton.textContent = 'Visit';
            visitButton.classList.add('btn');

            cardContent.appendChild(h2);
            cardContent.appendChild(p);
            cardContent.appendChild(visitButton);

            card.appendChild(img);
            card.appendChild(cardContent);

            resultsContainer.appendChild(card);
        });
    }
});
