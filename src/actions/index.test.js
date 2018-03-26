import * as actions from './index'
import faker from 'faker'
import * as actionTypes from './constants'

describe('Bento search actions', () => {
  let value = faker.lorem.word()

  describe('BENTO_SEARCH_BEGIN', () => {
    it('should create an action for search', () => {
      let expectedAction = {
        type: actionTypes.BENTO_SEARCH_BEGIN,
        payload: value
      }
      expect(actions.beginSearch(value)).toEqual(expectedAction)
    })
  })
})