import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import numeral from 'numeral'

// A small helper component used for sum formatting
const Roubles = ({ amount, size }) => {
  const formatted = numeral(amount)
    .format('0,0[.]00')
    .replace(',', ' ')

  return <Label size={size}>{formatted}₽</Label>
}

const Label = styled.span`font-size: ${props => props.size || 16}px;`

Roubles.propTypes = {
  amount: PropTypes.number.isRequired,
  size: PropTypes.number
}

export default Roubles
