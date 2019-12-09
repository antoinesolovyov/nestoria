export class ListObject {
    constructor() {
        this.listObject = [];
        this.favoriteListObject = [];
    }

    push(itemObject) {
        for (let i = 0; i < this.favoriteListObject.length; i++) {
            if (
                this.favoriteListObject[i].title == itemObject.title &&
                this.favoriteListObject[i].summary == itemObject.summary &&
                this.favoriteListObject[i].priceFormatted ==
                    itemObject.priceFormatted
            ) {
                itemObject.isFavorite = true;
            }
        }

        this.listObject.push(itemObject);
    }

    pushFavorite(itemObject) {
        this.favoriteListObject.push(itemObject);
    }

    popFavorite(itemObject) {
        const idx = this.favoriteListObject.indexOf(itemObject);
        this.favoriteListObject.splice(idx, 1);
    }
}
