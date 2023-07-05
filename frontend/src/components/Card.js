import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card.link, props.card.name);
  };
  function handleLikeClick() {
    props.onCardLike(props.card);
  };
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  const userInfo = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === userInfo.id;
  const isLiked = props.card.likes.some(i => i._id === userInfo.id);
  const cardLikeButtonClassName = ( 
    `card__btn-like ${isLiked && 'card__btn-like_active'}` 
  );
  return (
    <div className="card">
      <img src={props.card.link} alt={`фото места ${props.card.name}`} className="card__image" onClick={handleClick}/>
      <div className="card__sub-info">
        <h2 className="card__title">
          {props.card.name}
        </h2>
        <div className="cards__likes-wrapper">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button">
          </button>
          <p className="card__like-counter">
            {props.card.likes.length}
          </p>
        </div >
        { isOwn && (<button onClick={handleDeleteClick} className="card__delete" type="button" />)}
      </div>
    </div>
  );
};
export default Card;