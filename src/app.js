import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        // Initialize Firebase
        firebase.initializeApp({
            apiKey: 'AIzaSyAgaqScfKHKfIQImF9DpgvpMG18DS96fqY',
            authDomain: 'auth-a956d.firebaseapp.com',
            databaseURL: 'https://auth-a956d.firebaseio.com',
            projectId: 'auth-a956d',
            storageBucket: 'auth-a956d.appspot.com',
            messagingSenderId: '199173686769'
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
                <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                </Button>
            );
            case false:
                return <LoginForm />;
            default:
                return (
                    <Spinner />
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
