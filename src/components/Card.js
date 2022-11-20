import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const userInfo = React.useContext(CurrentUserContext);

  let isLiked = card.likes.some((like) => {
    return like._id === userInfo._id;
  });

  const isOwner = userInfo._id === card.owner._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__card">
      <img className="cards__card-image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="cards__info">
        <h2 className="cards__card-title">{card.name}</h2>
        <div className="cards__like-container">
          <button
            className={`cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="cards__likes-counter">{card.likes.length}</p>
        </div>
      </div>
      <button className={`card__delete-button ${isOwner ? 'cards__delete-button_active' : ''}`} onClick={handleDeleteClick}></button>
    </li>
  );
}
