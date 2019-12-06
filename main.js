import { InputComponent } from "./components/InputComponent.js";
import { ListComponent } from "./components/ListComponent.js";

const inputComponent = new InputComponent();
inputComponent.render(document.body);

const anchor = document.createElement("div");

document.body.append(anchor);

let page = 1;

inputComponent.button.onclick = () => {
    const placeName = inputComponent.input.value;
    if (placeName) {
        console.log("Input value:", placeName);

        anchor.innerHTML = "";

        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const targetUrl = `https://api.nestoria.co.uk/api?page=${page}&encoding=json&action=search_listings&place_name="${placeName}"`;

        fetch(proxyUrl + targetUrl)
            .then(response => response.json())
            .then(json => {
                console.log(json.response.listings);
                const listComponent = new ListComponent(json.response.listings);
                listComponent.render(anchor);
            })
            .catch(error => {
                console.log("error: ", error);
            });
    }

    return false;
};
