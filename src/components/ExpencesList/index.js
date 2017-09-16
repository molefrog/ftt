import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../styles'

import ExpenseItem from '../ExpenseItem'

const ExpencesList = ({ expences }) => {
  if (!expences || expences.length === 0) {
    return <NoExpences>У вас еще не было новых трат.</NoExpences>
  }

  return (
    <ListContainer>
      {expences.map(expence => (
        <ExpenseItem expense={expence} key={expence.id} />
      ))}
    </ListContainer>
  )
}

const ListContainer = styled.div``

const NoExpences = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 40px 0px;
  color: ${colors.grayLight};
`

ExpencesList.propTypes = {
  expences: PropTypes.array.isRequired
}

export default ExpencesList
