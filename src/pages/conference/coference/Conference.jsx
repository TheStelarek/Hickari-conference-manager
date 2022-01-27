import { getConferenceDetails, updateConference, deleteConference } from '../../../api/firebase-conference';
import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../../../api/firebase-user';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { getPresentation } from '../../../api/firebase-presentation';
import { db } from '../../../api/firebase-config';
import { isAdmin, isOwner, isAdminOrOwner } from '../../../api/permission';

function Conference(props) {
  const [obj, setObj] = useState({});

  //PERMISSIONS START
  const [admin, setAdmin] = useState(false);
  const [setOwner] = useState(false);
  const [adminOrOwner, setAdminOrOwner] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  //PERMISSIONS START

  //COMMITTEE START
  const addCommittee = () => {
    const updated = obj.committee;
    updated.push({ id: obj.committee.length + 1, name: '' });
    setObj((s) => ({ ...s, committee: updated }));
  };

  const handleCommitteeChange = (e, index) => {
    const updateObject = obj;
    updateObject.committee[index].name = e.target.value;
    setObj(updateObject);
  };

  const handleCommitteeRemove = (ind) => {
    const updateObject = obj.committee.filter((i) => i.name !== ind);
    setObj((s) => ({ ...s, committee: updateObject }));
  };
  //COMMITTEE STOP

  //Reviewer START
  const addReviewer = () => {
    const updateObject = obj.reviewer;
    updateObject.push({ id: obj.reviewer.length + 1, name: '' });
    setObj((s) => ({ ...s, reviewer: updateObject }));
  };

  const handleReviewerChange = (e, index) => {
    const updateObject = obj;
    updateObject.reviewer[index].name = e.target.value;
    setObj(updateObject);
  };

  const handleReviewerRemove = (ind) => {
    const updateObject = obj.reviewer.filter((i) => i.name !== ind);
    setObj((s) => ({ ...s, reviewer: updateObject }));
  };
  //Reviewer STOP

  const paymentStatus = (index) => {
    const updatedObject = obj;
    updatedObject.participants[index].paid = !updatedObject.participants[index].paid;
    setObj(updatedObject);
  };

  //SEND EMAILREMINDER START
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_a3op7wn', 'template_kxttcsh', form.current, 'user_BFhEkoC7UGOiZRQsyPuLI').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };
  //SEND EMAILREMINDER STOP

  //GET PRESENTATIONS START
  const [setPresentations] = useState([]);
  //GET PRESENTATIONS END

  //SET GRADE START
  const [grade, setGrade] = useState(null);
  //tablica recenzentow
  const reviewers = obj.reviewer;

  async function addReview(presentationAuthor, reviewerEmail) {
    //id konferencji
    const id = props.match.params.id;

    //zpuszowanie oceny do kopi tablicy participants
    const index = obj.participants.findIndex((p) => p.name === presentationAuthor);
    obj.participants[index].presentation.push({ reviewer: reviewerEmail, grade: grade });

    //update tablicy participants
    await db.collection('conferences').doc(id).update({
      participants: obj.participants,
    });
  }
  //SET GRADE STOP END

  useEffect(async () => {
    async function getConf() {
      setObj(await getConferenceDetails(props.match.params.id));
    }
    getConf();
    //GET PRESENTATIONS START
    async function getPres() {
      setPresentations(await getPresentation());
    }
    getPres();
    //GET PRESENTATIONS END
    //GET PERMISSIONS START
    setAdmin(await isAdmin());
    setOwner(await isOwner(props.match.params.id));
    setAdminOrOwner(await isAdminOrOwner(props.match.params.id));
    setCurrentUserEmail(auth.currentUser.email);
    //GET PERMISSIONS END
  }, []);
  const update = (e) => setObj((p) => ({ ...p, [e.target.name]: e.target.value }));
  return (
    <Container className="login">
      {obj && (
        <Box>
          <Wrapper>
            <h1>Dane konferencji</h1>
            <PierwszyLabel>
              Title:
              <Input type="text" className="login__textBox" name="title" value={obj.title} onChange={update} placeholder="Title" />
            </PierwszyLabel>
            <label>
              Date:
              <Input type="date" className="login__textBox" name="date" value={obj.date} onChange={update} placeholder="Date" />
            </label>
            <label>
              Starts at:
              <Input type="time" className="login__textBox" name="start" value={obj.start} onChange={update} placeholder="Conference start at" />
            </label>
            <label>
              Ends at:
              <Input type="time" className="login__textBox" name="end" value={obj.end} onChange={update} placeholder="Conference end at" />
            </label>
            <label>
              max participants:
              <Input
                type="number"
                className="login__textBox"
                name="maxParticipants"
                value={obj.maxParticipants}
                onChange={update}
                placeholder="Conference end at"
              />
            </label>
            <label>
              description:
              <Input
                type="textarea"
                className="login__textBox"
                name="description"
                value={obj.description}
                onChange={update}
                placeholder="Conference end at"
              />
            </label>
            {/* COMMITTEE START------------------------------------------------------------------------------------------ */}
            {admin && (
              <Oddzielacz>
                <h1>Komisja</h1>
                {obj.committee && !!obj.committee.length && (
                  <div>
                    {obj.committee.map((person, index) => {
                      return (
                        <div key={person.id}>
                          <Input defaultValue={person.name} onChange={(e) => handleCommitteeChange(e, index)} />
                          <Guzik onClick={() => handleCommitteeRemove(person.name)}>Remove</Guzik>
                        </div>
                      );
                    })}
                  </div>
                )}
                <AddGuzik onClick={addCommittee}>Add Committee</AddGuzik>
              </Oddzielacz>
            )}
            {/* COMMITTEE END------------------------------------------------------------------------------------------ */}
            {/* REVIEWER START------------------------------------------------------------------------------------------ */}
            {admin && (
              <Oddzielacz>
                <h1>Recenzent</h1>
                {obj.reviewer && !!obj.reviewer.length && (
                  <div>
                    {obj.reviewer.map((person, index) => {
                      return (
                        <div key={person.id}>
                          <Input defaultValue={person.name} onChange={(e) => handleReviewerChange(e, index)} />
                          <Guzik onClick={() => handleReviewerRemove(person.name)}>Remove</Guzik>
                        </div>
                      );
                    })}
                  </div>
                )}
                <AddGuzik onClick={() => addReviewer()}>Add Reviewer</AddGuzik>
              </Oddzielacz>
            )}
            {/* REVIEWER END------------------------------------------------------------------------------------------ */}
            {/* PARTICIPANT START-------------------------------------------------------------------------------------- */}
            {obj.participants && !!obj.participants.length && (
              <Lista>
                <h1>Status płatności</h1>
                {obj.participants.map((d, index) => (
                  <Oddzielacz key={d.name}>
                    <label>
                      <p>Name: {d.name}</p>
                    </label>
                    {/* PAYMENT STATUS & REMINDER START */}
                    {admin && (
                      <div>
                        <label>
                          Paid:
                          <Check
                            type="checkbox"
                            className="login__textBox"
                            name="paid"
                            value={d.paid}
                            defaultChecked={d.paid}
                            onChange={() => paymentStatus(index)}
                          />
                        </label>
                        {!d.paid && (
                          <form ref={form} onSubmit={sendEmail}>
                            <input hidden name={'user_email'} value={d.name} />
                            <Wysylacz type="submit" value="Payment reminder" />
                          </form>
                        )}
                      </div>
                    )}
                    {/* PAYMENT STATUS & REMINDER STOP */}
                    {/* reviewer grades START */}
                    {reviewers.map((r) => (
                      <Lista key={r.name}>
                        {currentUserEmail === r.name && (
                          <div>
                            <label>{r.name}</label>
                            <select name="grade" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                              <option disabled selected value="">
                                0
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                            {/* d.name = email autora */}
                            {/* r.name = email recenzenta */}
                            <button onClick={() => addReview(d.name, r.name)}>Add review</button>
                          </div>
                        )}
                      </Lista>
                    ))}
                    {/* reviewer grades END */}
                  </Oddzielacz>
                ))}
              </Lista>
            )}
            {/* PARTICIPANT END----------------------------------------------------------- */}
            {/* UPDATE / DELETE BUTTON START */}
            {adminOrOwner && (
              <div>
                <Guzik
                  className="login__btn"
                  onClick={() =>
                    updateConference(
                      obj.title,
                      obj.date,
                      obj.start,
                      obj.end,
                      obj.maxParticipants,
                      obj.description,
                      obj.participants,
                      obj.committee,
                      obj.reviewer,
                      props.match.params.id
                    )
                  }
                >
                  Update
                </Guzik>
                <OstatniGuzik onClick={() => deleteConference(props.match.params.id)}>Delete</OstatniGuzik>
              </div>
            )}
            {/* UPDATE / DELETE BUTTON END */}
          </Wrapper>
        </Box>
      )}
    </Container>
  );
}

