import ArchivesSpaceWidget, { searchArchivesSpace } from './ArchivesSpaceWidget'
import CatalystWidget, { searchCatalyst } from './CatalystWidget'
import EdsWidet, { searchEds } from './EdsWidget'
import LaraResourcesWidget, { searchLara } from './LaraResourcesWidget'
import LibAnswersWidget, { searchLibAnswers } from './LibAnswersWidget'
import ScopusWidget, { searchScopus } from './ScopusWidget'
import LibGuidesWidget, { searchLibGuides } from './LibGuidesWidget'
import FinditWidget, { searchFindit } from './FinditWidget'
import PubmedWidget, { searchPubmed } from './PubmedWidget'
import '../stylesheets/widget.scss'

const widgets = {
  aspace:     { widget: ArchivesSpaceWidget, api: searchArchivesSpace  },
  catalyst:   { widget: CatalystWidget,      api: searchCatalyst },
  eds:        { widget: EdsWidet,            api: searchEds },
  lara:       { widget: LaraResourcesWidget, api: searchLara },
  libAnswers: { widget: LibAnswersWidget,    api: searchLibAnswers },
  scopus:     { widget: ScopusWidget,        api: searchScopus },
  libGuides:  { widget: LibGuidesWidget,     api: searchLibGuides },
  findit:     { widget: FinditWidget,        api: searchFindit },
  pubmed:     { widget: PubmedWidget,        api: searchPubmed }
}

export default widgets
