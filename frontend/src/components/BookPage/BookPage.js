import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import StarProgressBar from "../StarProgressBar/StarProgressBar"

import "./BookPage.css"

const BookPage = () => {

    const [book, setBook] = useState(null);
    const params = useParams()
    const bookId = params.id

    useEffect(() => {
        getBook()        
    });

    const getBook = async () => {
        const response = await fetch("/api/book/", {
            "method": "POST",
            "headers": {
                "Content-Type":"application/json" 
            },
            "body": JSON.stringify({"id": bookId})
        })

        if (response.status === 200) {
            const data = await response.json()
            setBook(data)
        }
    }
    
    return (
        <div className="page container">
            {
                book ? 
                    <div>
                        <div className="row container">
                            <div className="col-md-4">
                                <img className="img-fluid" src={book.img_src} />
                            </div>
                            <div className="col-md-8 container">
                                <StarProgressBar rating={book.rating}/>
                                <h2>{book.title}</h2>
                                <p>{book.author}</p>
                                <p>{book.desc}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-2 row reviews_header">
                            <p>
                                <i>
                                    Average book rating <b>{book.rating}/5</b> with <b>{book.rating}</b> votes
                                </i>
                            </p>
                        </div>
                        <div className="row d-flex align-items-center">
                            <div className="container reviews_wrap">
                                <div className="row review">
                                    <div className="col-md-3">
                                        <StarProgressBar rating={2.4}/>
                                        <p className="review_username">@dkefir03</p>
                                    </div>
                                    <div className="col-md-9 pt-2">
                                        <p><b>Review:</b></p>
                                        <p>lorem imde amd ieoad ioeajod ijeaoi djeaio jdoieaj oidjie jaoidj oieajd ieajo jdoieaj iodjeao idjieoa dkaopdk waopd kpowak dpowak pdok</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                : "loading"
            }
        </div>
    );
};

export default BookPage;
