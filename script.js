const API_KEY = "pub_389259d34fc9ad3b9f368e724b389ebb259b8";
const url = "https://newsdata.io/api/1/news?";

window.addEventListener("load", () => fetchNews("pegasus"));

async function fetchNews(query) {
    const res = await fetch(`${url}apikey=${API_KEY}&q=${query}&language=en`);
    const data = await res.json();
    console.log(data.results);
    bindData(data.results);
}

function bindData(results){
    const  cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = " ";
    console.log("sucess 0");
    results.forEach(article => {
        if(!article.image_url) return;
        console.log("sucess 1");
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image_url;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    // const date = new Date(article.published_at).toLocaleString("en-US",{
    //     timeZone:"Asia/Jakarta"
    // });
    const date = article.pubDate;
    newsSource.innerHTML = `${article.source_id} - ${date}`;
    cardClone.firstElementChild.addEventListener("click",() => {
        window.open(article.link,"_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function reload(){
    window.location.reload();
}
