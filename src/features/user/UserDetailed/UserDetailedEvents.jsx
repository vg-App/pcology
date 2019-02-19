import React from 'react'
import { Card, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserDeteiledEvents = ({ events, eventsLoading, hoster }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="book" content="Δημοσιεύσεις του χρήστη" />

        <br />
        <Card.Group itemsPerRow={5}>
          {events &&
            events.map(event => (
              <React.Fragment>
                {event.hostedBy === hoster && (
                  <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                    <Image
                      src={`/assets/categoryImages/${event.category}.jpg`}
                    />
                    <Card.Content>
                      <Card.Header textAlign="center">
                        {event.title}
                      </Card.Header>
                      <Card.Meta textAlign="center" />
                    </Card.Content>
                  </Card>
                )}
              </React.Fragment>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  )
}

export default UserDeteiledEvents
