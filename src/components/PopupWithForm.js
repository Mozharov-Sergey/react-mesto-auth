import React from 'react';

// export default function PopupWithForm(props) {
export default function PopupWithForm({ title, name, isOpen, onClose, onSubmit, buttonText, buttonState, children }) {


  return (
    <div className={`popup popup_type_${name} ${isOpen? 'popup_opened':  ''} `}>
      <div className="popup__container">
        <form className="popup__form" name={`${name}`} action="#">
          <h2 className="popup__title">{title}</h2>
          <fieldset className="popup__fieldset">{children}</fieldset>
          <button className={`popup__submit-button ${ (!buttonState) && "popup__submit-button_disabled"}`} type="submit" aria-label="Сохранить" onClick={onSubmit} disabled={!buttonState}>
            {buttonText}
          </button>
        </form>

        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}
