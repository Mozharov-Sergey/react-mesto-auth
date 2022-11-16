import React from 'react';
import UserForm from './UserForm';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function Register({ onSubmit, onOpenClose, onInvalidSubmit}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    setValues({ email: '', password: '' });
  }, []);

  React.useEffect(() => {
    onOpenClose(true);

    return () => {
      onOpenClose(false);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSubmit(values.email, values.password);
    } else {
      onInvalidSubmit(true);
    }
  }

  return (
    <>
      <UserForm title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleSubmit}>
        <input
          className={'user-form__input ' + (errors.email && 'user-form__input_error')}
          name="email"
          placeholder="Email"
          type="text"
          minLength={10}
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="user-form__error-message">{errors.email}</span>}
        <input
          className={'user-form__input ' + (errors.password && 'user-form__input_error')}
          name="password"
          placeholder="Пароль"
          type="password"
          minLength={6}
          maxLength={30}
          value={values.password || ''}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="user-form__error-message">{errors.password}</span>}
      </UserForm>
      <p className="user-form__is-registrated">
        Уже зарегистрированы?&nbsp; 
        <Link to="/sign-in" className="user-form__is-registrated_type_link">
          Войти
        </Link>
      </p>
    </>
  );
}