export default Conference;

const Guzik = styled.button`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: 1px black solid;
  background-color: white;
  margin-left: 31px;

  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const Wysylacz = styled.input`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: 1px black solid;
  background-color: white;
  margin-left: 31px;
  width: 93%;
  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const AddGuzik = styled.button`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: 1px black solid;
  background-color: white;
  margin-left: 31px;
  width: 220px;
  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const Oddzielacz = styled.div`
  margin-top: 30px;
`;

const Lista = styled.ul`
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  padding-left: 50px;
  padding-right: 50px;
`;

const OstatniGuzik = styled.button`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: 1px black solid;
  background-color: white;
  margin-left: 31px;
  margin-bottom: 30px;
  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const PierwszyLabel = styled.label`
  margin-top: 30px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 1px gray;
  margin-left: 10px;
  font-size: 14px;
  font-weight: lighter;
`;

const Check = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 1px gray;
  z-index: 200;
  padding: 10px;
  font-size: 20px;
  font-weight: lighter;
`;

const Box = styled.div`
  display: flex;

  width: 30%;
  margin: auto;
  margin-top: 100px;
  gap: 15px;
  border: 1px lightgray solid;
  background-color: lightgray;
  border-radius: 12px;
  flex-direction: column;
  margin-bottom: 60px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Container = styled.div`
  min-height: 95vh;
  height: 100%;
  overflow: auto;
  width: 100vw;
  background: linear-gradient(135deg, LightSeaGreen, DarkOrchid, LightSeaGreen);
`;
