function getArticleGenerator(articles) {
    const test = [];
    const obj = {
        articlesLeft: articles,
    }
    function showArticle(){
        if(this.articlesLeft.length > 0){
            const content = document.getElementById("content");
            const article = document.createElement('article');
            article.textContent = this.articlesLeft.shift();
            content.appendChild(article);
        }
        return;
    }
    return showArticle.bind(obj);
}

