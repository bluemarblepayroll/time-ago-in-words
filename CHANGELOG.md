## 2.0.0 (November 1, 2018)

* Breaking Change: Removed Processor namespace from main interface.  You have to now directly import required methods.
  - Good: `import * as TimeAgo from '@bluemarblepayroll/time-ago-in-words';`
  - Good: `import { timeAgoReset, timeAgoSet, timeAgoInWords } from '@bluemarblepayroll/time-ago-in-words';`
  - Bad: `import { TimeAgo } from '@bluemarblepayroll/time-ago-in-words';`
* Breaking Change: Renamed methods.
  - TimeAgo#inWords => timeAgoInWords
  - TimeAgo#reset => timeAgoReset
  - TimeAgo#set => timeAgoSet
