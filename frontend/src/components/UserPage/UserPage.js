import React, { useState, useContext, useEffect } from "react";
import BookItem from "../BookItem/BookItem";

import AuthContext from "../../context/AuthContext";

import useAxios from "../../utils/useAxios"

import "./UserPage.css";
import { Link, useNavigate } from "react-router-dom";
import StarProgressBar from "../StarProgressBar/StarProgressBar";

const UserPage = () => {
  const [reviews, setReviews] = useState([]);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate()
  
  const apiFetch = useAxios()
  
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    getReviews();
  }, []);

  const getReviews = async () => {
    const response = await apiFetch.post("/api/user_reviews/")
    if (response.status === 200) {
      console.log(response.data)
      setReviews(response.data);
    }
  };

  return (
    <div className="page container">
        {
          reviews.length === 0 && (
            <p>You have not any reviews!</p>
          )
        }
        {
          reviews.map((review)=>{
            return (
              <div key={review.book.id} className="row container">
                <BookItem 
                  id={review.book.id}
                  title={review.book.title}
                  img_src={review.book.img_src}
                  author={review.book.author}
                  rating={review.book.rating}
                />
                <div className="col-md-9">
                  <h3>Your Description:</h3>
                  <p>{review.content}</p>
                  <h3>Your Rating:</h3>
                  <StarProgressBar
                    rating={review.rating}
                  />
                    <Link to={"/book/"+review.book.id}>
                      <button className="btn btn-light">
                        Go to the review
                      </button>
                    </Link>
                </div>
                <hr/>
              </div>
            )
          })
        }
    </div>
  );
};

export default UserPage;
