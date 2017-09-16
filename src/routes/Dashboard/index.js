import React from 'react'
import styled from 'styled-components'
import { colors, variables } from '../../styles'

import ExpencesList from '../../components/ExpencesList'
import CategoryBox from '../../components/CategoryBox'
import Roubles from '../../components/Roubles'

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
            остальные 30% — на развлечения.
          </Annotation>
        </Header>
        <Categories>
          <CategoryBox active title="Нужды" percent={50}>
            <Roubles amount={10320} size={18} />
            {' из '}
            <Roubles amount={10320} size={18} />
          </CategoryBox>
          <CategoryBox title="Развлечения" percent={30}>
            Хотелки
          </CategoryBox>
          <CategoryBox title="Накопления" percent={20}>
            <Roubles amount={43500} size={22} />
          </CategoryBox>
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
  line-height: 1.15;
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

const Transactions = styled.div``

const IncomesList = styled.div``

Dashboard.propTypes = {}

export default Dashboard
