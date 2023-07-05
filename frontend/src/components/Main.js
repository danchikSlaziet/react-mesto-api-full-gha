import editIconPath from '../images/edit-img.svg';
import addIconPath from '../images/add-img.svg';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const userInfo = useContext(CurrentUserContext);
  return (
    <>
      <main ref={props.mainRef} className="main">
        <section className="profile page__profile">
          <button onClick={props.onEditAvatar} className="avatar-btn" type="button">
            <img src={userInfo.avatar} alt="аватарка профиля" className="profile__img avatar" />
          </button >
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">
                {userInfo.name}
              </h1>
              <p className="profile__job">
                {userInfo.about}
              </p>
            </div>
            <button onClick={props.onEditProfile} className="profile__btn profile__btn_type_edit" type="button">
              <img src={editIconPath} alt="кнопка редактирования" className="profile__edit-img" />
            </button>
          </div>
          <button onClick={props.onAddPlace} className="profile__btn profile__btn_type_add" type="button">
            <img src={addIconPath} alt="кнопка добавления публикации" className="profile__add-img" />
          </button>
        </section>
        <section className="cards page__cards" aria-label="секция с карточками-постами">
          {/* [...cards] чтобы не менять стэйт cards напрямую (т.к. map меняет изначальный массив, а спрэд оператор вроде бы делает копию массива) */}
          {[...props.cards].map((item) => {  
           return (
              <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} key={item._id} card={item}/>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Main;
