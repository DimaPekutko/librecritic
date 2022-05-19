import BookItem from "../BookItem/BookItem";

import {useState, useEffect} from 'react'

function CatalogPage() {

  const [books, setBooks] = useState([]);
  
  let books_recieved = false

  
  useEffect(() => {
    getBooks()
  }, []);

  const getBooks = async () => {
    const res = await fetch("/api/books/", {
      method: "POST",
      headers: {
          "Content-Type":"application/json" 
      }
    })
    if (res.status === 200) {
      const data = await res.json()
      setBooks(data)
      console.log("hello")
    }
  }


  return (
      <div className="page container">
        <div className="row">
          {
            books.map((book)=>{
              return (
                <BookItem 
                  id={book.id}
                  key={book.id}
                  title={book.title}
                  img_src={book.img_src}
                  author={book.author}
                  rating={book.rating}
                />
              )
            })
          }
        </div>
      </div>
  );
}

export default CatalogPage;
