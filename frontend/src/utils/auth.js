class AuthApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._authErr = '';
  }

  _getFetch(url, options) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // какая конкретно ошибка при регистрации
        res.json().then(data => console.log(data.error));
        return Promise.reject(`Ошибка ${res.status}`)
      });
  }

  register({ email, password }) {
    const url = this._baseUrl + '/signup';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'password': password,
        'email': email
      })
    }
    return this._getFetch(url, options);
  }

  login({ email, password }) {
    const url = this._baseUrl + '/signin';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'password': password,
        'email': email
      })
    }
    return this._getFetch(url, options);
  }

  checkToken(jwt) {
    const url = this._baseUrl + '/users/me';
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
    }
    return this._getFetch(url, options);
  }

}

const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co'
});
export default authApi;