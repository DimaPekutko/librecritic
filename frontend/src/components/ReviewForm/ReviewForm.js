import React, { useState, useContext } from "react";
import StarProgressBar from "../StarProgressBar/StarProgressBar";

import useAxios from "../../utils/useAxios"
import AuthContext from "../../context/AuthContext";

import "./ReviewForm.css";

const ReviewForm = (props) => {
  const { user, tokens } = useContext(AuthContext);

  const [reviewData, setReviewData] = useState({
    user_id: user?.id,
    book_id: props.book_id,
    content: props.user_review?.content,
    rating: props.user_review?.rating,
  });

  const [formMsg, setFormMsg] = useState("");

  const apiFetch = useAxios()

  const onStarProgressClick = (e) => {
    let progressBound = e.target.getBoundingClientRect();
    let parentWidth = e.target.parentElement.clientWidth;
    let clickedWidth = e.clientX - progressBound.x;
    let rating = ((clickedWidth / parentWidth) * 5).toFixed(1);
    if (rating !== 0) {
      let new_state = { ...reviewData };
      new_state.rating = rating;
      setReviewData(new_state);
    }
  };

  const onContentChange = (e) => {
    let value = e.target.value;
    let new_state = { ...reviewData };
    new_state.content = value;
    setReviewData(new_state);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const isFormValid = () => {
    if (!reviewData.content?.length || reviewData.content?.length < 50) {
      setFormMsg("You should type content (>50 symbols)!");
      return false;
    }
    if (!reviewData.rating) {
      setFormMsg("You should choose rating!");
      return false;
    }

    return true;
  };

  const onCreate = async (e) => {
    if (isFormValid()) {
      await apiFetch.post("/api/create_review/", {
        user_id: reviewData.user_id,
        book_id: reviewData.book_id,
        content: reviewData.content,
        rating: reviewData.rating,
      })
      window.location.reload();
    }
  };

  const onUpdate = async (e) => {
    if (isFormValid()) {
      console.log(reviewData.content)
      await apiFetch.post("/api/update_review/", {
        id: props.user_review?.id,
        content: reviewData.content,
        rating: reviewData.rating,
      })

      window.location.reload();
    }
  };

  const onDelete = async (e) => {
    await apiFetch.post("/api/delete_review/", {
      id: props.user_review?.id,
    })

    window.location.reload();
  };

  return (
    <div className="row review review_form mb-4">
      <div className="col-md-3 pt-2">
        <p>
          <b>Your rating:</b>
        </p>
        {/* <p className="review_username username">@dkefir03</p> */}
        <StarProgressBar
          onClick={onStarProgressClick}
          rating={reviewData.rating}
        />
      </div>
      <div className="col-md-9 pt-2 review_desc_wrap">
        <form onSubmit={onSubmit}>
          <p>
            <b>Your description:</b>
          </p>
          <textarea
            onChange={onContentChange}
            value={reviewData.content}
            placeholder="Your review here..."
          ></textarea>
          <p className="contrast_msg">{formMsg}</p>

          {!props.user_review ? (
            <button
              onClick={onCreate}
              className="btn btn-light mb-3"
              type="submit"
            >
              Finish
            </button>
          ) : (
            <div>
              <button
                onClick={onUpdate}
                className="btn mb-3 update_btn"
                type="submit"
              >
                Update
              </button>
              <button
                onClick={onDelete}
                className="btn mb-3 delete_btn"
                type="submit"
              >
                Delete Review
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
