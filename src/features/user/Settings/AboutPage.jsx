import React from 'react'
import {
  Button,
  Divider,
  Form,
  Header,
  Segment,
  Image
} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import PlaceInput from '../../../app/common/form/PlaceInput'
import SelectInput from '../../../app/common/form/SelectInput'
import logo from '../../../myphoto/pic7.gif'

const interests = [
  { key: 'development', text: 'Development', value: 'development' },
  { key: 'photoshooting', text: 'Photoshooting', value: 'photoshooting' },
  { key: 'interesting', text: 'Interesting', value: 'interesting' },
  { key: 'tips', text: 'Tips', value: 'tips' },
  { key: 'news', text: 'News', value: 'news' },
  { key: 'stories', text: 'Stories', value: 'stories' }
]

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Header dividing size="large" content="Σχετικά με εμένα" />
      <p>Συμπλήρωσε την παρακάτω φόρμα, για καλύτερη εμπειρία στο PCology</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Divider />
        <label>Μερικά πράγματα για μένα:</label>
        <Field
          name="about"
          component={TextArea}
          placeholder="Σχετικά με εμένα"
        />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Ενδιαφέρομαι για:"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Ενασχόληση:"
        />
        <Field
          width={8}
          name="origin"
          options={{ types: ['(regions)'] }}
          component={PlaceInput}
          placeholder="Καταγωγή:"
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size="large"
          positive
          content="Ενημέρωση προφίλ"
        />
      </Form>
      <Image src={logo} />
    </Segment>
  )
}

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  destroyOnUnmount: false
})(AboutPage)
