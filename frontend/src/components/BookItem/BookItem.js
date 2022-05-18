import React from 'react'
import StarProgressBar from '../StarProgressBar/StarProgressBar'
import "./BookItem.css"

function BookItem() {
  return (
    <div className='col-md-3'>
        <div className='book_item_wrap'>
            <StarProgressBar/>
            <img className='img-fluid' src='https://www.whichbook.net/assets/bookcovers/11986.jpg?quality=45'/>
            <p>The Bone readers</p>
        </div>
    </div>
  )
}

export default BookItem