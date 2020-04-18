import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInPage from './pages/signin/signin.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
	unsubscribeFromAuth = null

	componentDidMount() {
		const { setCurrentUser } = this.props;

		// onAuthStateChanged() returns firebase.Unsubscribe
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			// if user is logged in
			if (userAuth) {
				// get user reference to set currentUser state
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					})
				});
			}
			// set currentUser state after user has logged out
			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

  render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route path='/signin' component={SignInPage} />
				</Switch>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
