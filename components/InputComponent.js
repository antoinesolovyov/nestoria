export class InputComponent {
    constructor() {
        this.input = document.createElement("input");
        this.input.placeholder = "Input place name...";
        this.button = document.createElement("button");
        this.button.innerText = "Search";
        this.form = document.createElement("form");
        this.form.append(this.input, this.button);
    }

    render(anchor) {
        anchor.append(this.form);
    }
}
