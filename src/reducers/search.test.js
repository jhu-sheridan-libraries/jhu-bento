import faker from 'faker'
import reducer, { __RewireAPI__ as RewiredApi } from './search'
import * as Actions from '../actions' 
import * as ActionTypes from '../actions/constants'

describe('search reducer', () => {
  let value = faker.lorem.word()

  it('should return the initial state', () => {
    let initialState = RewiredApi.__get__('initialState')
    expect(reducer(undefined, {})).toEqual(initialState)
  })

})