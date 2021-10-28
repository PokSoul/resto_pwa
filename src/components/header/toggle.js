import React from 'react'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'

const Toggle = ({ handleNavToggle }) => {
  return (
    <StyledToggle onClick={handleNavToggle}>
      <FaBars />
    </StyledToggle>
  )
}

const StyledToggle = styled.button`
  position: fixed;
  top: 5%;
  right: 4%;
  color: ${({ theme }) => theme.primaryDark};
  background: ${({ theme }) => theme.primaryLight};
  padding: 0.75rem;
  display: flex;
  place-items: center;
  font-size: 2rem;
  cursor: pointer;
`

export default Toggle
