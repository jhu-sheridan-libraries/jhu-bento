import { createActions } from 'redux-actions'

// defines common action creators for the bento box app. 
// action creators for individual widgets should be defined in the widget, not here. 
export const {
  searchBegin,
  searchCancel,
  searchSuccess,
  searchFailure
} = createActions('SEARCH_BEGIN', 'SEARCH_CANCEL', 'SEARCH_SUCCESS', 'SEARCH_FAILURE')
