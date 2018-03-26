import faker from 'faker'
import reducer from './search'
import * as Actions from '../actions' 
import * as ActionTypes from '../actions/constants'

describe('search reducer', () => {
  let value = faker.lorem.word()

  it('should return the initial state'), () => {
    expect(reducer(undefined, {}).toEqual({}))
  }
})