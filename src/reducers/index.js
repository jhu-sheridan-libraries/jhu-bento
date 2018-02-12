import { laraWidgetReducers } from '../widgets/LaraResourcesWidget'
import { solrWidgetReducers } from '../widgets/SolrWidget'
import { archivesSpaceWidgetReducers } from '../widgets/ArchivesSpaceWidget'
import { edsWidgetReducers } from '../widgets/EdsWidget'
import searchReducers from './search'
import { namespaced } from 'redux-subspace'

const reducers = {
  lara: namespaced('lara')(searchReducers),
  solrWidgetReducers, 
  archivesSpaceWidgetReducers,
  edsWidgetReducers
}
export default reducers