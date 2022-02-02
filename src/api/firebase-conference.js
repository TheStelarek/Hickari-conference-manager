import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth, db } from './firebase-config';
import { isAdminOrOwner } from './permission';

const addConference = async (title, date, start, end, description, maxParticipants, committee, reviewer) => {
  const user = auth.currentUser.email;
  try {
    await db.collection('conferences').add({
      title,
      date,
      start,
      end,
      description,
      maxParticipants,
      participants: [],
      committee,
      reviewer,
      author: user,
    });
  } catch (err) {
    alert(err.message);
  }
};

const getConferencesList = async () => {
  const dataList = [];
  await db
    .collection('conferences')
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        dataList.push({ ...doc.data(), id: doc.id, ...doc.data().participants.name });
      });
    });
  return dataList;
};

const getConferenceDetails = (conferenceId) => {
  return db
    .collection('conferences')
    .doc(conferenceId)
    .get()
    .then((d) => d.data());
};

const updateConference = async (title, date, start, end, maxParticipants, description, participants, committee, reviewer, id) => {
  try {
    await db.collection('conferences').doc(id).update({
      title,
      date,
      start,
      end,
      maxParticipants,
      description,
      participants,
      committee,
      reviewer,
    });
  } catch (err) {
    alert(err.message);
  }
};

const deleteConference = async (id) => {
  if (await isAdminOrOwner(id)) {
    try {
      await db.collection('conferences').doc(id).delete();
    } catch (err) {
      alert(err.message);
    }
  }
};

const joinCoference = async (id) => {
  const user = auth.currentUser.email;
  var obj;
  var participant = {
    name: user,
    paid: false,
    link: '',
    presentation: [],
  };

  try {
    obj = await db
      .collection('conferences')
      .doc(id)
      .get()
      .then((d) => d.data());

    if (!obj.participants.filter((d) => d.name === user).length && obj.participants.length < obj.maxParticipants) {
      obj.participants.push(participant);
      await db.collection('conferences').doc(id).update({
        participants: obj.participants,
      });
      alert('Save!');
    } else if (!obj.participants.filter((d) => d.name === user).length && obj.participants.length >= obj.maxParticipants) {
      alert('Conference is full!');
    } else {
      alert('You already enter conference.');
    }
  } catch (err) {
    alert(err.message);
  }
};

const leaveCoference = async (id) => {
  const user = auth.currentUser.email;
  var obj;
  try {
    obj = await db
      .collection('conferences')
      .doc(id)
      .get()
      .then((d) => d.data());

    if (obj.participants.filter((d) => d.name === user).length) {
      const newParticipants = obj.participants.filter((d) => d.name !== user);
      await db.collection('conferences').doc(id).update({
        participants: newParticipants,
      });
      alert('You left conference.');
    } else {
      alert('You are not on the list.');
    }
  } catch (err) {
    alert(err.message);
  }
};

export { addConference, getConferencesList, getConferenceDetails, updateConference, deleteConference, joinCoference, leaveCoference };
