import React from 'react';
import UserForm from './UserForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function Login({ onSubmit, onOpenClose }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();


  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.email, values.password);
  }

  React.useEffect(() => {
    setValues({ email: '', password: '' });
  }, []);


  React.useEffect(() => {
    onOpenClose(true);

    return(() => {
      onOpenClose(false);
    })
  }, [])

  // НЕ УВЕРЕН, ЧТО С ТОЧКИ ЗРЕНИЯ UX НУЖНА ВАЛИДАЦИЯ ИМЕННО ПРИ ВХОДЕ, НО
  // В КАЧЕСТВЕ ТРЕНИРОВКИ РЕШИЛ СДЕЛАТЬ

  return (
    <UserForm title="Вход" buttonText="Войти" onSubmit={handleSubmit}>
      <input
        className={'user-form__input ' + (errors.email && 'user-form__input_error')}
        name="email"
        type="email"
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        required
      />
      {errors.email && <span className="user-form__error-message">{errors.email}</span>}

      <input
        className={'user-form__input ' + (errors.password && 'user-form__input_error')}
        placeholder="Пароль"
        name="password"
        type="password"
        minLength={6}
        maxLength={30}
        value={values.password || ''}
        onChange={handleChange}
        required
      />
      {errors.password && <span className="user-form__error-message">{errors.password}</span>}
    </UserForm>
  );
}
