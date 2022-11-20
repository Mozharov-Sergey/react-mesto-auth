import React from 'react';
import PopupWithForm from './PopupWithForm';
import { validator, buttonSwitcher } from '../utils/Validation';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [nameValidationState, setNameValidationState] = React.useState(false);
  const [nameValidationMessage, setNameValidationMesage] = React.useState('');

  const [link, setLink] = React.useState('');
  const [linkValidationState, setLinkValidationState] = React.useState(false);
  const [linkValidationMessage, setLinkValidationMesage] = React.useState('');

  const [buttonTitle, setButtonTitle] = React.useState('Сохранить');
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false); 

  React.useEffect(() => {
    buttonSwitcher([nameValidationState, linkValidationState], setIsSubmitButtonActive);
  }, [nameValidationState, linkValidationState]);

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    setButtonTitle('Сохранение ...');
    e.preventDefault();
    onAddPlace({ name, link }, setButtonTitle);
  }

  function handleNameChange(e) {
    setName(e.target.value);
    validator(e.target, setNameValidationState, setNameValidationMesage);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    validator(e.target, setLinkValidationState, setLinkValidationMesage);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card-form"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonTitle}
      buttonState={isSubmitButtonActive}
      onSubmit={handleSubmit}
    >
      <div className="popup__field-container">
        <input
          id="description"
          className="popup__field popup__field_value_description"
          type="text"
          placeholder="Название"
          name="newCardDescription"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
          required
          noValidate
        />
        <span className={`description-input-error ${!nameValidationState && 'popup__error_visible'}`}>
          {nameValidationMessage}
        </span>
      </div>

      <div className="popup__field-container">
        <input
          id="link"
          className="popup__field popup__field_value_link"
          type="url"
          placeholder="Ссылка на картинку"
          name="newCardLink"
          value={link}
          onChange={handleLinkChange}
          required
          noValidate
        />
        <span className={`description-input-error ${!linkValidationState && 'popup__error_visible'}`}>
          {linkValidationMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}
