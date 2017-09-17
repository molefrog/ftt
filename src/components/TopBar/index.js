import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { isLoggedIn } from '../../store/modules/session'

import {
  Decoration,
  MenuBar,
  MenuContainer,
  MenuItem,
  LogoContainer,
  Logo
} from './elements'

class TopBar extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  }

  render() {
    return (
      <div>
        <Decoration />

        {this.props.isLoggedIn && (
          <MenuBar>
            <MenuContainer>
              <LogoContainer>
                <Link to="/">
                  <Logo />
                </Link>
              </LogoContainer>

              <MenuItem to="/dashboard">Лента трат</MenuItem>
              <MenuItem to="/review">Ретроспектива</MenuItem>
            </MenuContainer>
          </MenuBar>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: isLoggedIn(state)
  }
}

export default connect(mapStateToProps)(TopBar)
