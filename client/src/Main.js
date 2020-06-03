import React, { useState, useEffect } from "react";
import API from "./utils/API";
import axios from "axios";


export function Search() {

    const [books, setBooks] = useState([]);
    useEffect(() => {
        searchGoogleBooks();
    }, [])
    const [searchText, setSearchText] = useState([]);

    function handleFormSubmit(event) {

        event.preventDefault();
        searchGoogleBooks();
    }

    function searchGoogleBooks() {

        console.log("rendering seearch lol");
        axios.get("https://www.googleapis.com/books/v1/volumes?q=\"" + searchText + "\"").then(
            res => {
                const booksArr = res.data.items.slice(0, 5).reduce(
                    (resultArr, item) => {
                        let thumbnail;
                        if (item.volumeInfo.imageLinks && item.volumeInfo.title && item.volumeInfo.authors && item.volumeInfo.description && item.volumeInfo.infoLink) {
                            thumbnail = <img src={item.volumeInfo.imageLinks.thumbnail}></img>
                            resultArr.push(
                                <div className="card m-2">
                                    <div className="card-body col-6">
                                        {thumbnail}
                                        <h4>{item.volumeInfo.title}</h4>
                                        <div>{item.volumeInfo.authors}</div>
                                        <hr></hr>
                                        <div>{item.volumeInfo.description}</div>
                                        <a href={item.volumeInfo.infoLink}>Link To page</a>
                                        <div></div>
                                        <div className="btn btn-primary" onClick={() => API.saveBook({
                                            thumbnail: item.volumeInfo.imageLinks.thumbnail, title: item.volumeInfo.title,
                                            authors: item.volumeInfo.authors, description: item.volumeInfo.description, link: item.volumeInfo.infoLink
                                        })}>
                                            Save
                                    </div>
                                    </div>
    
                                </div>
                            )
                        }

                        return resultArr;


                    }, []
                )
                setBooks(booksArr);
            }
        )
    }


    return (
        <div>


            <form onSubmit={(event) => handleFormSubmit(event)}>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button" onClick={(event) => handleFormSubmit(event)}>Search</button>
                    </div>
                    <input type="text" className="form-control form-control-lg" placeholder="e.g. javascript" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
                </div>
            </form>
            {books}
        </div>)
}


export function Saved() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        loadSavedBooks();
    }, [])
    function loadSavedBooks() {
        API.getBooks().then(res => {
            console.log(res);
            const bookArr = res.data.map((book, index) => {
                //attempt to check if image exists for saved book
                console.log(book);
                let thumbnail
                if (book.thumbnail) {
                    thumbnail = <img src={book.thumbnail}></img>
                }
                return (
                    <div className="card m-2">
                        <div className="card-body col-6">
                            {thumbnail}
                            <h4>{book.title}</h4>
                            <div>{book.authors}</div>
                            <hr></hr>
                            <div>{book.description}</div>
                            <a href={book.link}></a>
                            <div className="btn btn-danger" onClick={() => { API.deleteBook(book._id).then(() => { loadSavedBooks() }) }}>delete</div>
                        </div>
                    </div>
                )
            })
            setBooks(bookArr);

        })
    }

    return (
        <div>
            {books}


        </div>)
}

