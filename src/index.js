import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import Bento from './components/Bento'

const history = createHistory()

const sagaMiddleware = createSagaMiddleware()
const historyMiddleware = routerMiddleware(history)
const middleware = [ sagaMiddleware, historyMiddleware ]
const rootReducer = combineReducers({ ...reducers, router: routerReducer })
const store = applyMiddleware(...middleware)(createStore)(rootReducer)

sagaMiddleware.run(sagas)
const app = document.getElementById('app')
render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Route path='/' component={ Bento } />
    </ConnectedRouter>
  </Provider>, app
)
