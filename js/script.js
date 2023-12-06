const myLibrary = []

class Book {
    constructor(bookTitle, authorName, pages, isRead) {
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.pages = pages;
        this.isRead = isRead;

        myLibrary.push(this)
    }

    static displayBooks() {
        const cardDisplay = document.querySelector(".card-display");
        
        myLibrary.forEach((book) => {
            const cardsTest = document.querySelectorAll(".card");

            let invalidBook = false;
            cardsTest.forEach((cardTest) => {
                if (cardTest.classList.contains(book.bookTitle.toString().replaceAll(" ", "-"))) {
                    invalidBook = true;
                    return
                }

            });


            if (invalidBook === true) {
                return
            }
            
            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add(book.bookTitle.toString().replaceAll(" ", "-"));


            const deleteButton = document.createElement('a');
            deleteButton.setAttribute("style","background-image: url('./images/remove.svg'); background-size: 40px 40px; display: inline-block; width: 40px; height: 40px; content: ''; cursor:pointer;");
            deleteButton.classList.add("delete-button")
            deleteButton.addEventListener("click", () => {
                card.remove();
            });

            const title = document.createElement("p");
            title.textContent = book.bookTitle;
            title.classList.add("book-title");

            const readButton = document.createElement('a');
            readButton.classList.add("read-button")

            readButton.addEventListener("click", () => {
                if (readButton.classList.contains("read")) {
                    readButton.setAttribute("style","background-image: url('./images/notRead.svg'); background-size: 40px 40px; display: inline-block; width: 40px; height: 40px; content: ''; cursor:pointer;");
                    readButton.classList.remove("read");
                    card.classList.remove("read")
                    readButton.setAttribute("title", "Click to mark as read!");
                } else {
                    readButton.classList.add("read");
                    card.classList.add("read");
                    readButton.setAttribute("style","background-image: url('./images/read.svg'); background-size: 40px 40px; display: inline-block; width: 40px; height: 40px; content: ''; cursor:pointer;");
                    readButton.setAttribute("title", "Click to mark as not read!");
                }
            
            });

            const author = document.createElement("p");
            author.textContent = book.authorName;
            author.classList.add("book-author");


            const pages = document.createElement("p");
            pages.textContent = book.pages;
            pages.classList.add("book-pages");

            if(book.isRead === true) {
                readButton.setAttribute("title", "Click to mark as not read!");
                readButton.classList.add("read");
                card.classList.add("read");
                readButton.setAttribute("style","background-image: url('./images/read.svg'); background-size: 40px 40px; display: inline-block; width: 40px; height: 40px; content: ''; cursor:pointer;");

            } else {
                readButton.setAttribute("title", "Click to mark as read!");

                readButton.setAttribute("style","background-image: url('./images/notRead.svg'); background-size: 40px 40px; display: inline-block; width: 40px; height: 40px; content: ''; cursor:pointer;");

            }


            card.append(deleteButton, title, readButton, author, pages);

            cardDisplay.appendChild(card);
        });

    }
}

const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", () => {
    const bookTitle = document.querySelector("#book-title");
    const authorName = document.querySelector("#author-name");
    const pages = document.querySelector("#book-pages");
    const isRead = document.querySelector("#is-read");

    let bookValid = true;

    const bookValidator = [];
    bookValidator.push(bookTitle, authorName, pages, isRead);
    bookValidator.forEach((element) => {
        if (element.value === "") {
            bookValid = false;
        }
    });

    if (bookValid === true) {
        const newBook = new Book(bookTitle.value, authorName.value, pages.value, isRead.checked)
        
        // Used to avoid HTML validation bug.
        
        setTimeout(function(){
            bookTitle.value = "";
            authorName.value = "";
            pages.value = "";
            isRead.checked = false;
        }, 10);
        Book.displayBooks();


    }

});

const form = document.querySelector("form");
form.classList.add("close");
addBook = document.querySelector(".add-book");
addBook.addEventListener("click", () => {

    if (form.classList.contains("close")) {
        form.classList.remove("close")
        form.setAttribute("style", "display: grid; align-items: center; justify-items: center;")
        
    } else {
        form.setAttribute("style", "display: none")
        form.classList.remove("open")
        form.classList.add("close");
    }
});

