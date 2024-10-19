const axios = require('axios');

async function getPopularRepositories() {
    const url = 'https://api.github.com/search/repositories?q=stars:>10000&sort=stars';
    try {
        const response = await axios.get(url);
        const repositories = response.data.items;
        return repositories; // This contains the most popular repositories
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

getPopularRepositories().then(repos => {
    console.log(repos);
});
