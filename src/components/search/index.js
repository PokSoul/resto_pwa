import React from 'react'
import PropTypes from 'prop-types'
import Card from '../card/cardList'

const SearchList = filteredFood => {
  const filtered = filteredFood.map(item => (
    <Card key={item?.idMeal} item={item} />
  ))

  return <div>{filtered}</div>
}

SearchList.propTypes = {}

export default SearchList
