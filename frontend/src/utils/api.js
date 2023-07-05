class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getFetch(url, options) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
      });
  }

  getInfoAboutMe() {
    const url = this._baseUrl + 'users/me';
    const options = {
      method: 'GET',
      headers: this._headers
    }
    return this._getFetch(url, options);
  }

  getInitialCards() {
    const url = this._baseUrl + 'cards';
    const options = {
      method: 'GET',
      headers: this._headers
    }
    return this._getFetch(url, options);
  }

  updateProfileInfo(profileName, profileJob) {
    const url = this._baseUrl + 'users/me';
    const options = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileJob
      })
    }
    return this._getFetch(url, options);
  }

  addCard(place, link) {
    const url = this._baseUrl + 'cards';
    const options = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: link
      })
    }
    return this._getFetch(url, options);
  }

  deleteCard(id) {
    const url = this._baseUrl + 'cards/' + id;
    const options = {
      method: 'DELETE',
      headers: this._headers
    }
    return this._getFetch(url, options);
  };

  _likeCard = (id) => {
    const url = this._baseUrl + 'cards/' + id + '/likes';
    const options = {
      method: 'PUT',
      headers: this._headers
    }
    return this._getFetch(url, options);
  };

  _unlikeCard = (id) => {
    const url = this._baseUrl + 'cards/' + id + '/likes';
    const options = {
      method: 'DELETE',
      headers: this._headers
    }
    return this._getFetch(url, options);
  };

  toggleLike(id, isLiked) {
    if (isLiked) {
      return this._likeCard(id);
    } else {
      return this._unlikeCard(id);
    }
  }

  updateAvatar(link) {
    const url = this._baseUrl + 'users/me/avatar';
    const options = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    }
    return this._getFetch(url, options);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers: {
    authorization: '3b0f9781-3d6e-4778-b136-c77e50919461',
    'Content-Type': 'application/json'
  }
});
export default api;