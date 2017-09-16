import React from 'react'

import {
  Decoration,
  MenuBar,
  MenuContainer,
  MenuItem,
  LogoContainer,
  Logo
} from './elements'

class TopBar extends React.Component {
  render() {
    return (
      <div>
        <Decoration />
        <MenuBar>
          <MenuContainer>
            <LogoContainer>
              <Logo />
            </LogoContainer>

            <MenuItem to="/dashboard">Лента трат</MenuItem>
            <MenuItem to="/review">Ретроспектива</MenuItem>
          </MenuContainer>
        </MenuBar>
      </div>
    )
  }
}

export default TopBar
