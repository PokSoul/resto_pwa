import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
// components
import Toggle from '../components/header/toggle'
import Menu from '../components/header/menu'
// pages
import Home from '../screens/home'
import FoodsList from '../screens/foods'
import FoodDetails from '../screens/foodDetails'
import Favorites from '../screens/favorites'

const Routes = props => {
  const [navToggled, setNavToggled] = useState(false)

  const handleNavToggle = () => {
    setNavToggled(!navToggled)
  }

  return (
    <div>
      <Toggle handleNavToggle={handleNavToggle} />
      <Router>
        {navToggled ? <Menu handleNavToggle={handleNavToggle} /> : null}
        <Switch>
          <Route exact path='/' component={Home} />
          <PrivateRoute path='/foods' component={FoodsList} />
          <PrivateRoute path='/details/:id' component={FoodDetails} />
          <Route path='/favorites' component={Favorites} />
          <Redirect from='/*' to='/' />
        </Switch>
      </Router>
    </div>
  )
}

Routes.propTypes = {}

function PrivateRoute({ children, ...rest }) {
  const isToken = localStorage.getItem('token')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default Routes
