import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewPost from "../ReviewPost/ReviewPost";
import StarProgressBar from "../StarProgressBar/StarProgressBar";

import AuthContext from "../../context/AuthContext";

import "./BookPage.css";
import ReviewForm from "../ReviewForm/ReviewForm";

const BookPage = () => {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null)

  const { apiFetchPOST, user } = useContext(AuthContext);

  const params = useParams();
  const bookId = Number(params.id);

  useEffect(() => {
    getBook();
    getReviews();
  }, []);

  const getBook = async () => {
    const response = await fetch("/api/book/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: bookId }),
    });

    if (response.status === 200) {
      const data = await response.json();
      setBook(data);
    }
  };

  const getReviews = async () => {
    const response = await fetch("/api/book_reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id: bookId }),
    });

    if (response.status === 200) {
      const data = await response.json();
      for (let review of data) {
          if (review.user.id === user.id) {
            setUserReview(review)
          }
      }

      setReviews(data);
    }
  };

  return (
    <div className="page container">
      {book ? (
        <div>
          <div className="row container">
            <div className="col-md-4">
              <img className="img-fluid" src={book.img_src} />
            </div>
            <div className="col-md-8 container">
              <StarProgressBar rating={book.rating} />
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>{book.desc}</p>
            </div>
          </div>
          <div className="mt-4 pt-2 row reviews_header">
            <p>
              <i>
                Average book rating <b>{book.rating}/5</b> with{" "}
                <b>{book.votes_count}</b> votes
              </i>
            </p>
          </div>
          <div className="row d-flex align-items-center">
            <div className="container reviews_wrap">
              {/* review form */}
              {user ? (
                <ReviewForm user_review={userReview} book_id={bookId} />
              ) : (
                <p className="text-center contrast_msg">
                  Only logged users can create review!
                </p>
              )}
              {/* reviews list */}
              {reviews.map((review) => {
                return (
                  <ReviewPost
                    key={review?.id}
                    username={review?.user.username}
                    content={review?.content}
                    rating={review?.rating}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default BookPage;
