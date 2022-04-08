# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.5.0] - 2022-04-08
## Added
- new config `border` to add border styling to the search input (1px solid #000)
- new config `borderRadius` to add a border radius styling to the search input (8px)
- new config `searchIconColor` to colorize the search icon
- surrounded the input wrapper with `persistent-search-bar.input.wrapper` portal to enable leading and trailing elements like a burger menu
## Fixed
- Prevented scrolling of the content while search is focused
- Positioning of suggestions and overlay is more reliable
- iOS TabBar was shown when search field was blurred (not when search bar was reset)

## [1.4.5] - 2022-01-07
## Fixed
- wrong url in blacklist for "filter"

## [1.4.4] - 2021-11-17
## Added
- new config `hideOnScroll`

## [1.4.3] - 2021-09-30
## Added
- Voice reader support

## [1.4.2] - 2021-08-10
## Added
- show/hide TabBar when input focus changed

## [1.4.1] - 2020-07-28
## Fixed
- Handle missing ref
- ignore field blur effect

## [1.3.1] - 2020-11-04
## Fixed
- apply filter button on gmd

## [1.3.0] - 2020-07-24
### Added
- support for search-history ext
## Fixed
- styling

## [1.2.0] - 2020-04-09
### Added
- config for text and bg color
- use colors from AppBar as defaults

## Fixed
- Corrected jest and babel rc configs for Babel 7 compatibility

## [1.1.0] - 2018-11-11
### Added
- Barcode scanner icon and functionality to searchbar

## [1.0.0] - 2018-06-26
### Added
- first implementation

[1.1.0]: https://github.com/shopgate-professional-services/ext-persistent-search-bar/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/shopgate-professional-services/ext-persistent-search-bar/releases/v1.0.0
