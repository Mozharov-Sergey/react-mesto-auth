import React from 'react';

export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup_type_open-image popup_overlay_dark ${isOpen ? 'popup_opened' : ''}`}>
      {card && (
        <div className="popup__container popup__container_fullscreen">
          <img className="popup__image" src={card.link} alt={card.name} />
          <h2 className="popup__image-subtitle">{card.name}</h2>
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
      )}
    </div>
  );
}
