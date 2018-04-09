import { expectSaga } from 'redux-saga-test-plan'
import faker from 'faker'
import { __RewireAPI__ as Saga } from './index'
import * as actionTypes from '../actions/constants'

describe('Saga', () => {
  describe('Saga search function', () => {
    it('calls doSearch function and return a namespaced action', () => {
      const search = Saga.__get__('search')
      let namespace = faker.lorem.word()
      let query = faker.lorem.word()
      let action = {
        type: actionTypes.BENTO_SEARCH_BEGIN,
        payload: query
      }
      const doSearch = value => ({ value })
      return expectSaga(search, namespace, doSearch, action)
        .put({ type: `${ namespace }/${ actionTypes.BENTO_SEARCH_FINISH }`, payload: { value: query }})
        .run()
    })
  })
})

