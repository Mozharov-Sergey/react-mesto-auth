import React from 'react';

export default function InfoTooltip({
  message,
  name,
  isOpen,
  onClose,
  children,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__container popup__container_type_info-tooltip">
        {children}
        <h2 className="popup__message">{message}</h2>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}
