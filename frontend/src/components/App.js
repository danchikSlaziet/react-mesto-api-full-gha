import '../index.css';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import api from '../utils/api';

import toolTipErr from '../images/tooltip-err.svg';
import toolTipOk from '../images/tooltip-ok.svg';

import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTip from './InfoToolTip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import authApi from '../utils/auth';



function App() {
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', id: ''});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isToolTipInfo, setIsToolTipInfo] = useState({isOpen: false, imgPath: '', text: ''});
  const [selectedCard, setSelectedCard] = useState({isOpen: false, link: '', place: ''});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  function handleLogin() {
    setLoggedIn(!loggedIn);
  };

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getInfoAboutMe()
      .then((aboutMeData) => {
        setCurrentUser({name: aboutMeData.name, about: aboutMeData.about, avatar: aboutMeData.avatar, id: aboutMeData._id})
      })
      .catch(err => console.log(err));
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.id);
    api.toggleLike(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(err => console.log(err));
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id))
      })
      .catch(err => console.log(err));
  };
  function handleUpdateUser(name, description) {
    api.updateProfileInfo(name, description)
      .then((data) => {
        setCurrentUser({...currentUser, name: data.name, about: data.about});
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };
  function handleUpdateAvatar({avatar}) {
    api.updateAvatar(avatar)
      .then((data) => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };
  function handleAddPlaceSubmit(place, url) {
    api.addCard(place, url)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };
  function handleCardClick(url, name) {
    setSelectedCard({isOpen: true, link: url, place: name});
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsToolTipInfo({...isToolTipInfo, isOpen: false});
    setSelectedCard({isOpen: false, link: '', place: ''});
  }
  const navigate = useNavigate();
  function apiToken(jwt) {
    authApi.checkToken(jwt)
      .then((data) => {
        handleLogin();
        navigate("/");
        setUserEmail(data.data.email);
      })
      .catch(err => console.log(err));
  };
  function apiLogin({email, password}) {
    authApi.login({email, password})
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          handleLogin();
          navigate("/");
          setUserEmail(email);
        }
        })
      .catch((err) => {
        console.log(err);
        setIsToolTipInfo({isOpen: true, imgPath: toolTipErr, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
      });
  };
  function apiRegister({email, password}) {
    authApi.register({email, password})
      .then((data) => {
        navigate('/sign-in');
        setIsToolTipInfo({isOpen: true, imgPath: toolTipOk, text: 'Вы успешно зарегистрировались!'});
      })
      .catch((err) => {
        console.log(err);
        setIsToolTipInfo({isOpen: true, imgPath: toolTipErr, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
      });
  };

  const mainRef = useRef();
  const footerRef = useRef();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Routes>
          <Route path="/" element={<ProtectedRoute footerRef={footerRef} mainRef={mainRef} userEmail={userEmail} element={Main} handleLogin={handleLogin} loggedIn={loggedIn} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} />} />
          <Route path="/sign-in" element={<><Header pathName="../sign-up">Регистрация</Header><Login apiLogin={apiLogin} apiToken={apiToken} /></>}/>
          <Route path="/sign-up" element={<><Header pathName="../sign-in">Войти</Header><Register apiRegister={apiRegister} /></>}/>
        </Routes>
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddCard={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}/>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupWithForm buttonText='Да' title="Вы уверены?" name="delete">
        </PopupWithForm>
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <InfoToolTip isToolTipInfo={isToolTipInfo} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
