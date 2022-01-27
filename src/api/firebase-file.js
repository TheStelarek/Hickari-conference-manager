import { ref } from 'firebase/storage';
import { getStorage, listAll } from 'firebase/storage';
import { app } from 'api/firebase-config';

export const listItem = () => {
  const storage = getStorage(app);
  const listRef = ref(storage, 'files/');

  return listAll(listRef);
};
