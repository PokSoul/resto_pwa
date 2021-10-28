import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory } from 'react-router'

const Favorites = props => {
  const localeStorageFavorites = localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites'))
    : []
  const [favorite, setFavorite] = useState(localeStorageFavorites)

  const history = useHistory()

  return (
    <>
      <StyledTitle>Favorites Foods</StyledTitle>
      <Wrapper>
        {favorite?.map(item => (
          <WrapperChild key={item?.idMeal}>
            <Image src={item?.strMealThumb} alt={item?.strMealThumb}></Image>
            <Title>{item?.strMeal}</Title>
            <StyledHorizontal>
              <StyledButton
                onClick={() => history.push(`/details/${item?.idMeal}`)}
              >
                See the details
              </StyledButton>
            </StyledHorizontal>
          </WrapperChild>
        ))}
      </Wrapper>
    </>
  )
}

const StyledTitle = styled.h1`
  margin-top: 30%;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const WrapperChild = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 250px;
  height: 250px;
  background-color: ${({ theme }) => theme.primaryLight};
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem;
`

const Title = styled.p`
  color: black;
`

const Image = styled.img`
  width: 250px;
  height: 130px;
  justify-content: center;
  align-items: center;
`
const StyledHorizontal = styled.div`
  display: flex;
`

const StyledButton = styled.button`
  padding: 10px 15px;
  color: ${({ theme }) => theme.primaryDark};
  font-size: 15px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  letter-spacing: 2px;
  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px ${({ theme }) => theme.primaryDark},
      0 0 25px ${({ theme }) => theme.primaryDark},
      0 0 50px ${({ theme }) => theme.primaryDark},
      0 0 100px ${({ theme }) => theme.primaryDark};
  }
`

export default Favorites
