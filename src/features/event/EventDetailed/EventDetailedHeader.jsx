import React from 'react'
import { Segment, Image, Item, Header, Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const eventImageStyle = {
  filter: 'brightness(30%)'
}

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
}

const EventDetailedHeader = ({
  openModal,
  authenticated,
  loading,
  event,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />

                <p>
                  Δημιουργία από <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <div>
            {isGoing && !event.cancelled && (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Δεν μου αρέσει
              </Button>
            )}

            {!isGoing && authenticated && (
              <Button
                loading={loading}
                onClick={() => goingToEvent(event)}
                color="teal"
              >
                Μου αρέσει
              </Button>
            )}

            {!authenticated && !event.cancelled && (
              <Button
                loading={loading}
                onClick={() => openModal('UnauthModal')}
                color="teal"
              >
                Μου αρέσει
              </Button>
            )}

            {event.cancelled && !isHost && (
              <Label
                size="large"
                color="red"
                content="Το άρθρο έχει αποσυρθεί"
              />
            )}
          </div>
        )}

        {isHost && (
          <Button as={Link} to={`/manage/${event.id}`} color="orange">
            Επεξεργασία
          </Button>
        )}
      </Segment>
    </Segment.Group>
  )
}

export default EventDetailedHeader
