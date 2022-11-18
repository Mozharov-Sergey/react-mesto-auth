import React from 'react';

export default function InfoTooltip({
  message,
  name,
  isSuccess,
  isError,
  onClose,
  setMessage
}) {
  

  function handleClose() {
    onClose();
    setMessage('');
  }
  return (
    <div className={`popup popup_type_${name} ${isSuccess || isError ? 'popup_opened' : ''} `}>
      <div className="popup__container popup__container_type_info-tooltip">
        {isSuccess && <div className="popup__image-info-tooltip popup__image-info-tooltip_type_success "></div>}
        {isError && <div className="popup__image-info-tooltip popup__image-info-tooltip_type_error"></div>}
        {isSuccess && <h2 className="popup__message">"Вы успешно зарегистрировались!"</h2>}
        {isError && <h2 className="popup__message">{message}</h2>}
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={handleClose} />
      </div>
    </div>
  );
}
