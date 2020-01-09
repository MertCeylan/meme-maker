import app from 'firebase/app';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyByjavVLATuroEl206s7hF5ZoKra-bhomc',
  authDomain: 'meme-maker-d94c0.firebaseapp.com',
  databaseURL: 'https://meme-maker-d94c0.firebaseio.com',
  projectId: 'meme-maker-d94c0',
  storageBucket: 'meme-maker-d94c0.appspot.com',
  messagingSenderId: '86441880681',
  appId: '1:86441880681:web:794657ea1fe7dd693546f8'
};
app.initializeApp(config);

const storage = app.storage();
const storageRef = app.storage().ref();
export default app;
export { storage, storageRef };
