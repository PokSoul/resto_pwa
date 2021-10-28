import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

const Menu = ({ handleNavToggle }) => {
  return (
    <StyledMenu>
      <StyledLink onClick={handleNavToggle} to='/'>
        Home
      </StyledLink>
      <StyledLink onClick={handleNavToggle} to='/foods'>
        Food Page
      </StyledLink>
      <StyledLink onClick={handleNavToggle} to='/favorites'>
        Favorites Food
      </StyledLink>
      <CloseToggle onClick={handleNavToggle}>
        <FaTimes />
      </CloseToggle>
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  @media screen and (min-width: 790px) {
    width: 60%;
  }
  background-color: rgb(182, 237, 200, 0.9);
  z-index: 99;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled(Link)`
  color: #eee;
  text-decoration: none;
  font-size: clamp(3rem, 4vw, 6vw);
  transition: 0.2s all ease-in-out;

  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */

  &:hover {
    transition: 0.2s all ease-in-out;
    color: ${({ theme }) => theme.primaryDark};
  }
`

const CloseToggle = styled.button`
  position: fixed;
  top: 5%;
  right: 4%;
  background: ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.primaryLight};
  padding: 0.75rem;
  display: flex;
  place-items: center;
  font-size: 2rem;
  cursor: pointer;
`

export default Menu
