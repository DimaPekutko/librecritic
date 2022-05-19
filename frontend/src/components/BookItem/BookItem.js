import React from 'react'
import { Link } from 'react-router-dom'
import StarProgressBar from '../StarProgressBar/StarProgressBar'
import "./BookItem.css"

function BookItem(props) {
  return (
    <div className='col-md-3'>
      <Link className='book_item_link' to={"book/"+props.id}>
        <div className='book_item_wrap'>
            <StarProgressBar rating={props.rating}/>
            <img className='img-fluid' src={props.img_src}/>
            <p>{props.title}</p>
        </div>
      </Link>
    </div>
  )
}

export default BookItem