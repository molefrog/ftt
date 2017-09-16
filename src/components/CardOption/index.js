import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'

import { colors } from '../../styles'
import Roubles from '../Roubles'

// allows to get card icon by card provider
// e.g. visa, mastercard etc.
import getCardIcon from './card-types'

// This component represents credit card option item
const CardOption = props => (
  <Option onClick={props.onSelect}>
    <CardIcon icon={getCardIcon(props.type)} />

    <div>
      <CardName>{props.name || 'Банковская карта'}</CardName>
      {props.balance && (
        <CardBalance>
          <Roubles amount={props.balance} />
        </CardBalance>
      )}
    </div>
  </Option>
)

CardOption.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  balance: PropTypes.number,
  onSelect: PropTypes.func
}

export default CardOption

const CardName = styled.div`font-size: 18px;`

const CardIcon = styled.div`
  width: 60px;
  height: 35px;

  background-image: url(${props => props.icon});
  background-size: cover;
  background-position: center;
  border-radius: 3px;

  margin-right: 20px;
  box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.1);
`

const CardBalance = styled.div`
  font-size: 16px;
  color: ${colors.gray};
  margin-top: 2px;
`

const Option = styled.div`
  padding: 18px;
  border: 2px solid ${colors.grayLight};
  border-radius: 8px;
  margin-bottom: 10px;

  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.ultraBlue};
    background-color: ${colors.ultraBlue};

    ${CardName} {
      color: white;
    }

    ${CardBalance} {
      color: ${rgba(colors.white, 0.9)};
    }
  }
`
