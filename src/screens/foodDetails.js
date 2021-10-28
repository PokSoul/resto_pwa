import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import { useParams } from 'react-router'

const FoodDetails = props => {
  const { id } = useParams()
  const idMeal = id
  const [details, setDetails] = useState({})
  const [favorites, setFavorites] = useState(
    localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites'))
      : []
  )
  const [isFavorite, setIsfavorite] = useState(false)

  useEffect(() => {
    isInFavorite(idMeal)
    console.log(idMeal)
  }, [favorites])

  const isInFavorite = idMeal => {
    const isFav = favorites.some(fav => fav.idMeal === idMeal)
    setIsfavorite(isFav)
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + `${idMeal}`
    }).then(response => {
      // console.log(response.data.meals[0])
      setDetails(response.data.meals[0])
    })
  }, [])

  const removeFavorite = idMeal => {
    const newFavorite = favorites.filter(fav => fav.idMeal !== idMeal)
    localStorage.setItem('favorites', JSON.stringify(newFavorite))
    setFavorites(newFavorite)
  }

  const addFavorite = details => {
    const newArray = [...favorites, details]
    localStorage.setItem('favorites', JSON.stringify(newArray))
    setFavorites(newArray)
  }

  const handleFavorite = details => {
    isFavorite ? removeFavorite(details.idMeal) : addFavorite(details)
  }

  return (
    <div>
      <StyledTitle>Food Details</StyledTitle>
      <Wrapper>
        <WrapperChild>
          <Title>{details.strMeal}</Title>
          <Image src={details.strMealThumb} alt={details.strMealThumb} />
          <Title> Ingredients : </Title>
          <Description>
            {details.strIngredient1},{details.strIngredient2},
            {details.strIngredient3},{details.strIngredient4},
            {details.strIngredient5},{details.strIngredient6}
          </Description>
          <Title> Instructions: </Title>
          <Description>{details.strInstructions}</Description>
          <StyledHorizontal>
            <StyledButton
              onClick={() => {
                handleFavorite(details)
              }}
            >
              {isFavorite ? 'remove from favorite' : 'add to favorite'}
            </StyledButton>
            &nbsp;
            <StyledButton onClick={() => window.open(details?.strYoutube)}>
              Watch the recipe
            </StyledButton>
          </StyledHorizontal>
        </WrapperChild>
      </Wrapper>
    </div>
  )
}

FoodDetails.propTypes = {}

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
  align-items: center;
  text-align: center;
  width: 550px;
  height: auto;
  background-color: ${({ theme }) => theme.primaryLight};
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem;
`
const Title = styled.h1`
  color: black;
`
const Description = styled.p`
  color: black;
  text-align-last: center;
`

const Image = styled.img`
  width: 250px;
  height: auto;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
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

export default FoodDetails
