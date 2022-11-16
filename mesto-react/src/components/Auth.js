export const authOptions = {
  baseURL: 'https://auth.nomoreparties.co',
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

class Auth {
  constructor(authOptions) {
    this._baseUrl = authOptions.baseURL;
    this._headers = authOptions.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  signup(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => console.log(err));
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => console.log(err));
  }

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => console.log(err));
  }
}

const authApi = new Auth(authOptions);
export default authApi;
