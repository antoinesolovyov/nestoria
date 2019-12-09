export class PaginationComponent {
    constructor(anchor) {
        this.anchor = anchor;
    }

    set props(props) {
        this.properties = props;
        this.render();
    }

    render() {
        const page = this.properties.page;
        const totalPages = this.total_pages;

        const ul = document.createElement("ul");

        const liArray = [];

        for (let i = 0; i < 5; i++) {
            liArray[i] = document.createElement("li");
            liArray[i].className = "paginationLi";
            liArray[i].innerText = i + 1;



            ul.append(liArray[i]);
        }

        this.anchor.append(ul);
    }
}