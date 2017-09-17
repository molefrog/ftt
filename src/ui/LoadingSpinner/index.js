import styled, { keyframes } from 'styled-components'

import loader from '../Button/loading-circle.svg'

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

const LoadingSpinner = styled.div`
  display: inline-block;

  width: ${props => props.size || 20}px;
  height: ${props => props.size || 20}px;
  background-image: url(${loader});
  background-size: contain;

  transform-origin: center center;
  animation: ${rotate360} 0.5s infinite;
  animation-timing-function: linear;
`

export default LoadingSpinner
