import React from "react";
import StarProgressBar from "../StarProgressBar/StarProgressBar";

import "./ReviewPost.css";

const ReviewPost = (props) => {
  return (
    <div className="row review mb-4">
      <div className="col-md-3">
        <StarProgressBar rating={props.rating} />
        <p className="review_username username">@{props.username}</p>
      </div>
      <div className="col-md-9 pt-2 review_desc_wrap">
        <p>
          <b>Review:</b>
        </p>
        <p>
          {props.content}
        </p>
      </div>
    </div>
  );
};

export default ReviewPost;
