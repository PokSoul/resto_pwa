import React, { useEffect } from 'react'
import FormLogin from '../components/loginForm'
import { useHistory } from 'react-router'

const Home = () => {
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      history.push('/foods')
    }
  }, [])

  return (
    <>
      <FormLogin />
    </>
  )
}

export default Home
