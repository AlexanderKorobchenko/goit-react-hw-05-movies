import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Reviews.module.css';

function makeReviewsURL(id) {
  return `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=47af3f3eb3cebf089eb55cbdac9542a5&language=en-US&page=1`;
}

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(makeReviewsURL(movieId))
      .then(response => response.json())
      .then(result => setReviews(result.results))
      .catch(err => console.warn(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => console.log(reviews), [reviews]);

  return (
    <ul className={s.list}>
      {reviews.length ? (
        reviews.map(review => {
          return (
            <li key={review.id}>
              <h4>Author: {review.author}</h4>
              <p>{review.content}</p>
              <br />
            </li>
          );
        })
      ) : (
        <h4>We don't have any reviews for this movie</h4>
      )}
    </ul>
  );
}

Reviews.protoType = {
  movieId: PropTypes.string,
};

export default Reviews;
