export class ItemObject {
    constructor(json) {
        this.imgUrl = json.img_url;
        this.title = json.title;
        this.summary = json.summary;
        this.priceFormatted = json.price_formatted;

        this.bathroomNumber = json.bathroom_number;
        this.bedroomNumber = json.bedroom_number;
        this.keywords = json.keywords;
    }
}
