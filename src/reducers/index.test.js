import faker from 'faker'
import { bentoReducer } from './index'
import * as actionTypes from '../actions/constants'

describe('search reducer', () => {
  let value = faker.lorem.word()

  it('should return the initial state'), () => {
    expect(reducer(undefined, {}).toEqual({}))
  }

  it('should handle BENTO_SEARCH_BEGIN', () => {
    const action = {
      type: actionTypes.BENTO_SEARCH,
      payload: { query: value }
    }
    // it's empty on purpose because it's just starting to fetch posts
    expect(bentoReducer({}, action)).toEqual({ query: value })
  })
})