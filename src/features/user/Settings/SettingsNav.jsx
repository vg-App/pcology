import React from 'react'
import { Grid, Menu, Header, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import logo from '../../../myphoto/pic9.gif'

const SettingsNav = () => {
  return (
    <Grid.Column width={4}>
      <Menu vertical>
        <Header
          icon="user"
          attached
          inverted
          color="grey"
          content="Το προφίλ μου"
        />
        <Menu.Item as={NavLink} to="/settings/basic">
          Βασικά στοιχεία
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/about">
          Σχετικά με εμένα
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/photos">
          Οι φωτογραφίες μου
        </Menu.Item>
      </Menu>
      <Grid.Row />
      <Menu vertical>
        <Header
          icon="settings"
          attached
          inverted
          color="grey"
          content="Ρυθμίσεις λογαριασμού"
        />
        <Menu.Item as={NavLink} to="/settings/account">
          Ο λογαριασμός μου
        </Menu.Item>
      </Menu>
      <Image src={logo} />
    </Grid.Column>
  )
}

export default SettingsNav
