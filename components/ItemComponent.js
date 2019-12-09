import { ModalComponent } from "./ModalComponent.js";

export class ItemComponent {
    constructor(itemObject) {
        this.imgDiv = document.createElement("div");
        this.imgDiv.className = "img";
        this.imgDiv.innerHTML = `
            <img src="${itemObject.imgUrl}">
        `;

        this.descriptionDiv = document.createElement("div");
        this.descriptionDiv.className = "description";
        this.descriptionDiv.innerHTML = `
            <p><b>${itemObject.title}</b></p>
            <p><i>${itemObject.summary}</i></p>
            <p><b>${itemObject.priceFormatted}</b></p>
        `;

        this.itemDiv = document.createElement("div");
        this.itemDiv.append(this.imgDiv, this.descriptionDiv);

        // modal event
        this.itemDiv.addEventListener("click", () => {
            const modal = new ModalComponent(itemObject);

            modal.modalElement.addEventListener("click", () => {
                document.body.removeChild(modal.modalElement);
            });
            
            document.body.append(modal.modalElement);
        });

        this.addDiv = document.createElement("div");
        this.addDiv.className = "add";
        this.addDiv.style.cursor = "pointer";
        this.addDiv.innerHTML = `
            <img src="icons/heart.svg">
        `;

        this.itemElement = document.createElement("li");
        this.itemElement.append(this.itemDiv, this.addDiv);

        this.isFavorite = itemObject.isFavorite;
    }
}
