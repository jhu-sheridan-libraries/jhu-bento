import faker from 'faker'
import reducer, { __RewireAPI__ as RewiredApi } from './search'
import * as actions from '../actions' 
import * as actionTypes from '../actions/constants'

describe('search reducer', () => {
  let value = faker.lorem.word()
  let initialState = RewiredApi.__get__('initialState')

  it('should return the initial state', () => {    
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle BENTO_SEARCH_BEGIN', () => {
    const action = {
      type: actionTypes.BENTO_SEARCH_BEGIN,
      payload: value
    }
    expect(reducer(initialState, action)).toEqual({ data: value, isFetching: true })
  })

  it('should handle BENTO_SEARCH_SUCCESS', () => {
    const action = {
      type: actionTypes.BENTO_SEARCH_SUCCESS,
      payload: value
    }
    expect(reducer(initialState, action)).toEqual({ data: value, isFetching: false })
  })

  it('should handle BENTO_SEARCH_ERROR', () => { 
    const error = new TypeError(value)
    const action = {
      type: actionTypes.BENTO_SEARCH_ERROR,
      payload: error,
      error: true
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, error: error, isFetching: false })
  })
})