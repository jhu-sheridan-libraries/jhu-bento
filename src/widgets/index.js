import ArchivesSpaceWidget, { searchArchivesSpace } from './ArchivesSpaceWidget'
import CatalystWidget, { searchCatalyst } from './CatalystWidget'
import EdsWidet, { searchEds } from './EdsWidget'
import LaraResourcesWidget, { searchLara } from './LaraResourcesWidget'
import LibAnswersWidget, { searchLibAnswers } from './LibAnswersWidget'
import ScopusWidget, { searchScopus } from './ScopusWidget'
import LibGuidesWidget, { searchLibGuides } from './LibGuidesWidget'
import FinditWidget, { searchFindit } from './FinditWidget'

const widgets = {
  aspace:     { widget: ArchivesSpaceWidget, search: searchArchivesSpace  },
  catalyst:   { widget: CatalystWidget,      search: searchCatalyst },
  eds:        { widget: EdsWidet,            search: searchEds },
  lara:       { widget: LaraResourcesWidget, search: searchLara },
  libAnswers: { widget: LibAnswersWidget,    search: searchLibAnswers },
  scopus:     { widget: ScopusWidget,        search: searchScopus },
  libGuides:  { widget: LibGuidesWidget,     search: searchLibGuides },
  findit:     { widget: FinditWidget,        search: searchFindit },
}

export default widgets