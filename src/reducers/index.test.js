import faker from 'faker'
import { bentoReducer, __RewireAPI__ as RewiredApi } from './index'
import * as actionTypes from '../actions/constants'

describe('search reducer', () => {
  let value = faker.lorem.word()

  it('should return the initial state', () => {
    let initialState = RewiredApi.__get__('initialState')
    expect(bentoReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle BENTO_SEARCH_BEGIN', () => {
    const action = {
      type: actionTypes.BENTO_SEARCH,
      payload: { query: value }
    }
    // it's empty on purpose because it's just starting to fetch posts
    expect(bentoReducer({}, action)).toEqual({ query: value })
  })
})