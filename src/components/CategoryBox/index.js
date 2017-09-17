import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { colors } from '../../styles'

const CategoryBox = props => {
  return (
    <Box active={props.active} onClick={props.onSelect}>
      <Header>
        <Title>{props.title}</Title>
        <Percent>{props.percent}%</Percent>
      </Header>

      <Content>{props.children}</Content>
    </Box>
  )
}

CategoryBox.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  percent: PropTypes.number,
  children: PropTypes.any,
  onSelect: PropTypes.func
}

export default CategoryBox

const Percent = styled.div`
  color: ${colors.gray};
  font-weight: 600;
`

const Title = styled.div`font-size: 16px;`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid ${colors.grayLighter};
`

const Content = styled.div`padding-top: 6px;`

const Box = styled.div`
  cursor: pointer;
  border-radius: 3px;
  border: 2px ${props => (props.active ? colors.ultraBlue : colors.grayLighter)}
    solid;
  padding: 10px;
  user-select: none;

  width: 160px;
  height: 100px;

  ${props =>
    props.active
      ? css`
          ${Title} {
            color: ${colors.ultraBlue};
            text-transform: uppercase;
          }
        `
      : ''};
`
