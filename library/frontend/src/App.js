import React from 'react';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import axios from 'axios';
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm.js';
import Cookies from 'universal-cookie'

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
      'projects': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token != ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_headers() {
    if (!this.is_authenticated())
      return {};

    return {
      'Authorization': 'Token ' + this.state.token
    }
  }

  load_data(id) {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/0.2/user', { headers })
      .then(response => {
        const users = response.data.results
        this.setState({ 'users': users }
        )
      }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/0.2/todo', { headers })
      .then(response => {
        const todos = response.data.results
        this.setState({ 'todos': todos }
        )
      }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/0.2/project', { headers })
      .then(response => {
        const projects = response.data.results
        this.setState({ 'projects': projects }
        )
      }).catch(error => console.log(error))
    // axios.delete(`http://127.0.0.1:8000/api/0.2/project/${id}`, { headers, headers })
    //   .then(response => {
    //     this.setState({ projects: this.state.projects.filter((project) => project.id !== id) })
    //   }).catch(error => console.log(error))
  }

  deleteProject(id) {
    let headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/0.2/project/${id}`, { headers })
      .then(response => {
        this.setState(
          {
            'projects': this.state.projects.filter((project) => project.id !== id)
          }
        )
      }).catch(error => console.log(error))
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        console.log(response.data)
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  create_project(name, repo, user) {
    let headers = this.get_headers()
    const data = { "name": name, "repo": repo, "user": user }
    console.log("create_project " + name + " - " + repo + " - " + user);
    console.log(user);

    axios
      .post(
        'http://127.0.0.1:8000/api/0.2/project/',
        data,
        { headers }
      )
      .then(response => {
        this.load_data();
      })
      .catch(error => console.log('Wrong password'))
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
                  <li>
                    <Link to='/project/create'>pro_cr</Link>
                  </li>
                  <li>
                    {this.is_authenticated() ? <button onClick={() =>
                      this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                  </li>
                </ul>
              </nav>
            </div>

            <Switch>
              <Route exact path='/' component={() => <UserList users={this.state.users} />} />
              <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} />} />
              <Route exact path='/project' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
              <Route exact path='/login' component={() => <LoginForm get_token={(username, password) =>
                this.get_token(username, password)} />} />
              <Route exact path='/project/create'
                component={() => <ProjectForm create_project={(name, repo, user) => this.create_project(name, repo, user)} user={this.state.users} />} />
              {/* <Route exact path='/project_del' component={() => <ProjectList
                items={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} /> */}
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