# dsp-playground

## deployed at
https://dsp-playground.woundedpixels.com/


## Now
* clean up - footer, sizes, X
* route change should also scroll to top


## Next up
More on sum of many sines
* verbiage and connections to previous topic, next topic
* goals - show curve on plot and let them match it
  * transparent blue and yellow? too cute?


## Soon
* switch to css grid?
* fix on iPad
  * spinner should be touchable
  * hints look terrible and dont work on ipad
  * strange line on phone
* fixes
  * h scrollbar on freq domain
  * improve knob drag
  * improve change tooltip
  * page refresh is wonky - path is wrong 
* pretty up 
  * background
  * top branding
  * footer
  * differentiate internal scenario control links from routing links
* Convert a sample to audio
  * also on iPad?

## Refactoring 

## Hygiene
* prettier
* jest and storybook for components
* snapshots for components

## Extractions
* refactor equalizer control as generic   no amplitude
  * to where? new project? doesn't really fit bindings

## Navigation and Chunking
* start page should be sticky - maybe the add sines?
  * Just start in the middle with fun stuff!!
* No classic site map nav bar!
* simple Top Nav:
  * site and app branding on left 
  * Topics on right - 10,000 foot view of topics in context - like a wiki
  * About on right - who, what wp, what dsp-playground, why
* each page should link to other pages with useful content / context
* help hovers as needed but don't let it get junky
* each page should have a logical Next link to go further

## Topics
* Adding sines
* Adding sines with frequency controls - (freq domain and time domain)
* Terminology for freq and time domains
* Sines, Cosines and the Unit Circle
* From angles to time
* Reverse the Addition - Frequency filters
  * Limitations - beats
* Convolution in general with a kernel editor
  * filters, smoothing, derivatives, oh my
* AM, FM - not just sine on carrier, morse code on carrier!
* Sampling rate and Nyquist rate
  * simple example of aliasing
  * detail loss from composite


## Features
* graphic to tie unit circle to strip chart
  * slider to increase angle 
  * triangle and dot on unit circle
  * sin curve along angle with dot
  * dotted and solid lines
  * same for cosine?
  
## Someday
* Move PointPlot into EDA
* can whole widget be resized? Expandable div with scaling? some way to let them flow naturally from reading to shallow play to immersive play?
* Zen mode?

## deployment
* make repo private?
* AWS Amplify? GAE?
* cache and cache busting?

## lessons learned
* do dns first
* copy CNAME next to index or it will be overwritten on deployment





