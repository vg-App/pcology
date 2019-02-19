import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

const SignedOutMenu = ({ signIn, register }) => {
  return (
    <Menu.Item position="right">
      <Button onClick={signIn} basic inverted content="Σύνδεση" />
      <Button
        onClick={register}
        basic
        inverted
        content="Εγγραφή"
        style={{ marginLeft: '0.5em' }}
      />
    </Menu.Item>
  )
}

export default SignedOutMenu
