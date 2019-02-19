import React, { Component } from 'react'
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import TextInput from '../../../app/common/form/TextInput'
import RadioInput from '../../../app/common/form/RadioInput'

class BasicPage extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Όνομα"
          />
          <Form.Group inline>
            <label>Φύλο: </label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Άνδρας"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="female"
              label="Γυναίκα"
              component={RadioInput}
            />
          </Form.Group>
          <Divider />
          <Button
            disabled={pristine || submitting}
            size="large"
            positive
            content="Ενημέρωση προφίλ"
          />
        </Form>
      </Segment>
    )
  }
}

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  destroyOnUnmount: false
})(BasicPage)
