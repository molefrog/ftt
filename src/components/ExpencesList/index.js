import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors, variables } from '../../styles'
import Roubles from '../Roubles'

const ExpencesList = ({ expences }) => {
  console.log(expences)
  if (!expences || expences.length === 0)
    return <NoExpences>У вас еще не было новых трат</NoExpences>
  return (
    <ListContainer>
      {expences.map(expence => (
        <Expence key={expence.id}>
          <ExpenceDate>{expence.created_at}</ExpenceDate>
          <ExpencePlace>{expence.place}</ExpencePlace>
          <ExpenceValue>
            <Roubles amount={expence.amount} />
          </ExpenceValue>
        </Expence>
      ))}
    </ListContainer>
  )
}

const ListContainer = styled.div``

const Expence = styled.div`
  border-bottom: 1px ${colors.grayLighter} solid;
  margin-bottom: 12px;
`

const NoExpences = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 40px 0px;
`

const ExpenceDate = styled.div``

const ExpencePlace = styled.div``

const ExpenceValue = styled.div``

ExpencesList.propTypes = {
  expences: PropTypes.array.isRequired
}

export default ExpencesList
