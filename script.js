const myLibrary = []

// function Book(title, author, page_nb, read) {
//     if (!new.target) {
//         throw Error('You need to use new')
//     }

//     this.id = crypto.randomUUID()
//     this.title = title;
//     this.author = author;
//     this.page_nb = page_nb;
//     this.read = read;

//     this.info = function() {
//         return this.title + " by " + this.author + ", " + this.page_nb + " pages, " + this.read
//     }
// }

class Book {
    constructor(title, author, page_nb, read) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.author = author;
        this.page_nb = page_nb;
        this.read = read;
    }

    info() {
        return this.title + " by " + this.author + ", " + this.page_nb + " pages, " + this.read;
    }
}

function addBookToLibrary(title, author, page_nb, read) {
    const book = new Book(title, author, page_nb, read)
    myLibrary.push(book)
}


addBookToLibrary("Hary Potter and Philosopher's stone", "J.K. Rowling", 300, "Unread")
addBookToLibrary("Hary Potter and Chamber of Secrets", "J.K. Rowling", 350, "Unread")
addBookToLibrary("Hary Potter and the Prisoner of Azkaban", "J.K. Rowling", 400, "Unread")
addBookToLibrary("Hary Potter and the Goblet of Fire", "J.K. Rowling", 600, "Read")

const container = document.querySelector(".container")
let dialog_button = document.querySelector("#dialog_button")

// Creation of the form
let title_side_bar = document.createElement("h1")
title_side_bar.textContent="Fill in the Form"

let form = document.createElement("form");
form.classList.add("form");
form.appendChild(title_side_bar);

for (x of ["title_field", "author_field", "page_field"]){
    let variable = document.createElement("input");
    variable.id = x;
    variable.type = "text";
    
    let label = document.createElement("label");
    label.textContent = x.split("_")[0].charAt(0).toUpperCase() + x.split("_")[0].slice(1);
    label.htmlfor = x;
    form.appendChild(label);
    form.appendChild(variable);
}

let read_check_div = document.createElement("div");
read_check_div.classList.add("read_check_div");
let read_checkbox = document.createElement("input");
read_checkbox.type = "checkbox";
read_checkbox.id = "read_field";
let label = document.createElement("label");
label.textContent = "Has been read ?";
label.htmlfor = "read_field";

read_check_div.appendChild(label);
read_check_div.appendChild(read_checkbox);

form.appendChild(read_check_div);

// Creation button Cancel
const cancel = document.createElement("button");
cancel.value = "cancel";
cancel.formMethod ="dialog";
cancel.textContent = "Cancel";
form.appendChild(cancel);

// Creation button submit
const submit = document.createElement("button");
submit.textContent="Submit";
submit.value = "default";

form.appendChild(submit)

// Creation dialog
let dialog = document.createElement("dialog");
dialog.setAttribute("closedby", "any");
dialog.appendChild(form);

// Display the dialog
dialog_button.addEventListener("click", function() {
    dialog.showModal();
})

// CLose the dialog
dialog.addEventListener("close", function(e) {
    if (dialog.returnValue === "submitted"){
    const last_book = myLibrary[myLibrary.length-1];
        displayBook(last_book);
    }
}    
)

submit.addEventListener("click", function(event) {
    event.preventDefault();
    let title_value = document.querySelector("#title_field").value;
    let author_value = document.querySelector("#author_field").value;
    let page_value = document.querySelector("#page_field").value;
    let read_value = document.querySelector("#read_field").checked == true ? "Read" : "Unread" ;

    addBookToLibrary(title_value, author_value, page_value, read_value);
    dialog.close("submitted")
    form.reset()
})

container.appendChild(dialog)

const list = document.createElement("div");
list.classList.add("list")

myLibrary.forEach(function(item) {
    displayBook(item);
})

function displayBook(item) {
    let card = document.createElement("div");
    let info = document.createElement("div");
    let trash_div = document.createElement("div");
    let title = document.createElement("h1");
    let author = document.createElement("h2");
    let nb_page = document.createElement("p");
    let read_btn = document.createElement("button");
    let read_btn_div = document.createElement("div");
    let trash = document.createElement("button");
    let read_status = document.createElement("div");

    trash.id = item.id;
    trash.textContent = 'Delete';

    title.textContent = item.title;
    author.textContent = item.author;
    nb_page.textContent = item.page_nb + " pages";
    read_status.textContent = item.read;
    read_status.id= item.id;
    read_btn.id = item.id;
    read_btn.textContent = item.read == "Read" ? "Unread" : "Read";

    card.classList.add("card")
    info.classList.add("info")
    read_status.classList.add("read_status")
    trash_div.classList.add("trash_div")
    read_btn_div.classList.add("read_btn_div")

    trash.addEventListener('click', function() {
        this.parentElement.parentElement.remove();
    })

    read_btn.addEventListener('click', function() {
        if (read_status.id == this.id) {
            if (read_status.textContent == "Unread") {
                read_status.textContent = "Read";
                this.textContent= "Unread";
            } else {
                read_status.textContent = "Unread";
                this.textContent = "Read";
            }
        }
    })

    info.appendChild(title)
    info.appendChild(author)
    info.appendChild(nb_page)

    read_btn_div.appendChild(read_btn)
    trash_div.appendChild(trash)
    

    card.appendChild(read_btn_div)
    card.appendChild(trash_div)
    card.appendChild(info)
    card.appendChild(read_status)
    

    list.appendChild(card)
}

container.appendChild(list);

console.log(myLibrary)

