import React from 'react';
import './styles/global.scss';
import AuthPage from './components/pages/AuthPage';
import HomePage from "./components/pages/HomePage";

class App extends React.Component {
    state = {
    user: null,
  };

  setLoggedUser = (user) => {
    this.setState({user});
  };

  render() {
    return (
        <div className="App">
          {(this.state.user && <HomePage />) || (
              <AuthPage setLoggedUser = {this.setLoggedUser}/>
          )}
        </div>
    );
  }
}
export default App;
