import { ItemComponent } from "./ItemComponent.js";

export class ListComponent {
    constructor(anchor) {
        this.ul = document.createElement("ul");
        this.ulFavorite = document.createElement("ul");

        this.anchor = anchor;
    }

    onInit(listObject) {
        this.ul.innerHTML = "";

        for (let i = 0; i < listObject.listObject.length; i++) {
            const item = new ItemComponent(listObject.listObject[i]);

            if (!item.isFavorite) {
                item.addDiv.style.background = "white";
            } else {
                item.addDiv.style.background = "red";
            }

            this.ul.append(item.itemElement);

            const favoriteItem = new ItemComponent(listObject.listObject[i]);
 
            // add event
            item.addDiv.addEventListener("click", () => {
                if (!item.isFavorite) {
                    this.ulFavorite.appendChild(favoriteItem.itemElement);
                    listObject.pushFavorite(listObject.listObject[i]);
                    
                    listObject.listObject[i].isFavorite = true;
                    item.isFavorite = true;

                    favoriteItem.addDiv.style.background = "red";
                    item.addDiv.style.background = "red";
                    
                } else {
                    this.ulFavorite.removeChild(favoriteItem.itemElement);
                    listObject.popFavorite(listObject.listObject[i]);
                    
                    listObject.listObject[i].isFavorite = false;
                    item.isFavorite = false;

                    item.addDiv.style.background = "white";
                }

                favoriteItem.addDiv.addEventListener("click", () => {
                    this.ulFavorite.removeChild(favoriteItem.itemElement);
                    listObject.popFavorite(listObject.listObject[i]);

                    item.addDiv.style.background = "white";
                    
                    listObject.listObject[i].isFavorite = false;
                    item.isFavorite = false;

                    this.renderFavorite();
                });
            });
        }
    }

    render() {
        this.anchor.innerHTML = "";
        this.anchor.append(this.ul);
    }

    renderFavorite() {
        this.anchor.innerHTML = "";
        this.anchor.append(this.ulFavorite);
    }
}
