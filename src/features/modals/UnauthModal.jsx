import React, { Component } from 'react'
import { Modal, Button, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { closeModal, openModal } from './modalActions'

const actions = { closeModal, openModal }

class UnauthModal extends Component {
  handleCloseModal = () => {
    if (this.props.location.pathname.includes('/event')) {
      this.props.closeModal()
    } else {
      this.props.history.goBack()
      this.props.closeModal()
    }
  }

  render() {
    const { openModal /*closeModal*/ } = this.props
    return (
      <Modal size="mini" open={true} onClose={this.handleCloseModal}>
        <Modal.Header>
          Πρέπει να είσαι συνδεδεμένος για να το κάνεις αυτό!
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              Παρακαλώ συνδεθείτε ή εγγραφείτε για να δείτε το περιέχομενο της
              σελίδας
            </p>
            <Button.Group widths={4}>
              <Button
                fluid
                color="teal"
                onClick={() => openModal('LoginModal')}
              >
                Σύνδεση
              </Button>
              <Button.Or />
              <Button fluid positive onClick={() => openModal('RegisterModal')}>
                Εγγραφή
              </Button>
            </Button.Group>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <p>Ή πατήστε ακύρωση για να συνεχίσετε ως επισκέπτης</p>
              <Button onClick={this.handleCloseModal}>Ακύρωση</Button>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(UnauthModal)
)
