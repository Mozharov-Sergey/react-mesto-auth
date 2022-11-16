import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header({ email, onLogout, isloggedIn, isRegisterOpen, isLoginOpen }) {
  const [isTabIconShow, setIsTabShow] = React.useState(false);
  const [isTabOpen, setIsTabOpen] = React.useState(false);

  React.useEffect(() => {
    function handleScreenSizeChange() {
      if(window.screen.width > 515) {
        setIsTabShow(false);
        setIsTabOpen(false);
      }

      else {
        setIsTabShow(true)
      }
    }

    handleScreenSizeChange();
    window.addEventListener('resize', handleScreenSizeChange);
  }, []);

  function handleOpenTab() {
    setIsTabOpen(!isTabOpen);
  }

  function handleCloseTab() {
    setIsTabOpen(false);
  }

  return (
    <header className="header">
      <div className={(isloggedIn && isTabOpen) && "header__mobile-user-section"}>
        {isloggedIn && isTabOpen && <p className="header__email-mobile-section">{email}</p>}
        {isloggedIn && isTabOpen && (
          <button className="header__sign-out-mobile-section" onClick={onLogout}>
            Выйти
          </button>
        )}
      </div>
      
      <div className="header__main">
        <img className="header__logo" src={logo} alt="Логотип Место Россия" />

        {(isloggedIn && isTabIconShow && !isTabOpen) && (
          <button className="header__tab" type="click" onClick={handleOpenTab}>
            <div className="header__tab-line"></div>
            <div className="header__tab-line"></div>
            <div className="header__tab-line"></div>
          </button>
        )}

        {isloggedIn && isTabOpen && <button className="header__close-tab-button" onClick={handleCloseTab}></button>}
        {isloggedIn && !isTabIconShow && <p className="header__email">{email}</p>}
        {isloggedIn && !isTabIconShow && (
          <button className="header__sign-out" onClick={onLogout}>
            Выйти
          </button>
        )}

        {isRegisterOpen && (
          <Link to="/sign-in" className="header__registration">
            Войти
          </Link>
        )}
        {isLoginOpen && (
          <Link to="/sign-up" className="header__registration">
            Регистрация
          </Link>
        )}
      </div>
    </header>
  );
}
