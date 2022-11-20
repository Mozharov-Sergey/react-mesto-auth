import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AcceptionPopup({isOpen, onClose, onSubmit, data }) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(data);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="acception-form"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonState={true}
    ></PopupWithForm>
  );
}
