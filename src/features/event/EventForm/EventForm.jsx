import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withFirestore } from 'react-redux-firebase'

import { Segment, Form, Button, Grid, Header, Image } from 'semantic-ui-react'
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate'
import { createEvent, updateEvent, cancelToggle } from '../eventActions'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'

import logo from '../../../myphoto/pic4.gif'

const mapState = (state, ownProps) => {
  let event = {}

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }

  return {
    initialValues: event,
    event,
    loading: state.async.loading
  }
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
}

const category = [
  { key: 'development', text: 'Development', value: 'development' },
  { key: 'photoshooting', text: 'Photoshooting', value: 'photoshooting' },
  { key: 'interesting', text: 'Interesting', value: 'interesting' },
  { key: 'tips', text: 'Tips', value: 'tips' },
  { key: 'news', text: 'News', value: 'news' },
  { key: 'stories', text: 'Stories', value: 'stories' }
]

const validate = combineValidators({
  title: isRequired({ message: 'Ο τίτλος του άρθρου είναι απαραίτητος' }),
  category: isRequired({ message: 'Παρακαλώ επιλέξτε μια κατηγορία' }),
  description: composeValidators(
    isRequired({ message: 'Παρακαλώ προσθέστε το κείμενο του άρθρου' }),
    hasLengthGreaterThan(4)({
      message: 'Θα πρέπει το άρθρο να είναι μεγαλύτερο από 5 χαρακτήρες'
    })
  )()
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const { firestore, match } = this.props
    await firestore.setListener(`events/${match.params.id}`)
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props
    await firestore.unsetListener(`events/${match.params.id}`)
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true })

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng
      }
      this.props.updateEvent(values)
      this.props.history.goBack()
    } else {
      this.props.createEvent(values)
      this.props.history.push('/events')
    }
  }

  render() {
    const {
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle,
      loading
    } = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Λεπτομερειες αρθρου" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Τίτλος άρθρου"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="Σε ποιά κατηγορία ανήκει"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Κύριο μέρος του άρθρου"
              />

              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Δημοσίευση
              </Button>
              <Button
                disabled={loading}
                onClick={this.props.history.goBack}
                type="button"
              >
                Ακύρωση
              </Button>
              <Button
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type="button"
                color={event.cancelled ? 'green' : 'red'}
                floated="right"
                content={
                  event.cancelled ? 'Επανεργοποίηση άρθρου' : 'Ακύρωση άρθρου'
                }
              />
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Image src={logo} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
      EventForm
    )
  )
)
