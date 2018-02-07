import { createActions } from 'redux-actions'

export const {
  bentoSearchBegin,
  bentoSearchCancel
} = createActions('BENTO_SEARCH_BEGIN', 'BENTO_SEARCH_CANCEL')