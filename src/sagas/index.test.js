import { expectSaga } from 'redux-saga-test-plan'
import faker from 'faker'
import { __RewireAPI__ as Saga } from './index'
import * as actionTypes from '../actions/constants'

describe('Saga', () => {
  describe('search saga', () => {
    it('calls doSearch function and return a namespaced action', () => {
      const search = Saga.__get__('search')
      let namespace = faker.lorem.word()
      let query = faker.lorem.word()
      let action = {
        type: actionTypes.BENTO_SEARCH,
        payload: query
      }
      const doSearch = value => ({ value })
      expectSaga(search, namespace, doSearch, action)
        .put({ type: `${ namespace }/${ actionTypes.BENTO_SEARCH_SUCCESS }`, payload: { value: query }})
        .run()
    })
  })

  describe('history saga', () => {
    it('pushes a record to history', () => {
      const push = Saga.__set__('push', value => value)
      const history = Saga.__get__('history')
      let searchTerm = faker.lorem.word()
      let action = {
        type: actionTypes.BENTO_SEARCH,
        payload: { query: searchTerm }
      }
      expectSaga(history, action)
        .put({ search: `q=${ searchTerm }` })
        .run()
      Saga.__ResetDependency__('push')
    })
  })
})

