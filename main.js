import { InputComponent } from "./components/InputComponent.js";
import { ListComponent } from "./components/ListComponent.js";
import { PaginationComponent } from "./components/PaginationComponent.js";
import { ListObject } from "./objects/ListObject.js";
import { ItemObject } from "./objects/ItemObject.js";

const inputComponent = new InputComponent();
const listAnchor = document.createElement("div");
const listComponent = new ListComponent(listAnchor);
let paginationComponent;
const listObject = new ListObject();

let page = 1;

inputComponent.render(document.body);
document.body.append(listAnchor);

// button search click
inputComponent.button.onclick = () => {
    page = 1;
    listObject.listObject = [];
    inputComponent.favorite.style.background = "white";

    let placeName = inputComponent.input.value;
    if (placeName) getRequest(placeName);

    /*
    // pagination click
    paginationComponent.loadMoreButton.onclick = () => {
        console.log("load more button");
        page++;

        getRequest(placeName);
    
        favoriteIsClick = false;

        paginationComponent.render();
    
        return false;
    };
    */

    return false;
};

async function getRequest(placeName) {
    const url = `https://api.nestoria.co.uk/api?page=${page}&encoding=json&action=search_listings&place_name=${placeName}`;

    const response = await fetch(url);
    const json = await response.json();

    for (const listing of json.response.listings) {
        listObject.push(new ItemObject(listing));
    }

    console.log("Response:", json.response);

    listComponent.add(listObject);
    listComponent.render();

    favoriteIsClick = false;

    paginationComponent = new PaginationComponent(document.body, json.response);
    paginationComponent.render();
}

let favoriteIsClick = false;
inputComponent.favorite.onclick = () => {
    console.log("Favorite onclick");

    if (!favoriteIsClick) {
        inputComponent.favorite.style.background = "red";
        listComponent.renderFavorite();
        favoriteIsClick = true;
    } else {
        inputComponent.favorite.style.background = "white";
        listComponent.render();
        favoriteIsClick = false;
    }
}
