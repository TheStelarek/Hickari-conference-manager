import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth, db } from './firebase-config';

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password).then(() => {
      window.location.reload();
      window.location = '/';
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (username, email, password, number, adresss, nrpesel) => {
  try {
    await db.collection('users').add({
      number,
      username,
      email,
      nrpesel,
      adresss,
      admin: false,
      authProvider: 'local',
    });

    await firebase.auth().currentUser.updateProfile({
      displayName: username,
      photoURL: '',
      phoneNumber: number,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email).then(() => {
      alert('Password reset link sent!');
      window.location.reload();
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut().then(() => {
    window.location = '/';
  });
};

const usersList = async () => {
  const dataList = [];
  await db
    .collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        dataList.push({ ...doc.data(), id: doc.id });
      });
    });
  return dataList;
};

const getUserDetails = (userId) => {
  return db
    .collection('users')
    .doc(userId)
    .get()
    .then((d) => d.data());
};

const updateUser = async (adress, pesel, phoneNumber, username, id) => {
  try {
    await db.collection('users').doc(id).update({
      adress,
      pesel,
      phoneNumber,
      username,
      id,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const deleteUser = async (id) => {
  try {
    await db.collection('users').doc(id).delete();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  usersList,
  getUserDetails,
  updateUser,
  deleteUser,
};
