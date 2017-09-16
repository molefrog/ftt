import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors, variables } from '../../styles'
import numeral from 'numeral'

const Roubles = ({ amount }) => (
  <RoublesContainer>{numeral(amount).format('0[.]00')}₽</RoublesContainer>
)

const RoublesContainer = styled.span`font-size: 16px;`

Roubles.propTypes = {
  amount: PropTypes.number.isRequired
}

export default Roubles
