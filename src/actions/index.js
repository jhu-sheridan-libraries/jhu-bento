import { createActions } from 'redux-actions'

export const {
  bentoSearchBegin,
  bentoSearchCancel,
  searchSuccess,
  searchFailure
} = createActions('BENTO_SEARCH_BEGIN', 'BENTO_SEARCH_CANCEL', 'SEARCH_SUCCESS', 'SEARCH_FAILURE')
