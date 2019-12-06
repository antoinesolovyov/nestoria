export class ListComponent {
    constructor(objects) {
        this.ul = document.createElement("ul");

        for (let i = 0; i < objects.length; i++) {
            let li = document.createElement("li");

            li.innerHTML = `
                <img src="${objects[i].img_url}">
                
                    <p><b>${objects[i].title}</b></p>
                    <p>${objects[i].summary}</p>
                    <p><strong>${objects[i].price_formatted}</strong></p>
            `;

            this.ul.append(li);
        }
    }

    render(anchor) {
        anchor.append(this.ul);
    }
}
