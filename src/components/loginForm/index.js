import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const FormLogin = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  useEffect(() => {
    // console.log(username.length)
    // console.log(password.length)
  })

  const onSubmit = e => {
    if (password.length < 8) {
      alert('Password minimum 8 characters')
      return
    }
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'https://easy-login-api.herokuapp.com/users/login',
      data: { username: username, password: password }
    }).then(response => {
      // console.log(response.headers['x-access-token'])
      localStorage.setItem('token', response.headers['x-access-token'])

      history.push('/foods')
    })
  }

  return (
    <div>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <StyledForm onSubmit={onSubmit}>
          <StyledInput
            type='text'
            value={username}
            placeholder='Enter an username'
            onChange={e => setUsername(e.target.value)}
          ></StyledInput>
          <StyledInput
            type='password'
            value={password}
            placeholder='Enter a password'
            onChange={e => setPassword(e.target.value)}
          ></StyledInput>
          <StyledButton type='submit'>Connecter</StyledButton>
        </StyledForm>
      </FormContainer>
    </div>
  )
}

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;
  padding: 30px;
  transform: translate(-50%, -50%);
  background: rgba(182, 237, 200, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
`

const FormTitle = styled.h2`
  text-align: center;
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
`

const StyledForm = styled.form`
  position: relative;
`

const StyledButton = styled.button`
  padding: 10px 20px;
  color: ${({ theme }) => theme.primaryDark};
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
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

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
  &::placeholder {
    color: #fff;
  }
`

export default FormLogin
