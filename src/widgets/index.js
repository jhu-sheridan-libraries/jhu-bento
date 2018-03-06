import ArchivesSpaceWidget, { searchArchivesSpace } from './ArchivesSpaceWidget'
import CatalystWidget, { searchCatalyst } from './CatalystWidget'
import EdsWidet, { searchEds } from './EdsWidget'
import LaraResourcesWidget, { searchLara } from './LaraResourcesWidget'
import LibAnswersWidget, { searchLibAnswers } from './LibAnswersWidget'
import ScopusWidget, { searchScopus } from './ScopusWidget'

const widgets = {
  aspace:     { widget: ArchivesSpaceWidget, search: searchArchivesSpace, row: 1, col: 3 },
  catalyst:   { widget: CatalystWidget,      search: searchCatalyst,      row: 1, col: 2 },
  eds:        { widget: EdsWidet,            search: searchEds,           row: 1, col: 1 },
  lara:       { widget: LaraResourcesWidget, search: searchLara,          row: 2, col: 1 },
  libAnswers: { widget: LibAnswersWidget,    search: searchLibAnswers,    row: 2, col: 2 },
  scopus:     { widget: ScopusWidget,        search: searchScopus,        row: 2, col: 3 },
}

export default widgets