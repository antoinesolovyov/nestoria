import { InputComponent } from "./components/InputComponent.js";
import { ListComponent } from "./components/ListComponent.js";
import { LoadMoreComponent } from "./components/LoadMoreComponent.js";
import { ListObject } from "./objects/ListObject.js";
import { ItemObject } from "./objects/ItemObject.js";

const inputAnchor = document.createElement("div");
const listAnchor = document.createElement("div");
const loadMoreAnchor = document.createElement("div");
const paginationAnchor = document.createElement("div");

document.body.append(inputAnchor, listAnchor, loadMoreAnchor, paginationAnchor);

const inputComponent = new InputComponent(inputAnchor);
const listComponent = new ListComponent(listAnchor);
const loadMoreComponent = new LoadMoreComponent(loadMoreAnchor);

inputComponent.render();

const ul = document.createElement("ul");
let liArray = [];
let placeName;

// favorites button click
let favoriteIsClicked = false;

inputComponent.favorite.onclick = () => {
    if (!favoriteIsClick) {
        inputComponent.favorite.style.background = "red";
        listComponent.renderFavorite();
        loadMoreComponent.loadMoreButton.style.display = "none";
        ul.style.display = "none";
        favoriteIsClicked = true;
    } else {
        inputComponent.favorite.style.background = "white";
        listComponent.render();
        loadMoreComponent.loadMoreButton.style.display = "block";
        ul.style.display = "block";
        favoriteIsClicked = false;
    }
};

// input search click
const listObject = new ListObject();
let page = 1;
let totalPages;

inputComponent.button.onclick = () => {
    page = 1;
    listObject.listObject = [];
    inputComponent.favorite.style.background = "white";
    favoriteIsClick = false;

    placeName = inputComponent.input.value;
    if (placeName) {
        const json = getResponse(placeName);

        json.then(json => {
            if (
                json.application_response_code >= 100 &&
                json.application_response_code < 200
            ) {
                for (const listing of json.listings) {
                    listObject.push(new ItemObject(listing));
                }

                listComponent.onInit(listObject);
                listComponent.render();
            }

            // pagination
            totalPages = json.total_pages;
            ul.innerHTML = "";
            liArray = [];

            if (totalPages <= 5) {
                pagination(1, totalPages, totalPages);
            } else {
                pagination(1, 5, totalPages);
            }

            document.body.append(ul);
        });
    }

    // loadmore click
    loadMoreComponent.loadMoreButton.onclick = () => {
        page++;

        const json = getResponse(placeName);

        json.then(json => {
            if (
                json.application_response_code >= 100 &&
                json.application_response_code < 200
            ) {
                for (const listing of json.listings) {
                    listObject.push(new ItemObject(listing));
                }

                listComponent.onInit(listObject);
                listComponent.render();
            }
        });

        if (page == totalPages)
            loadMoreComponent.loadMoreButton.style.display = "none";
    };

    loadMoreComponent.render();

    return false;
};

function pagination(left, right, totalPages) {
    ul.innerHTML = "";

    for (let i = left; i <= right; i++) {
        liArray[i] = document.createElement("li");
        liArray[i].className = "paginationLi";
        liArray[i].innerText = i;

        liArray[i].addEventListener("click", () => {
            liArray[i].style.background = "red";
            liArray[page].style.background = "white";

            page = i;
            const json = getResponse(placeName);

            json.then(json => {
                if (
                    json.application_response_code >= 100 &&
                    json.application_response_code < 200
                ) {
                    listObject.listObject = [];

                    for (const listing of json.listings) {
                        listObject.push(new ItemObject(listing));
                    }

                    listComponent.onInit(listObject);
                    listComponent.render();
                }
            });

            if (page <= 3) {
                if (totalPages <= 5) {
                    pagination(1, totalPages, totalPages);
                } else {
                    pagination(1, 5, totalPages);
                }
            } else if (page >= totalPages - 2) {
                pagination(totalPages - 4, totalPages, totalPages);
            } else if (i == right - 1) {
                pagination(left + 1, right + 1, totalPages);
            } else if (i == right) {
                pagination(left + 2, right + 2, totalPages);
            } else if (i == left + 1) {
                pagination(left - 1, right - 1, totalPages);
            } else if (i == left) {
                pagination(left - 2, right - 2, totalPages);
            }
        });

        liArray[page].style.background = "red";

        ul.append(liArray[i]);
    }
}

async function getResponse(placeName) {
    const url = `https://api.nestoria.co.uk/api?page=${page}&encoding=json&action=search_listings&place_name=${placeName}`;

    const response = await fetch(url);
    const json = await response.json();

    return json.response;
}
