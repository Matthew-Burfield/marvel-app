import { SET_SEARCH_TERM } from './actions'

const DEFAULT_STATE = {
  searchTerm: '',
  searchChar: ''
}

const setSearchTerm = (state, action) => {
  const searchChar = action.searchTerm.length > 0 ? action.searchTerm[0].toUpperCase() : ''
  return Object.assign({}, state, {
    searchTerm: action.searchTerm,
    searchChar
  })
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action)
    default:
      return state
  }
}

export default rootReducer
