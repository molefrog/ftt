import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../../styles'

// .App-header {
//   background-color: #222;
//   height: 70px;
//   padding: 20px;
//   color: white;
// }

const Navigation = () => (
  <div className="App-header">
    <h2>Fifty thirty twenty</h2>
    <div>
      <ul>
        <li>
          <NavLink to="/dashboard">Счет</NavLink>
        </li>
        <li>
          <NavLink to="/review">Ретроспектива</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Настройки</NavLink>
        </li>
      </ul>
    </div>
  </div>
)

export default Navigation
