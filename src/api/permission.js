import { auth, db } from './firebase-config';

export const isAdmin = async () =>
  await db
    .collection('users')
    .where('email', '==', auth.currentUser.email)
    .get()
    .then((querySnapshot) => querySnapshot.docs[0].data().admin);

export const isOwner = async (id) => {
  const userEmail = auth.currentUser.email;

  const authorEmail = await db
    .collection('conferences')
    .doc(id)
    .get()
    .then((d) => d.data().author);

  return userEmail === authorEmail;
};

export const isAdminOrOwner = async (id) => (await isAdmin()) || (await isOwner(id));

export const isAdminOrUser = async (id) => {
  const userEmail = await db
    .collection('users')
    .doc(id)
    .get()
    .then((d) => d.data().email);

  return (await isAdmin()) || userEmail === auth.currentUser.email;
};

export const isReviewer = async (reviewerEmail) => {
  const userEmail = auth.currentUser.email;

  return userEmail === reviewerEmail;
};
