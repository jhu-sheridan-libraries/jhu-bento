import { namespaced } from 'redux-subspace'
import searchReducers from './search'

const reducers = {
  lara: namespaced('lara')(searchReducers),
  catalyst: namespaced('catalyst')(searchReducers),
  aspace: namespaced('aspace')(searchReducers),
  eds: namespaced('eds')(searchReducers)
}
export default reducers