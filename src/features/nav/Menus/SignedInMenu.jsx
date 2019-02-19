import React from 'react'
import { Menu, Image, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SignedInMenu = ({ signOut, profile, auth }) => {
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={profile.photoURL || '/assets/user.png'}
      />
      <Dropdown pointing="top left" text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Δημιουργία άρθρου"
            icon="plus"
          />
          {/*<Dropdown.Item text="Τα άρθρα μου" icon="book" />*/}
          <Dropdown.Item
            as={Link}
            to="/people"
            text="Οι φίλοι μου"
            icon="users"
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${auth.uid}`}
            text="Το προφίλ μου"
            icon="user"
          />
          <Dropdown.Item
            as={Link}
            to="/settings"
            text="Ρυθμίσεις"
            icon="settings"
          />
          <Dropdown.Item onClick={signOut} text="Αποσύνδεση" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu
