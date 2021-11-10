/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
// TODO
const sortRatingsReviewsList = (reviews, sortType) => {
  if (sortType === 'relevant') { // review.date AND review.helpfulness
    return reviews.sort((a, b) => {
      return a - b;
    });
  } else if (sortType === 'new') {
    return reviews.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (sortType === 'helpful') { // review.helpfulness
    return reviews.sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });
  }
};

const handleSortByChange = () => {
  // const sortBy = document.getElementById('sortBy').value;
  sortRatingsReviewsList(sortBy);
};

const getPercentRecommended = (reviews) => {
  let numRecommended = 0;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].recommend) {
      numRecommended++;
    }
  }
  if (Number.isNaN(numRecommended / reviews.length)) {
    return 0;
  }
  return numRecommended / reviews.length;
};

const getTotalScore = (ratings) => { // ratings is an object
  let totalScore = 0;
  const keys = Object.keys(ratings);
  for (let i = 0; i < keys.length; i++) {
    const rating = keys[i];
    const numberOfRating = parseInt(ratings[rating]);
    totalScore += rating * numberOfRating;
  }
  return totalScore;
};

const getNumRatings = (ratings) => { // ratings is an object
  let numRatings = 0;
  const keys = Object.keys(ratings);
  for (let i = 0; i < keys.length; i++) {
    const rating = keys[i];
    const numberOfRating = parseInt(ratings[rating]);
    numRatings += numberOfRating;
  }
  return numRatings;
};

const getAverageRating = (ratings) => { // ratings is an object
  if (Number.isNaN(getTotalScore(ratings) / getNumRatings(ratings))) {
    return 0;
  }
  return getTotalScore(ratings) / getNumRatings(ratings);
};

const countReviewsWithRating = (ratings, num) => { // ratings is an object
  let numRatings = 0;
  const keys = Object.keys(ratings);
  for (let i = 0; i < keys.length; i++) {
    const rating = keys[i];
    const numberOfRating = parseInt(ratings[rating]);
    if (parseInt(rating) === num) {
      numRatings += numberOfRating;
    }
  }
  return numRatings;
};

module.exports = {
  sortRatingsReviewsList,
  handleSortByChange,
  getPercentRecommended,
  getTotalScore,
  getNumRatings,
  getAverageRating,
  countReviewsWithRating
};

// // TEMPORARY
// async function handleRatingBarClick(rating) {
//   console.log('HANDLING CLICK FOR RATING ', rating);
//   // If first time clicking a bar
//   if (!anyRatingBarClicked) {
//     console.log('FIRST TIME CLICKING A BAR');
//     await setAnyRatingBarClicked(true);
//     await setRatingsToDisplay([]);
//     console.log('SHOULD ONLY HAVE ONE RATING', ratingsToDisplay);
//     // debugger;
//     return;
//   }

//   // Toggle the rating that was clicked
//   let currentRatingClicked = ratingBarsClicked[rating];
//   setRatingBarsClicked({
//     ...ratingBarsClicked,
//     [rating]: !currentRatingClicked
//   });
//   console.log('ratingBarsClicked: ', ratingBarsClicked);
//   // console.log('BAR ', rating, ' IS NOW ', ratingBarsClicked[rating]);

//   // If rating is now clicked
//   if (ratingBarsClicked[rating]) {
//     // Add rating to ratingsToDisplay
//     if (!ratingsToDisplay.includes(rating)) {
//       let newRatingsToDisplay = ratingsToDisplay;
//       newRatingsToDisplay.push(rating);
//       setRatingsToDisplay(newRatingsToDisplay);
//     }
//   } else {
//     // If rating is now un-clicked
//     // Remove rating from ratingsToDisplay
//     const ratingIndex = ratingsToDisplay.indexOf(rating);
//     let newRatingsToDisplay = ratingsToDisplay;
//     newRatingsToDisplay.splice(ratingIndex, 1);
//     setRatingsToDisplay(newRatingsToDisplay);
//   }

//   // If no bars are clicked
//   if (ratingsToDisplay.length === 0) {
//     setRatingsToDisplay(ratingsArr);
//   }
//   console.log('FINAL ratingsToDisplay', ratingsToDisplay);
// }
