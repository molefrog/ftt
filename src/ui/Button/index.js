import styled from 'styled-components'
import { colors } from '../../styles'

const Button = styled.button`
  border: 2px solid ${colors.ultraBlue};
  border-radius: 3px;

  padding: 10px 12px;
  font-size: 17px;
  background: none;
  color: ${colors.ultraBlue};

  font-weight: 600;
  cursor: pointer;
`

export default Button
