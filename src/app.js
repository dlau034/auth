import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBhkkYl8qmwakSBVOfi1Z2wk4IxOThEbj4",
      authDomain: "authentication-ca6af.firebaseapp.com",
      databaseURL: "https://authentication-ca6af.firebaseio.com",
      projectId: "authentication-ca6af",
      storageBucket: "authentication-ca6af.appspot.com",
      messagingSenderId: "1009056461549"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

renderContent() {
  switch (this.state.loggedIn) {
    case true:
      return (
        <Card>
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        </Card>
      );
    case false:
      return <LoginForm />;
    default:
      return (
        <View>
          <Spinner size="large" />
        </View>
      );
  }
}

render() {
    return (
      <View>
        <Header headerText='Authetication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
