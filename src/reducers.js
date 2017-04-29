import {
  SET_SEARCH_TERM,
  SAVE_MARVEL_CHARACTERS,
  SET_LOADING_FLAG
} from './actions'

const DEFAULT_STATE = {
  searchTerm: '',
  searchChar: '',
  listOfCharacters: {}
}

const setSearchTerm = (state, action) => {
  const searchChar = action.searchTerm.length > 0 ? action.searchTerm[0].toUpperCase() : ''
  return Object.assign({}, state, {
    searchTerm: action.searchTerm,
    searchChar
  })
}

const saveMarvelCharacters = (state, action) => {
  const listOfCharacters = Object.assign({}, state.listOfCharacters, {[action.startingChar]: action.listOfCharacters})
  return Object.assign({}, state, {listOfCharacters})
}

const setLoadingFlag = (state, action) => {
  return Object.assign({}, state, {isLoading: action.isLoading})
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SAVE_MARVEL_CHARACTERS:
      return saveMarvelCharacters(state, action)
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action)
    case SET_LOADING_FLAG:
      return setLoadingFlag(state, action)
    default:
      return state
  }
}

export default rootReducer
