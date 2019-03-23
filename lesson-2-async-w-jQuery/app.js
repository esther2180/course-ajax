/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // const unsplashRequest = new XMLHttpRequest();
        // unsplashRequest.onload = addImage;
        // unsplashRequest.onerror = function(err) {
        //     requestError(err, 'image');
        // };
        // unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        // unsplashRequest.setRequestHeader('Authorization', 'Client-ID bcf103822cdfc8aa4e2862dfaac2ab3980c9ded39e57bd8ecae6a7ea187d5f41');
        // unsplashRequest.send();

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID bcf103822cdfc8aa4e2862dfaac2ab3980c9ded39e57bd8ecae6a7ea187d5f41'}
            }).done(addImage);

        // const articleRequest = new XMLHttpRequest();
        // articleRequest.onload = addArticles;
        // articleRequest.onerror = function(err) {
        //     requestError(err, 'articles');
        // };
        // articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1rx3Rf1IjHeLk1MmuqaSZY3rSQoTqcky`);
        // articleRequest.send();

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1rx3Rf1IjHeLk1MmuqaSZY3rSQoTqcky`,
            }).done(addArticles);
    });


        function addImage(data) {
            // const firstImage = images.results[0];

            if (data && data.results && data.results[0]) {
                const firstImage = data.results[0];
                htmlContent = `<figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            } else {
                htmlContent = '<div class="error-no-image">NO images available</div>';
            }
    
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        };


        function addArticles(data) {
            if (data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>`
                ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No articles available</div>';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent)
        }
    

        
        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning error-${part}">Sorry, there was an error making a request for the ${part}.</p>`);
        };
        
})();



