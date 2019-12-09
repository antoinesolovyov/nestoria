export class InputComponent {
    constructor() {
        this.button = document.createElement("button");
        this.button.innerText = "Search";
        this.button.style.cursor = "pointer";
        this.input = document.createElement("input");
        this.input.placeholder = "Input place name...";
        this.favorite = document.createElement("div");
        this.favorite.className = "favorite";
        this.favorite.style.cursor = "pointer";
        this.favoriteIcon = document.createElement("img");
        this.favoriteIcon.src = "icons/heart.svg";
        this.favorite.append(this.favoriteIcon);
        this.form = document.createElement("form");
        this.form.append(this.button, this.input, this.favorite);
    }

    render(anchor) {
        anchor.append(this.form);
    }
}
