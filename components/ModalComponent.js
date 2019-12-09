export class ModalComponent {
    constructor(itemObject) {
        this.modalElement = document.createElement("div");
        this.modalElement.innerHTML = `
            <div class="modal">
                <div class="modalDiv">
                    <div class="descriptionModal">
                        <p><b>${itemObject.title}</b></p>
                        <p><i>${itemObject.summary}</i></p>
                        <p><b>${itemObject.priceFormatted}</b></p>
                        <p>Bathroom number: <b>${itemObject.bathroomNumber}</b></p>
                        <p>Bedroom number: <b>${itemObject.bedroomNumber}</b></p>
                        <p><b>${itemObject.keywords}</b></p>
                    </div>
                    <div class="imgModal">
                        <img src="${itemObject.imgUrl}">
                    </div>
                    <div class="addModal">
                        <img src="icons/heart.svg">
                    </div>
                </div>
            </div>
        `;

        this.isFavorite = itemObject.isFavorite;
    }
}
