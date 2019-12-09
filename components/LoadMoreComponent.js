export class LoadMoreComponent {
    constructor(anchor) {
        this.loadMoreButton = document.createElement("button");
        this.loadMoreButton.innerText = "load more";
        this.loadMoreButton.style.margin = "16px";

        this.anchor = anchor;
    }

    render() {
        this.anchor.append(this.loadMoreButton);
    }
}
