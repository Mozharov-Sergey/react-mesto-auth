import React from 'react';

export default function UserForm({ title, buttonText, onSubmit, children, disabled }) {
  // МОЖНО БЫЛО ОБОЙТИСЬ И БЕЗ USERFORM. НО ПРЕДПОЛАГАЯ, ЧТО В БУДУЩЕМ ПОЯВИТСЯ ФОРМА
  // СМЕНЫ ПАРОЛЯ, ВОССТАНОВЛЕНИЯ ПАРОЛЯ И.Т.Д, ИМЕЕТ СМЫСЛ СДЕЛАТЬ ОБЩИЙ БАЗОВЫЙ КОМПОНЕНТ
  return (
    <div className="user-form">
      <h2 className="user-form__title">{title}</h2>
      <form className="user-form__form">
        {children}
        <button className="user-form__button-submit" type="submit" onClick={onSubmit} disabled={disabled}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}
