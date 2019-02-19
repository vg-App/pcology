import React, { Component } from 'react'
import { Segment, Item, Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
//import EventListAttendee from './EventListAttendee'
//import format from 'date-fns/format'
//import { objectToArray } from '../../../app/common/util/helpers'

class EventListItem extends Component {
  render() {
    const { event } = this.props
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/event/${event.id}`}>
                  {event.title}
                </Item.Header>
                <Item.Description>
                  Δημοσιοποιήθηκε από{' '}
                  <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                </Item.Description>
                {event.cancelled && (
                  <Label
                    style={{ top: '-40px' }}
                    ribbon="right"
                    color="red"
                    content="Το άρθρο έχει αποσυρθεί"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        <Segment clearing>
          {event.cancelled ? (
            <Button
              disabled
              as={Link}
              to={`/event/${event.id}`}
              color="teal"
              floated="right"
              content="Προβολή"
            />
          ) : (
            <Button
              as={Link}
              to={`/event/${event.id}`}
              color="teal"
              floated="right"
              content="Προβολή"
            />
          )}
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventListItem
