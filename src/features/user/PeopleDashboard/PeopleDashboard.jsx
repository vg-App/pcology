import React from 'react'
import { Grid, Segment, Header, Card, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import PersonCard from './PersonCard'
import logo from '../../../myphoto/pic13.gif'

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'following' }],
      storeAs: 'following'
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'followers' }],
      storeAs: 'followers'
    }
  ]
}

const mapState = state => ({
  followings: state.firestore.ordered.following,
  followers: state.firestore.ordered.followers,
  auth: state.firebase.auth
})

const PeopleDashboard = ({ followings, followers }) => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="Άτομα που με ακολουθούν" />
          <Card.Group itemsPerRow={8} stackable>
            {followers &&
              followers.map(follower => (
                <PersonCard key={follower.id} user={follower} />
              ))}
          </Card.Group>
        </Segment>
      </Grid.Column>
      <Grid.Column width={16}>
        <Segment>
          <Image src={logo} width="100%" height="20%" />
        </Segment>
      </Grid.Column>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="Άτομα που ακολουθώ" />
          <Card.Group itemsPerRow={8} stackable>
            {followers &&
              followings.map(following => (
                <PersonCard key={following.id} user={following} />
              ))}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  connect(mapState),
  firestoreConnect(props => query(props))
)(PeopleDashboard)
