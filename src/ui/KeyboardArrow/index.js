import styled from 'styled-components'
import { colors } from '../../styles'

import arrowRight from './arrow-right.png'
import arrowLeft from './arrow-left.png'

const Arrow = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 3px;
  border: 1px solid ${colors.gray};
  display: inline-block;

  background-size: contain;
  background-position: center;
  background-image: url(${props => (props.left ? arrowLeft : arrowRight)});
`

export default Arrow
