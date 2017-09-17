import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// redux actions and selectors
import { logout } from '../../store/modules/session'

class LogoutRoute extends React.Component {
  static propTypes = {
    logout: PropTypes.func
  }

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return null
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    logout: card => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutRoute)
