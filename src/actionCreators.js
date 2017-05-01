import {
  SET_SEARCH_TERM,
  SAVE_MARVEL_CHARACTERS,
  SET_LOADING_FLAG,
  SET_CLIENT_RECT
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

export const setLoadingFlag = (isLoading) => {
  return {
    type: SET_LOADING_FLAG,
    isLoading: isLoading
  }
}

export const setClientRect = (clientRect) => {
  return {
    type: SET_CLIENT_RECT,
    clientRect
  }
}
