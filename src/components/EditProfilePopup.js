import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext); // Принимаем контекст переданый в value <CurrentUserContext.Provider value=""> в App.js
  const [buttonTitle, setButtonTitle] = React.useState('Сохранить');
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  const { values, handleChange, errors, isValid, setValues,} = useFormAndValidation();

  React.useEffect(() => {
    setIsSubmitButtonActive(isValid);
  }, [values]);

  React.useEffect(() => {
    setValues({ profileName: currentUser.name, profileFunction: currentUser.about });
  }, [isOpen]);

  function handleSubmit(e) {
    setButtonTitle('Сохранение ...');
    e.preventDefault();
    onUpdateUser(
      {
        name: values.profileName,
        about: values.profileFunction,
      },
      setButtonTitle('Сохранить')
    );
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактиовать профиль"
      name="edit-profile"
      buttonText={buttonTitle}
      buttonState={isSubmitButtonActive}
    >
      <div className="popup__field-container">
        <input
          id="name"
          className="popup__field popup__field_value_name"
          type="text"
          placeholder="Имя"
          name="profileName"
          minLength="2"
          maxLength="40"
          value={values.profileName || ''} //name
          onChange={handleChange}
          required
        />

        {/* <span className={errors.profileName !== '' && 'popup__error_visible'}>{errors.profileName}</span> */}
        <span className={errors.profileName !== '' ? 'popup__error_visible' : ''}>{errors.profileName}</span>
      </div>
      <div className="popup__field-container">
        <input
          id="profession"
          className="popup__field popup__field_value_profession"
          type="text"
          placeholder="Род деятельности"
          name="profileFunction"
          minLength="2"
          maxLength="200"
          value={values.profileFunction || ''}
          onChange={handleChange}
          required
        />

        {/* <span className={errors.profileFunction !== '' && 'popup__error_visible'}>
          {errors.profileFunction}
        </span> */}
        <span className={errors.profileFunction !== '' ? 'popup__error_visible' : ''}>{errors.profileFunction}</span>
      </div>
    </PopupWithForm>
  );
}
