import React from 'react'
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon
} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators
} from 'revalidate'
import TextInput from '../../../app/common/form/TextInput'
import { Link } from '@material-ui/core'

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Παρακαλώ προσθέστε ένα νέο κωδικό' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Παρακαλώ επιβεβαιώστε το νέο κωδικό' }),
    matchesField('newPassword1')({
      message: 'Οι κωδικοί δεν είναι αντιστοιχίζονται'
    })
  )()
})

const AccountPage = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword,
  providerId
}) => {
  return (
    <Segment>
      <Header dividing size="large" content="Ο λογαριασμός μου" />
      {providerId && providerId === 'password' && (
        <div>
          <Header color="teal" sub content="Αλλαγη κωδικου" />
          <p>Χρησιμοποιήσε αυτή τη φόρμα για να αλλάξεις τον κωδικό σου</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="Νέος κωδικός"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Ενημέρωση κωδικού"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Divider />
            <Button
              disabled={invalid || submitting}
              size="large"
              positive
              content="Ενημέρωση κωδικού"
            />
          </Form>
        </div>
      )}

      {providerId && providerId === 'facebook.com' && (
        <div>
          <Header color="teal" sub content="Λογαριασμος Facebook" />
          <p>
            Επισκεφθείτε το Facebook για να αλλάξετε τις ρυθμίσεις στο
            λογαριασμό σας
          </p>
          <Button type="button" color="facebook">
            <Icon name="facebook" as={Link} />
            Μετάβαση στο Facebook
          </Button>
        </div>
      )}

      {providerId && providerId === 'google.com' && (
        <div>
          <Header color="teal" sub content="Λογαριασμος Google" />
          <p>
            Επισκεφθείτε το Google για να αλλάξετε τις ρυθμίσεις στο λογαριασμό
            σας
          </p>
          <Button type="button" color="google plus">
            <Icon name="google plus" />
            Μετάβαση στο Google
          </Button>
        </div>
      )}
    </Segment>
  )
}

export default reduxForm({ form: 'account', validate })(AccountPage)
