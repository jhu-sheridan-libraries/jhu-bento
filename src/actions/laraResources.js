import { createActions } from 'redux-actions'

export const {
  searchLaraResourcesSuccess,
  searchLaraResourcesFailure
} = createActions({
  SEARCH_LARA_RESOURCES_SUCCESS: (data) => (data)
}, 'SEARCH_LARA_RESOURCES_FAILURE')