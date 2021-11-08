/* eslint-disable comma-dangle */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React, { useContext, useState } from 'react';
import ReactDom from 'react-dom';
import { ProductContext } from '../../context/globalContext';
import { qaContext } from '../../context/qaContext';
import { addReview } from '../../utils/reviewUtils.js';
// import { getQuestionsAnswers, postQuestion } from '../../utils/questionsUtils';

const ReviewForm = ({ setModalDisplayed }) => {
  const characteristicsA = ['Size', 'Width', 'Comfort'];
  const characteristicsB = ['Quality', 'Length', 'Fit'];
  const ratings = [1, 2, 3, 4, 5];
  const { currentProduct } = useContext(ProductContext);
  const [overallRating, setOverallRating] = useState(0);
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [userRecommended, setUserRecommended] = useState(false);
  const [nameInputVal, setNameInputVal] = useState('');
  const [emailInputVal, setEmailInputVal] = useState('');
  const {characteristics, setCharacteristics} = useState({});
  const [size, setSize] = useState(0);
  const [width, setWidth] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [quality, setQuality] = useState(0);
  const [length, setLength] = useState(0);
  const [fit, setFit] = useState(0);
  const [errorDisplayed, setErrorDisplayed] = useState(false);

  const handleFormSubmit = () => {
    if (
      overallRating > 0
      && reviewSummary.length > 0
      && reviewBody.length > 0
      && emailInputVal.length > 0
      && emailInputVal.includes('@')
    ) {
      addReview(
        () => {},
        currentProduct.id,
        overallRating,
        reviewSummary,
        reviewBody,
        recommend,
        name,
        email,
        photos,
        characteristics
      );
      // postQuestion(questionInputVal, nameInputVal, emailInputVal, currentProduct.id, () => {
      //   getQuestionsAnswers(currentProduct.id, (data) => {
      //     setCurrentQuestions(data.results);
      //     setAllQuestions(data.results);
      //     setModalDisplayed(false);
      //   }, null, 100);
      // });
    } else {
      setErrorDisplayed(true);
    }
  };

  return (
    <div
      id='reviewModal'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '600px',
        width: '600px',
        border: "2px solid black",
        backgroundColor: 'white',
      }}
    >
      <h3 style={{ marginBottom: '0px' }}>Write Your Review</h3>
      <div style={{ marginTop: '5px' }}>About the {currentProduct.name}</div>
      <div style={{ margin: '10px' }}>
        <div> {/* REQUIRED */}
          <b>Overall Rating</b>
          {ratings.map((rating) => {
            return (
              <span>
                <input type="radio" id="rating" name="rating" onChange={() => { setOverallRating(rating); }}></input>
                <label htmlFor="rating">{rating}</label>
              </span>
            );
          })}
        </div>
        <div> {/* REQUIRED */}
          <b>Do you recommend this product?</b>
          <span>
            <input type="radio" id="recommend" name="recommend" onChange={() => { setUserRecommended(true); }}></input>
            <label htmlFor="recommend">Yes</label>
            <input type="radio" id="recommend" name="recommend" onChange={() => { setUserRecommended(false); }}></input>
            <label htmlFor="recommend">No</label>
          </span>
        </div>
        <p><b>Characteristics</b></p> {/* REQUIRED */}
        <div className="characteristicsContainer">
          {/* TODO: Make the name dynamic so we can capture which one was clicked */}
          <div>
            {characteristicsA.map((characteristic) => {
              return (
                <div className="reviewCategory">
                  <span className="characteristic" style={{ width: '200px' }}>
                    {characteristic}
                  </span>
                  <span className="ratings" style={{ justifySelf: 'end' }}>
                    {ratings.map((rating) => {
                      return (
                        <span>
                          <input type="radio" id={characteristic} name={characteristic}></input>
                          <label htmlFor={characteristic}>{rating}</label>
                        </span>
                      );
                    })}
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            {characteristicsB.map((characteristic) => {
              return (
                <div className="reviewCategory">
                  <span className="characteristic">
                    {characteristic}
                  </span>
                  {ratings.map((rating) => {
                    return (
                      <span>
                        <input type="radio" id={characteristic} name={characteristic}></input>
                        <label htmlFor={characteristic}>{rating}</label>
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div><b>Review Summary </b></div>
          <textarea
            maxLength={60}
            rows={1}
            style={{ resize: 'none', width: '98%', margin: '5px 0' }}
            value={reviewSummary}
            onChange={(e) => { setReviewSummary(e.target.value); }}
          >
          </textarea>
        </div>
        <div>
          <div><b>Review Body </b></div>
          <textarea
            maxLength={1000}
            rows={3}
            style={{ resize: 'none', width: '98%', margin: '5px 0' }}
            value={reviewBody}
            onChange={(e) => { setReviewBody(e.target.value); }}
          >
          </textarea>
        </div>
        {/* Upload Photos */}
        <button
          type="submit"
          className="addPhotoButton"
          style={{
            fontWeight: 'bold',
            backgroundColor: 'white'
          }}
        >
          Upload Photo
        </button>
        <div>
          <div><b>Nickname </b></div>
          <input
            style={{ width: '98%', margin: '5px 0' }}
            placeholder={'Example: jackson11!'}
            value={nameInputVal}
            onChange={(e) => { setNameInputVal(e.target.value); }}
          >
          </input>
        </div>
        <div>For privacy reasons, do not use your full name or email address.</div>
        <div>
          <div style={{ marginTop: '10px' }}><b>Email </b></div>
          <input
            style={{ width: '98%', margin: '5px 0' }}
            placeholder={'Example: jackson11@email.com'}
            maxLength={60}
            value={emailInputVal}
            onChange={(e) => { setEmailInputVal(e.target.value); }}
          >
          </input>
        </div>
        <div>For authentication reasons, you will not be emailed.</div>
      </div>
      <div
         style={{
           border: '2px solid black',
           height: '50px',
           width: '200px',
           lineHeight: '50px',
           textAlign: 'center',
           marginTop: '10px',
           cursor: 'pointer',
         }}
         onClick={handleFormSubmit}
      >SUBMIT REVIEW
      </div>
      {errorDisplayed
        && <div style={{ color: 'red', marginTop: '25px' }}>
             *Invalid Submission: All form fields must be filled out with a valid email address*
           </div>}
    </div>
  );
};

export default ReviewForm;
