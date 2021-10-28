import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router'
import { FaSearch } from 'react-icons/fa'
import Loader from '../components/loader'

const FoodsList = props => {
  const [value, setValue] = useState('')
  const [filtered, setFiltered] = useState('')
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios({
      method: 'GET',
      url: 'https://easy-login-api.herokuapp.com/protected',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // console.log('res', response)
      })
      .catch(error => {
        localStorage.removeItem('token')
        history.push('/')
      })
  })

  useEffect(() => {
    setIsLoading(true)
    axios({
      method: 'GET',
      url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=b  '
    }).then(response => {
      console.log('res : ', response.data.meals)
      setApiData(response.data.meals)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    console.log('res : ', value)
  }, [value])

  const history = useHistory()

  //Search Function
  const searchFood = e => {
    setFiltered(e.target.value.toLowerCase())
  }

  return (
    <>
      <StyledTitle>Meats &amp; Foods</StyledTitle>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <StyledHorizontal>
            <SearchInput
              placeholder='What are you looking for?'
              onChange={e => searchFood(e)}
            />
            <SearchButton>
              <FaSearch />
            </SearchButton>
          </StyledHorizontal>
          <Wrapper>
            {apiData?.map(item => {
              console.log(typeof filtered)
              return (
                <div key={item?.idMeal}>
                  {item.strMeal.toLowerCase().includes(filtered) ? (
                    <WrapperChild>
                      <Image
                        src={item?.strMealThumb}
                        alt={item?.strMealThumb}
                      ></Image>
                      <Title>{item?.strMeal}</Title>
                      <StyledHorizontal>
                        <StyledButton
                          onClick={() =>
                            history.push(`/details/${item?.idMeal}`)
                          }
                        >
                          See the details
                        </StyledButton>
                      </StyledHorizontal>
                    </WrapperChild>
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
            {/* Search food not found */}
            {apiData[0] ? <StyledTitle>Food not found</StyledTitle> : null}
          </Wrapper>
        </>
      )}
    </>
  )
}

const StyledTitle = styled.h1`
  margin-top: 40%;
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
  border-radius: 5%;
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
  border-radius: 10%;
`
const StyledHorizontal = styled.div`
  display: flex;
  justify-content: center;
`

const SearchInput = styled.input`
  width: 50%;
  border: 3px solid ${({ theme }) => theme.primaryLight};
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: gray;
  &:focus {
    color: ${({ theme }) => theme.primaryDark};
  }
`
const SearchButton = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.primaryLight};
  background: ${({ theme }) => theme.primaryLight};
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  font-size: 20px;
`

const StyledButton = styled.button`
  padding: 15px 20px;
  color: ${({ theme }) => theme.primaryDark};
  font-size: 16px;
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

export default FoodsList
