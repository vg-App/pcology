import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../../../myphoto/pic1.gif'

const EventDetailedSidebar = ({ attendees }) => {
  return (
    <div>
      <Segment>
        <Image as={Link} to="/events" src={logo} />
      </Segment>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        Αρέσει στους
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees &&
            attendees.map(attendee => (
              <Item key={attendee.id} style={{ position: 'relative' }}>
                {attendee.host && (
                  <Label
                    style={{ position: 'absolute' }}
                    color="orange"
                    ribbon="right"
                  >
                    Συντάκτης
                  </Label>
                )}
                <Item.Image size="tiny" src={attendee.photoURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${attendee.id}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </List>
      </Segment>
    </div>
  )
}

export default EventDetailedSidebar
