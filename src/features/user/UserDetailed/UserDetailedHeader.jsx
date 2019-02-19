import React from 'react'
import { Grid, Header, Item, Segment, Image } from 'semantic-ui-react'
import logo from '../../../myphoto/pic2.gif'
import ad from '../../../myphoto/picad.jpg'

const UserDetailedHeader = ({ profile }) => {
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size="small"
              src={profile.photoURL || '/assets/user.png'}
            />
            <Item.Content verticalAlign="bottom">
              <Image src={logo} />
              <Header as="h1">{profile.displayName}</Header>{' '}
              <Header as="h4">
                {' ' + profile.occupation}
                {profile.admin === true && (
                  <Image src={ad} width="10%" heigth="10%" />
                )}
              </Header>
              <br />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailedHeader
