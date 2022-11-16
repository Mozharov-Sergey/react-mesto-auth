import React from 'react';
import PopupWithForm from './PopupWithForm';
import {validator, buttonSwitcher} from '../utils/Validation';


export default function EditAvatarPopup({ isOpen, onClose, onChangeAvatar }) {
  const [avatar, setAvatar] = React.useState(''); // По заданию управляемый компонент тут не нужен. Реализовал дополнительно для валидации.
  const [avatarValidationState, setAvatarValidationState] = React.useState(false);
  const [avatarValidationMessage, setAvatarValidationMesage] = React.useState('');

  const avatarRef = React.useRef();
  const [buttonTitle, setButtonTitle] = React.useState('Сохранить');
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  React.useEffect(() => {
    buttonSwitcher([avatarValidationState], setIsSubmitButtonActive);
  }, [avatarValidationState]);

  function handleSubmit(e) {
    e.preventDefault();
    setButtonTitle('Сохранение ...');
    onChangeAvatar({ avatar: avatarRef.current.value }, setButtonTitle);
  }

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
    validator(e.target, setAvatarValidationState, setAvatarValidationMesage);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonTitle}
      onSubmit={handleSubmit}
      buttonState={isSubmitButtonActive}
    >
      <div className="popup__field-container">
        <input
          id="avatar"
          className="popup__field popup__field_value_name"
          type="url"
          placeholder="Ссылка на картинку"
          name="avatar"
          minLength="8"
          maxLength="500"
          value={avatar}
          onChange={handleChangeAvatar}
          ref={avatarRef}
          required
          noValidate
        />
        <span className={`avatar-input-error ${!avatarValidationState && 'popup__error_visible'}`}>
          {avatarValidationMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}
