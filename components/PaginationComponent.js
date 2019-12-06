export class PaginationComponent {
    constructor(objects, anchor, r, a) {
        this.currentPage = 1;
        this.totalPages = objects.total_pages;

        this.ul = document.createElement("ul");
        this.ul.className = "pagination";

        for (let i = 0; i < this.totalPages; i++) {
            let li = document.createElement("li");
            li.innerText = i + 1;
            li.addEventListener("click", () => {
               // li.style.background = "white";
                this.currentPage = i + 1;
                r(a);
                this.render();
            });
            this.ul.append(li);
        }

        this.anchor = anchor;
        
    }

    render() {

        let qs = this.ul.querySelectorAll("li");
        
        for (let i = 0; i < qs.length; i++) {
            if (i == this.currentPage - 1) {
                console.log(qs);
                qs[i].style.background = "white";
            } else {
                qs[i].style.background = "red";
            }
        }

        this.anchor.innerHTML = "";
        this.anchor.append(this.ul);
    }
}