import React, { Component } from 'react'
import { Grid, Item, Segment, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
//import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { getEventsForDashboard } from '../homepageActions'
//import EventList from '../HomepageList/HomepageList'
import EventActivity from '../HomepageActivity/HomepageActivity'
import logo from '../../../myphoto/download.png'
import who from '../../../myphoto/who.jpg'
import target from '../../../myphoto/target.png'
import contact from '../../../myphoto/contact.jpg'

const mapState = state => ({
  events: state.firestore.ordered.events,
  activities: state.firestore.ordered.activity
})

const actions = {
  getEventsForDashboard
}

class HomepageDashboard extends Component {
  state = {
    moreEvents: false,
    loadedEvents: [],
    contextRef: {}
  }

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard()

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      })
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { activities } = this.props
    //const { events } = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Description>
                    <Image src={logo} alt="pcology.gr logo" />
                  </Item.Description>
                </Item.Content>
              </Item>
              <div class="ui divider" />
              <Item>
                <Item.Image src={who} alt="pcology.gr who" />
                <Item.Content>
                  <Item.Header>Ποιοί είμαστε</Item.Header>
                  <Item.Description>
                    Είμαστε μια ομάδα ατόμων που μας ενώνει η αγάπη μας για την
                    τεχνολογία και η διαρκής αναζήτηση πληροφοριών και γνώσεων
                    για το αντικείμενο που λατρεύουμε. Θέλουμε να μοιραστούμε με
                    τους άλλους τις υπάρχουσες γνώσεις μας αλλά και να
                    αποκτήσουμε καινούργιες μέσα από το pcology
                  </Item.Description>
                </Item.Content>
              </Item>
              <div class="ui divider" />
              <Item>
                <Item.Image src={target} alt="pcology.gr target" />
                <Item.Content>
                  <Item.Header>Ο στόχος μας</Item.Header>
                  <Item.Description>
                    Στόχος μας είναι η δημιουργία μιας κοινότητας με κοινά
                    ενδιαφέροντα, όπου ο καθένας θα μπορεί να δημοσιεύει το δικό
                    του άρθρο, να σχολιάζει άρθρα άλλων, να δηλώνει αν του
                    αρέσει το άρθρο που διαβάζεις και να ακολουθεί τους
                    αγαπημένους του συντάκτες
                  </Item.Description>
                </Item.Content>
              </Item>
              <div class="ui divider" />
              <Item>
                <Item.Image src={contact} alt="pcology.gr contact" />
                <Item.Content>
                  <Item.Header>Επικοινωνία</Item.Header>
                  <Item.Description>
                    Επικοινωνήστε μαζί μας για οποιοδήποτε πρόβλημα και αν
                    αντιμετωπίζετε, αλλά και ιδεές για βελτίωση του pcology.gr{' '}
                    <a href="mailto:vg.appsolution@gmail.com">
                      vg.appsolution@gmail.com
                    </a>{' '}
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity
            activities={activities}
            contextRef={this.state.contextRef}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
export default connect(
  mapState,
  actions
)(
  firestoreConnect([{ collection: 'events' }, { collection: 'activity' }])(
    HomepageDashboard
  )
)
