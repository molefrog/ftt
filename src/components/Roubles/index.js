import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../styles'

import numeral from 'numeral'

// A small helper component used for sum formatting
const Roubles = ({ amount, size, warning = false }) => {
  const formatted = numeral(amount)
    .format('0,0[.]00')
    .replace(',', ' ')

  return (
    <Label size={size} warning={warning}>
      {formatted}₽
    </Label>
  )
}

const Label = styled.span`
  font-size: ${props => props.size || 16}px;
  ${props => (props.warning ? `color: ${colors.red}` : '')};
`

Roubles.propTypes = {
  amount: PropTypes.number.isRequired,
  size: PropTypes.number,
  warning: PropTypes.bool
}

export default Roubles
