Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

//function to delete all book views
function removeResults() {
    document.getElementsByClassName("book-view").remove();
    if(document.getElementById("indexLine") != null)
        document.getElementById("indexLine").remove();
}

//function to format authors
function formatAuthors(authors) {
    var s = "By : ";
    for (var i = 0; i < authors.length; i++) {
        if (i == authors.length - 1) {
            s += authors[i];
        } else {
            s += authors[i] + ", ";
        }
    }
    return s;
}

//function for the creation of the book view
function createBookView(title, imgUrl, authors, url, index) {
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "book-view");
    var p1 = document.createElement("p");
    p1.innerHTML = title;
    var img = document.createElement("img");
    if (imgUrl == undefined) {
        img.setAttribute("src", "img/default-book.png");
        img.setAttribute("width", "128");
        img.setAttribute("height", "289")
    } else
        img.setAttribute("src", imgUrl);
    var p2 = document.createElement("p");
    if (Array.isArray(authors))
        p2.innerHTML = formatAuthors(authors);
    else{
        if(authors != undefined)
            p2.innerHTML = "By : " + authors;
        else
        p2.innerHTML = "By : unknown";

    }
    var a1 = document.createElement("a");
    a1.href = url;
    a1.setAttribute("target", "blank")
    var textLink = document.createTextNode("Link to buy the book");
    a1.appendChild(textLink);
    mainDiv.appendChild(p1);
    mainDiv.appendChild(img);
    mainDiv.appendChild(p2);
    mainDiv.appendChild(a1);
    document.getElementById("results").appendChild(mainDiv);
}

//function that prints on the web page all the books-views
function disposeBooks() {
    for(var i = 0; i < books.length; i++){
        var title = books[i].volumeInfo.title;
        try{
            var imgUrl = books[i].volumeInfo.imageLinks.thumbnail;
        }
        catch(err){
            var imgUrl = undefined;
        }
        var url = books[i].volumeInfo.infoLink;
        var authors = books[i].volumeInfo.authors;
        createBookView(title, imgUrl, authors, url, i);
    }
}

//gloabal variable for memorizing the books
var books;

//function that search the book
function search() {
    var s;
    s = document.getElementById("search-bar").value;
    if (s == "") {
        alert("Please enter a value in the field")
    } else {
        removeResults();
        $.get("https://www.googleapis.com/books/v1/volumes?q=" + s + "&maxResults=40", function (response) {
            books = response.items;
            disposeBooks();
        })
    }
}

