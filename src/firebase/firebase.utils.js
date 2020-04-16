import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyAhTCCjo8wIC1IJOq9WjRx-NDdNhbGmhxs",
	authDomain: "crown-clothing-db-e08b3.firebaseapp.com",
	databaseURL: "https://crown-clothing-db-e08b3.firebaseio.com",
	projectId: "crown-clothing-db-e08b3",
	storageBucket: "crown-clothing-db-e08b3.appspot.com",
	messagingSenderId: "936665594495",
	appId: "1:936665594495:web:6beb50ddb96ae1362ddd4a"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	// get user reference from the database
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	// get snapshot from user reference
	const snapShot = await userRef.get();

	// if the user doesn't exist in the database, create one
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	// return either existing or new user reference
	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
