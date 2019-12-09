export class PaginationComponent {
    constructor(anchor, json) {
  //      this.loadMoreButton = document.createElement("button");
  //      this.loadMoreButton.innerText = "load more";
  //      this.loadMoreButton.style.margin = "16px";

        this.ul = document.createElement("ul");
        this.ul.className = "paginationUl";

        this.liArr = [];

        this.page = json.page;
        this.totalPages = json.total_pages;

        if (this.totalPages < 5) {
            for (let i = 1; i <= this.totalPages; i++) {
                
                this.liArr[i] = document.createElement("li");
                this.liArr[i].className = "paginationLi";
                this.liArr[i].innerText = i;
                this.ul.append(this.liArr[i]);

                this.liArr[i].addEventListener("click", () => {
                    console.log(i);

                    
                });

                if (this.page == i) {
                    this.liArr[i].style.background = "red";
                }
            }
        } else {

            for (let i = 1; i <= 5; i++) {
                
                this.liArr[i] = document.createElement("li");
                this.liArr[i].className = "paginationLi";
                if (this.page > 2 && this.page < this.totalPages - 2)
                    this.liArr[i].innerText = this.page - 3 + i;
                else if (this.page == 1) {
                    this.liArr[i].innerText = i;
                } else if (this.page == 2) {
                    this.liArr[i].innerText = this.page - 2 + i;
                    this.liArr[i].style.background = "red";
                }

                this.ul.append(this.liArr[i]);

                if (this.page == i) {
                    this.liArr[i].style.background = "red";
                }
                
            }

            if (this.page == 1) {

            }
        }
        

        this.anchor = anchor;
    }

    onInit(choice) {
        if (choice) {
        }
    }

    render() {
        this.anchor.append(this.ul);
    }
}
