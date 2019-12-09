import { InputComponent } from "./components/InputComponent.js";
import { ListComponent } from "./components/ListComponent.js";
//import { LoadMoreComponent } from "./components/LoadMoreComponent.js";
import { ListObject } from "./objects/ListObject.js";
import { ItemObject } from "./objects/ItemObject.js";
import { PaginationComponent } from "./components/PaginationComponent.js";

const inputAnchor = document.createElement("div");
const listAnchor = document.createElement("div");
const loadMoreAnchor = document.createElement("div");
const paginationAnchor = document.createElement("div");


document.body.append(inputAnchor, listAnchor, loadMoreAnchor, paginationAnchor);

const inputComponent = new InputComponent(inputAnchor);
const listComponent = new ListComponent(listAnchor);
//const loadMoreComponent = new LoadMoreComponent(loadMoreAnchor);
const paginationComponent = new PaginationComponent(paginationAnchor);

inputComponent.render();

const ul = document.createElement("ul");









let favoriteIsClick = false;
inputComponent.favorite.onclick = () => {
    if (!favoriteIsClick) {
        inputComponent.favorite.style.background = "red";
        listComponent.renderFavorite();
  //      loadMoreComponent.loadMoreButton.style.display = "none";
        favoriteIsClick = true;
    } else {
        inputComponent.favorite.style.background = "white";
        listComponent.render();
  //      loadMoreComponent.loadMoreButton.style.display = "block";
        favoriteIsClick = false;
    }
};

const listObject = new ListObject();
let page = 1;
inputComponent.button.onclick = () => {
    page = 1;
    listObject.listObject = [];
    inputComponent.favorite.style.background = "white";
    favoriteIsClick = false;

    let placeName = inputComponent.input.value;
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

            const totalPages = json.total_pages;

            ul.innerHTML = "";
            const liArray = [];

            for (let i = 0; i < totalPages; i++) {
                liArray[i] = document.createElement("li");
                liArray[i].className = "paginationLi";
                liArray[i].innerText = i + 1;

                liArray[i].addEventListener("click", () => {

                    liArray[i].style.background = "red";
                    liArray[page - 1].style.background = "white";

                    page = i + 1;

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
                });

                ul.append(liArray[i]);
            }

        liArray[page - 1].style.background = "red";

            document.body.append(ul);
        });
        

        
    }


/*
    // loadmore click
    loadMoreComponent.loadMoreButton.onclick = () => {
        console.log("load more button");
        page++;

        getRequest(placeName);
    };
*/

   //     loadMoreComponent.render();

    return false;
};

async function getResponse(placeName) {
    const url = `https://api.nestoria.co.uk/api?page=${page}&encoding=json&action=search_listings&place_name=${placeName}`;

    const response = await fetch(url);
    const json = await response.json();

    console.log("Response:", json.response);

    return json.response;
}