import {
  SET_SEARCH_TERM,
  SAVE_MARVEL_CHARACTERS
} from './actions'

export const setSearchTerm = (searchTerm) => {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  }
}

export const saveMarvelCharacters = (startingChar, listOfCharacters) => {
  return {
    type: SAVE_MARVEL_CHARACTERS,
    startingChar,
    listOfCharacters
  }
}
