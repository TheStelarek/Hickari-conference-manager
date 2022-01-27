import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from './firebase-config';

export const getPresentation = async () => {
  const presentationsList = [];
  await db
    .collection('presentation')
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        presentationsList.push(doc.data());
      });
    });

  return presentationsList;
};
