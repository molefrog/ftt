import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { isLoggedIn } from '../../store/modules/session'
import { getUntaggedExpenses } from '../../store/modules/transactions'

import {
  Decoration,
  MenuBar,
  MenuContainer,
  MenuItem,
  LogoContainer,
  LeftMenu,
  RightMenu,
  MenuBadge,
  Logo
} from './elements'

class TopBar extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    retroBadgeCount: PropTypes.number
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

              <LeftMenu>
                <MenuItem to="/dashboard">Лента трат</MenuItem>
                <MenuItem to="/review">
                  Ретроспектива
                  <MenuBadge>{this.props.retroBadgeCount}</MenuBadge>
                </MenuItem>
              </LeftMenu>

              <RightMenu>
                <MenuItem to="/logout">Выйти</MenuItem>
              </RightMenu>
            </MenuContainer>
          </MenuBar>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: isLoggedIn(state),
    retroBadgeCount: getUntaggedExpenses(state).length
  }
}

export default withRouter(connect(mapStateToProps)(TopBar))
