import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { colors } from '../../styles'
import Roubles from '../Roubles'

import unconfirmedIcon from './unconfirmed-icon.svg'
import confirmedIcon from './confirmed-icon.svg'

const ExpenseItem = ({ expense }) => (
  <Expense>
    <Icon
      width={22}
      src={!expense.confirmed ? confirmedIcon : unconfirmedIcon}
    />
    <Info>
      <ExpenceDate>
        {moment(expense.created_at).format('DD.MM.YYYY HH:mm')}
      </ExpenceDate>
      <ExpencePlace>{expense.place}</ExpencePlace>
    </Info>
    <ExpenceValue>
      <Roubles size={17} amount={expense.amount} />
    </ExpenceValue>
  </Expense>
)

const Icon = styled.img`margin-right: 20px;`

const Info = styled.div`flex: 1 1;`

const Expense = styled.div`
  border-bottom: 1px ${colors.grayLighter} solid;

  display: flex;
  align-items: center;
  padding: 14px 0;
`

const ExpenceDate = styled.div`
  font-size: 15px;
  color: ${colors.gray};
  margin-bottom: 2px;
`

const ExpencePlace = styled.div`
  font-size: 16px;
  color: ${colors.black};
`

const ExpenceValue = styled.div``

ExpenseItem.propTypes = {
  expense: PropTypes.object
}

export default ExpenseItem
