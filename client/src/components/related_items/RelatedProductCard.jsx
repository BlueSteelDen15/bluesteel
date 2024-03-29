import React, { useState, useEffect } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import Modal from 'react-modal';
import ModalDetails from './ModalDetails.jsx';
import api from '../../utils/api.js';
import { StaticRating } from '../starRating.jsx';


const RelatedProductCard = ({ id, currentProductId, relatedItemsStyles, name, category, image, price, sendProductId, features, starRating }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentProductStyles, setCurrentProductStyles] = useState([]);

  Modal.setAppElement('body');
  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  const getCurrentProductInfo = async(currentProductId) => {
    await api.getProduct(currentProductId)
      .then(res => setCurrentProduct(res.data))
      .then(() => api.getProductStyles(currentProductId))
      .then(res => setCurrentProductStyles(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getCurrentProductInfo(currentProductId)
  }, [currentProductId])

  const getImage = (currentProductId) => {
    if (currentProductId === 44389) {
      return (
        <img src="../../assets/sunglasses.png" alt="sunnies" loading="lazy" style={{ borderRadius: '15px' }} />
      );
    }
    if (currentProductId !== 44389) {
      return (
        <img src={image} alt={name} loading="lazy" style={{ borderRadius: '15px' }} />
      );
    }
  }


  return (
    <div className="product-card" onClick={() => sendProductId(id)} >
      <StarFill size={21} className="star" onClick={toggleModal}
        style={{
          position: 'absolute',
          left: '18rem',
          top: '1.5rem',
          color: 'e8e8e8',
        }}
      />
      <img className="product-image" src={image} alt={name} loading="lazy" style={{borderRadius: '15px 15px 0px 0px'}} />
      <div className="bottom-half-card" style={{display: 'inline-block'}} onClick={() => { sendProductId(id)}}>
        <p className="product-category">{category.toUpperCase()}</p>
        <p className="product-name">{name}</p>
        <p className="product-price">${price}</p>
        <div className="product-rating"><StaticRating data={starRating} /></div>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={toggleModal}
        className="mymodal"
        overlayClassName="myoverlay"
      >
      <ModalDetails
        currentProduct={currentProduct}
        currentProductStyles={currentProductStyles}
        relatedItemsStyles={relatedItemsStyles}
        name={name}
        currentProductId={currentProductId}
        category={category}
        price={price}
        features={features}
      />
      </Modal>
    </div>
  )
}

export default RelatedProductCard;