import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors, variables } from '../../styles'
import ExpencesList from '../../components/ExpencesList'

const expences = Array(5)
  .fill({
    created_at: '2013-02-27 09:30:26',
    place: 'АЗС Лукойл 101',
    amount: -1500.3,
    is_needs: true,
    reviewed: true
  })
  .map(exp => ({
    ...exp,
    id: Math.random()
      .toString(16)
      .slice(2)
  }))

class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>
            Как вы можете<br /> потратить деньги.
          </Title>
          <Annotation>
            Вы пытаетесь откладывать 20%, тратить на необходимые вещи 50%, а
            остальные 30% — на хотелки.
          </Annotation>
        </Header>
        <Categories>
          <CategoryBox active>Нужды</CategoryBox>
          <CategoryBox>Хотелки</CategoryBox>
          <CategoryBox>Накопления</CategoryBox>
        </Categories>
        <Transactions>
          <IncomesList />
          <ExpencesList expences={expences} />
        </Transactions>
      </Container>
    )
  }
}

const Container = styled.div`
  width: ${variables.containerWidth};
  margin: auto;
`

// Header
const Header = styled.div`
  margin-top: 42px;
  margin-bottom: 35px;
`

const Title = styled.h3`
  font-size: 26px;
  font-weight: 800;
`
const Annotation = styled.div`
  color: ${colors.gray};
  font-size: 18px;
`

// Categories
const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
`

const CategoryBox = styled.div`
  width: 160px;
  height: 100px;
  border-radius: 3px;
  border: 2px ${props => (props.active ? colors.ultraBlue : colors.grayLighter)}
    solid;
  padding: 10px;
`
const Transactions = styled.div``

const IncomesList = styled.div``

Dashboard.propTypes = {}

export default Dashboard
