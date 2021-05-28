import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import axios from 'axios';

import { HashRouter, BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';


const NotFound404 = ({ location }) => {
  return (
    <div>
      Not found: {location.pathname}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'todos': [],
      'projects': []
    }
  }

  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/api/user')
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      })
      .catch(error => console.log(error))
    axios
      .get('http://127.0.0.1:8000/api/todo')
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos
          }
        )
      })
      .catch(error => console.log(error))
    axios
      .get('http://127.0.0.1:8000/api/project')
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      })
      .catch(error => console.log(error))

  }

  render() {
    return (
      <div>

        <div class="container">

          <HashRouter>
            <div class="header clearfix">
              <nav>
                <ul class="menu">
                  <li>
                    <Link to='/'>User</Link>
                  </li>
                  <li>
                    <Link to='/todo'>Todo</Link>
                  </li>
                  <li>
                    <Link to='/project'>Projects</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <Switch>
              <Route exact path='/' component={() => <UserList users={this.state.users} />} />
              <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} />} />
              <Route exact path='/project' component={() => <ProjectList projects={this.state.projects} />} />
              {/* <Route component={NotFound404} /> */}
            </Switch>
          </HashRouter>


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