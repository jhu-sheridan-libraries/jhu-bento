import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import Bento from './components/Bento'

const sagaMiddleware = createSagaMiddleware()
const middleware = [ sagaMiddleware ]
const store = applyMiddleware(...middleware)(createStore)(combineReducers(reducers))
sagaMiddleware.run(sagas)
const app = document.getElementById('app')
render(
  <Provider store={ store }>
    <Bento />
  </Provider>, app
)



