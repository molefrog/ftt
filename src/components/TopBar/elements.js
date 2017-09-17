import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { colors } from '../../styles'

// The application logo image
import logoImage from '../../styles/images/logo.svg'

// This works simply because `NavLink` accepts
// className prop
export const MenuItem = styled(NavLink)`
  font-size: 18px;
  color: ${colors.black};
  text-decoration: none;

  &.active {
    color: ${colors.ultraBlue};
  }
`

export const MenuBadge = styled.div`
  display: inline-block;
  background: ${colors.ultraBlue};

  width: 23px;
  height: 23px;
  border-radius: 23px;

  margin-left: 6px;
  font-size: 14px;
  font-weight: 600;
  color: white;

  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const RightMenu = styled.div`text-align: right;`

export const LeftMenu = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1;

  ${MenuItem} {
    margin-right: 20px;
  }
`

export const Decoration = styled.div`
  background-color: ${colors.ultraBlue};
  height: 15px;
`

export const Logo = styled.img.attrs({ src: logoImage })`width: 68px;`

export const MenuBar = styled.div`
  height: 80px;
  border-bottom: 2px solid ${colors.grayLighter};
`

export const LogoContainer = styled.div`
  position: absolute;
  left: -110px;
  top: 0px;
  height: 80px;

  display: flex;
  align-items: center;
`

export const MenuContainer = styled.div`
  max-width: 570px;
  margin: 0 auto;
  height: 100%;

  position: relative;

  display: flex;
  align-items: center;
  justrify-content: flex-start;
`
