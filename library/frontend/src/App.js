import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './User.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/auth/user')
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      })
      .catch(error => console.log(error))

  }

  render() {
    return (
      <div>
        <div class="container">
          <div class="header clearfix">
            <ul class="menu">
              <li><a href="*">домой</a></li>
              <li><a href="*">пользователи</a></li>
            </ul>
          </div>


          <div><UserList users={this.state.users} /></div>


          <div class="clr"></div>

          <div class="footer">

            <div class="clearfix">
              <div class="text-footer">
                <h3>контакты</h3>
              </div>
              <div class="text-footer">
                <h3>полезная информация</h3>
              </div>
              <div class="text-footer clearfix">
                <h3>Оставайтесь на связи</h3>
                <p>Подписаться на новости и рассылки</p>
              </div>
              <p class="small">&copy; GB 2017</p>
              <div class="social">
                <a href="#" class="social1"></a>
                <a href="#" class="social2"></a>
                <a href="#" class="social3"></a>
                <a href="#" class="social4"></a>
              </div>
              <p class="small">Положения &amp; Условия  /  Конфиденциальность &amp; Cookies</p>
            </div>

          </div>

        </div>
      </div>

    )
  }
}

export default App;