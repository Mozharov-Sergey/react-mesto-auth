import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import apiController from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import AcceptionPopup from './AcceptionPopup.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import authApi from './Auth.js';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImageFullSizePopupOpen, setIsImageFullSizePopupOpen] = React.useState(false);
  const [isAcceptionPopupOpened, setIsAcceptionPopupOpened] = React.useState(false);
  const [isInfoTooltipSuccessOpened, setIsInfoTooltipSuccessOpened] = React.useState(false);
  const [isInfoTooltipSuccessError, setIsInfoTooltipSuccessError] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [cardForDelete, setCardForDelete] = React.useState({});
  const [isloggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegisterComponentOpened, setIsRegisterComponentOpened] = React.useState(false)
  const [isLoginComponentOpened, setIsLoginComponentOpened] = React.useState(false);
  const [isInfoTooltipInvalidFormOpened, setIsInfoTooltipInvalidFormOpened] = React.useState(false);

  React.useEffect(() => {
    tokenCheck()
  }, []);

  React.useEffect(() => {
    if(isloggedIn) {
      history.push('/');
      apiController
        .getInitialCards()
        .then((res) => {
          setCards(Array.from(res));
        })
        .catch((err) => console.log(err));
  
        apiController
        .getUserData()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
    }
    
  }, [isloggedIn]);


  function handleCardClick(card) {
    setSelectedCard(card);
    handleImageFullSizePopupOpen();
  }

  function handleCardDeleteAcception(card) {
    setCardForDelete(card);
    handleAcceptionPopupOpen();
  }

  function handleCardRemove(card) {
    apiController
      .deleteCard(card._id)
      .then(
        setCards(
          cards.filter((item) => {
            return item._id !== card._id;
          })
        )
      )
      .then(setCardForDelete({}))
      .then(closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiController
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleAcceptionPopupOpen() {
    setIsAcceptionPopupOpened(true);
  }

  function handleImageFullSizePopupOpen() {
    setIsImageFullSizePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(newUserData, buttonTextController) {
    apiController
      .setUserData(newUserData.name, newUserData.about)
      .catch((err) => console.log(err))
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups())
      .catch((err) => console.log(err))
      .finally(buttonTextController('Сохранить'));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(newCardData, buttonTextController) {
    apiController
      .addCard(newCardData.link, newCardData.name)
      .catch((err) => console.log(err))
      .then((res) => setCards([res, ...cards]))
      .then(closeAllPopups())
      .catch((err) => console.log(err))
      .finally(buttonTextController('Сохранить'));
  }

  function handleChangeAvatar(newAvatar, buttonTextController) {
    apiController
      .changeUserAvatar(newAvatar.avatar)
      .catch((err) => console.log(err))
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups())
      .catch((err) => console.log(err))
      .finally(buttonTextController('Сохранить'));
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageFullSizePopupOpen(false);
    setIsAcceptionPopupOpened(false);
    setIsInfoTooltipSuccessOpened(false);
    setIsInfoTooltipSuccessError(false);
    setIsInfoTooltipInvalidFormOpened(false);
  }


  function handleRegister(email, password) {
    authApi
      .signup(email, password)
      .then((res) => {
        if(res) { 
          setIsInfoTooltipSuccessOpened(true);
          history.push('/sign-in');
        }
        else {
          setIsInfoTooltipSuccessError(true)
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSignIn(email, password) {
    authApi.signin(email, password).then((res) => {
      localStorage.setItem('token', res.token);
      setIsLoggedIn(true);
    });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      return authApi
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push('/');
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header email={userEmail} onLogout={handleLogout} isloggedIn={isloggedIn} isRegisterOpen={isRegisterComponentOpened} isLoginOpen={isLoginComponentOpened} />
          <Switch>
            <Route path="/sign-up">
              <Register onSubmit={handleRegister} onOpenClose={setIsRegisterComponentOpened} onInvalidSubmit={setIsInfoTooltipInvalidFormOpened}/>
            </Route>

            <Route path="/sign-in">
              <Login onSubmit={handleSignIn} onOpenClose={setIsLoginComponentOpened} />
            </Route>

            <ProtectedRoute
              path="/"
              isloggedIn={isloggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDeleteAcception}
              onCardLike={handleCardLike}
              cards={cards}
            />
          </Switch>

          <Footer />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImageFullSizePopupOpen} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onChangeAvatar={handleChangeAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          ></AddPlacePopup>

          <AcceptionPopup
            onClose={closeAllPopups}
            isOpen={isAcceptionPopupOpened}
            data={cardForDelete}
            onSubmit={handleCardRemove}
          />

          <InfoTooltip
            isOpen={isInfoTooltipSuccessOpened}
            message="Вы успешно зарегистрировались!"
            name="info-tooltip-error"
            onClose={closeAllPopups}
          >
            <div className="popup__image-info-tooltip popup__image-info-tooltip_type_success "></div>
          </InfoTooltip>

          <InfoTooltip
            isOpen={isInfoTooltipSuccessError}
            message="Что-то пошло не так!Попробуйте ещё раз."
            name="info-tooltip-error"
            onClose={closeAllPopups}
          >
            <div className="popup__image-info-tooltip popup__image-info-tooltip_type_error"></div>
          </InfoTooltip>

          <InfoTooltip
            isOpen={isInfoTooltipInvalidFormOpened}
            message="Невалидные значения полей формы! Попробуйте ещё раз."
            name="info-tooltip-error"
            onClose={closeAllPopups}
          >
            <div className="popup__image-info-tooltip popup__image-info-tooltip_type_error"></div>
          </InfoTooltip>



        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
