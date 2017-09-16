import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors, variables } from '../../styles'

class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>
            Посмотрите, как вы<br /> тратите деньги.
          </Title>
          <Annotation>
            Вы пытаетесь откладывать 20%, тратить на необходимые вещи 50%, а
            остальные 30% — на хотелки.
          </Annotation>
        </Header>
        <Categories />
        <IncomesList />
        <ExpencesList />
      </Container>
    )
  }
}

const Container = styled.div`
  width: ${variables.containerWidth};
  margin: auto;
`

// Header
const Header = styled.div`margin-top: 42px;`

const Title = styled.h3`
  font-size: 26px;
  font-weight: 800;
`
const Annotation = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  margin-bottom: 25px;
`

// Categories
const Categories = styled.div``

// Others
const IncomesList = styled.div``
const ExpencesList = styled.div``

Dashboard.propTypes = {}

export default Dashboard
