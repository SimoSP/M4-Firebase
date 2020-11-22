import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAbrus0wJvU1AtENq21yRWXsLTX9JG9vxc',
  authDomain: 'react-firebase-420e4.firebaseio.com',
  databaseURL: 'https://react-firebase-420e4.firebaseio.com',
  projectId: 'react-firebase-420e4',
  storageBucket: 'react-firebase-420e4.appspot.com',
  messagingSenderId: '765600039261-sp8sabjfgg7sgtk2tujdhu5ilscvtb2i.apps.googleusercontent.com',
  appId: '1:765600039261:android:de59bc03f2f3c1030ba8b4',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

