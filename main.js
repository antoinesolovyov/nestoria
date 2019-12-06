import { InputComponent } from "./components/InputComponent.js";
import { ListComponent } from "./components/ListComponent.js";

let listComponent;

const inputComponent = new InputComponent();
inputComponent.render(document.body);

const listAnchor = document.createElement("div");
const paginationAnchor = document.createElement("div");
document.body.append(listAnchor);
document.body.append(paginationAnchor)

const loadMoreButton = document.createElement("button");
loadMoreButton.innerText = "load more";
document.body.append(loadMoreButton);

let page = 1;
let placeName = "";

inputComponent.button.onclick = () => {

    placeName = inputComponent.input.value;

    if (placeName) getRequest(placeName);

    return false;
};

loadMoreButton.onclick = () => {
    console.log("load more button");

    loadMore(placeName);
};

function loadMore(placeName) {
    page++;

    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let targetUrl = `https://api.nestoria.co.uk/api?page=${page}&encoding=json&action=search_listings&place_name="${placeName}"`;

    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(json => {
            listComponent.add(json.response.listings);
            console.log(json.response.listings, listComponent.count);
            listComponent.render(listAnchor);
        })
        .catch(error => {
            console.log("error: ", error);
        });
}

function getRequest(placeName) {

    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let targetUrl = `https://api.nestoria.co.uk/api?page=${page}&encoding=json&action=search_listings&place_name="${placeName}"`;

    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(json => {
            listComponent = new ListComponent(json.response.listings);
            listComponent.render(listAnchor);
        })
        .catch(error => {
            console.log("error: ", error);
        });
}


