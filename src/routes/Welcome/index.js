import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Button from '../../ui/Button'
import { colors } from '../../styles'
import logoSplash from '../../styles/images/splash-logo.svg'

import { authorizeApplication } from '../../store/modules/session'

class Welcome extends React.Component {
  static propTypes = {
    isAuthorizing: PropTypes.bool,
    authorizeApp: PropTypes.func
  }

  render() {
    return (
      <WelcomeLayout>
        <Column left>
          <Header>Войдите через аккаунт «Открытие»</Header>
          <LoginText>
            <p>
              Предоставьте доступ к своим данным, авторизуясь через приложение
              банка «Открытие».
            </p>
            <p>Мы не используем и не обрабатываем ваши персональные данные.</p>
          </LoginText>

          <Button
            loading={this.props.isAuthorizing}
            onClick={this.props.authorizeApp}
          >
            Подключить аккаунт
          </Button>
        </Column>

        <Column>
          <Logo src={logoSplash} />
        </Column>
      </WelcomeLayout>
    )
  }
}

const Logo = styled.img`margin-left: 50px;`

const Column = styled.div`
  flex: 1 1;
  ${props =>
    props.left ? `border-right: 2px solid ${colors.grayLightest}` : ''};
  ${props => (props.left ? 'padding-right: 20px' : '')};
`

const LoginText = styled.div`
  color: ${colors.gray};
  font-size: 16px;
  margin-bottom: 35px;
`

const Header = styled.h3`
  size: 20px;
  font-weight: 500;
  color: ${colors.black};
`

const WelcomeLayout = styled.div`
  max-width: 800px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  margin-top: 140px;
`

function mapStateToProps(state) {
  return {
    isAuthorizing: state.session.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authorizeApp: () => dispatch(authorizeApplication())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
