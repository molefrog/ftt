import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../styles'

import { interpolateRgb } from 'd3-interpolate'

// A small helper component used for sum formatting
const CardProgress = ({ amount, total }) => {
  const percent = Math.min(100, 100.0 * amount / total)

  const cerp = interpolateRgb('#FFCC33', '#F0383A')
  const color = percent < 50 ? colors.green : cerp(percent / 100.0)

  return (
    <ProgressWrap>
      <ProgressBar style={{ width: `${percent}%`, backgroundColor: color }} />
    </ProgressWrap>
  )
}

const ProgressWrap = styled.div`
  margin-top: 12px;
  width: 100%;
  background-color: ${colors.grayLighter};
  height: 10px;
  border-radius: 10px;
`

const ProgressBar = styled.div`
  height: 10px;
  border-radius: 10px;
  background-color: ${colors.green};
`

CardProgress.propTypes = {
  amount: PropTypes.number.isRequired,
  total: PropTypes.number
}

export default CardProgress
