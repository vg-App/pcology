import { toastr } from 'react-redux-toastr'
import { DELETE_EVENT, FETCH_EVENTS } from './SearchConstants'
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions'
import { createNewEvent } from '../../app/common/util/helpers'
import moment from 'moment'
import firebase from '../../app/config/firebase'
import { fetchSampleData } from '../../app/data/mockAPI'

export const getEventsForDashboard = lastEvent => async (
  dispatch,
  getState
) => {
  let today = new Date(Date.now())
  const firestore = firebase.firestore()
  const eventsRef = firestore.collection('events')
  try {
    dispatch(asyncActionStart())
    let startAfter =
      lastEvent &&
      (await firestore
        .collection('events')
        .doc(lastEvent.id)
        .get())
    let query

    lastEvent
      ? (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2))
      : (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .limit(2))

    let querySnap = await query.get()

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish())
      return querySnap
    }

    let events = []

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id }
      events.push(evt)
    }
    dispatch({ type: FETCH_EVENTS, payload: { events } })
    dispatch(asyncActionFinish())
    return querySnap
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  }
}

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const user = firestore.auth().currentUser
    const photoURL = getState().firebase.profile.photoURL
    let newEvent = createNewEvent(user, photoURL, event)
    try {
      let createdEvent = await firestore.add(`events`, newEvent)
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      })
      toastr.success('Έγινε!', 'Το άρθρο δημιουργήθηκε')
    } catch (error) {
      toastr.error('Ωχ', 'Παρουσιάστηκε κάποιο σφάλμα')
    }
  }
}

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()

    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate()
    }
    try {
      await firestore.update(`events/${event.id}`, event)
      toastr.success('Έγινε!', 'Το άρθρο ενημερώθηκε')
    } catch (error) {
      console.log(error)
      toastr.error('Ωχ', 'Παρουσιάστηκε κάποιο σφάλμα')
    }
  }
}

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  const message = cancelled
    ? 'Είσαι σίγουρος ότι θέλεις να απενεργοποιήσεις το συγκεκριμένο άρθρο;'
    : 'Αυτό θα ενεργοποιήσει το συγκεκριμένο άρθρο- είσαι σίγουρος;'
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart())
      let events = await fetchSampleData()
      dispatch(fetchEvents(events))
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const addEventComment = (eventId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  const profile = getState().firebase.profile
  const user = firebase.auth().currentUser
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  }
  try {
    await firebase.push(`event_chat/${eventId}`, newComment)
  } catch (error) {
    console.log(error)
    toastr.error('Oops', 'Problem adding comment')
  }
}
export const searchEvent = category => async (dispatch, getState) => {
  let option = category
  const firestore = firebase.firestore()
  const eventsRef = firestore.collection('events')
  try {
    dispatch(asyncActionStart())
    let startAfter = category && (await firestore.collection('events').get())
    let query

    category
      ? (query = eventsRef
          .where('category', '==', option)
          .orderBy('category')
          .startAfter(startAfter)
          .limit(2))
      : (query = eventsRef
          .where('category', '==', option)
          .orderBy('category')
          .limit(2))

    let querySnap = await query.get()

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish())
      return querySnap
    }

    let events = []

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id }
      events.push(evt)
    }
    dispatch({ type: FETCH_EVENTS, payload: { events } })
    dispatch(asyncActionFinish())
    return querySnap
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}
