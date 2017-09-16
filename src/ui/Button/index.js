import React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from '../../styles'

import loader from './loading-circle.svg'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${loader});
  background-size: contain;

  margin-right: 10px;

  transform-origin: center center;
  animation: ${rotate360} 0.5s infinite;
  animation-timing-function: linear;
`

const ButtonWrapper = styled.button`
  border: 2px solid ${colors.ultraBlue};
  border-radius: 3px;

  padding: 10px 12px;
  font-size: 17px;
  background: none;
  color: ${colors.ultraBlue};

  font-weight: 600;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${Loader} {
    display: ${props => (props.loading ? 'inline-block' : 'none')};
  }
}
`

const Button = ({ children, loading }) => (
  <ButtonWrapper loading={loading}>
    <Loader />
    <span>{children}</span>
  </ButtonWrapper>
)

export default Button
