import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withFirestore } from 'react-redux-firebase'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { combineValidators, isRequired } from 'revalidate'
import {
  createEvent,
  updateEvent,
  cancelToggle,
  searchEvent
} from '../SearchActions'

import SelectInput from '../../../app/common/form/SelectInput'

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
  cancelToggle,
  searchEvent
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
  category: isRequired({ message: 'Παρακαλώ επιλέξτε μια κατηγορία' })
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false,
    searches: ''
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true })

  onFormSubmit = event => {
    this.setState({
      searches: event.target.value
    })
  }

  render() {
    return (
      <Grid>
        <Grid.Column>
          <Segment>
            <Header sub color="teal" content="Επιλογη κατηγοριας" />
            <Form
              value={this.state.searches}
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            >
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="Σε ποιά κατηγορία ανήκει"
              />
            </Form>
          </Segment>
          <Button positive type="submit">
            Αναζήτηση
          </Button>
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
