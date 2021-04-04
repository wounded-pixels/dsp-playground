# dsp-playground

## deployed at
https://dsp-playground.woundedpixels.com/


## TODAY
* zoom timescale
* clear all for plot / freq control 
* normalize volume

## Now
* fix spinners on sum of 2 - make them svg controls and size better
* Sound effects with sines - closely spaced frequencies

## Next up
* analytics?
* feedback from educator
* feedback from visual peer
* feedback from dsp sme

### Unit circle
* center dot in circle?
* lines should have an arrow marker?
* switch deg or radians?

## Soon
* switch to css grid?
* fix on iPad
  * hints look terrible and dont work on ipad
  * strange line on phone
* fixes
  * h scrollbar on freq domain
  * improve or change tooltip
* pretty up 
  * background
  * top branding
  * footer
  * favicon
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
* Reverse the Addition - Frequency filters
  * Limitations - beats
* Convolution in general with a kernel editor
  * filters, smoothing, derivatives, oh my
* AM, FM - not just sine on carrier, morse code on carrier!
* Sampling rate and Nyquist rate
  * simple example of aliasing
  * detail loss from composite
* FFT

  
## Someday
* Move PointPlot into EDA
* can whole widget be resized? Expandable div with scaling? some way to let them flow naturally from reading to shallow play to immersive play?
* Zen mode?

## deployment
* cache and cache busting?

## lessons learned
* do dns first
* copy CNAME next to index or it will be overwritten on deployment





