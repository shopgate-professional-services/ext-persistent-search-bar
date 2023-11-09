# Shopgate Connect - Extension persistent-search-bar
Will render a Search Bar Field beneath the App Bar of the iOS and GMD themes.

## Configuration
Add the persistent-search-bar extension to your Shopgate Connect deployment config.
```
(...)
  {
    "id": "@shopgate-project/persistent-search-bar",
    "version": "1.1.0"
  }
(...)
```
Set the following value in your Shopgate Connect Admin:

* barBgColor - (string) Background color of the search bar. By default the extension will use the background color configured for the AppBar

* bgColor - (string) Background color of the SearchSuggestionList. By default the extension will use the background color configured for the AppBar

* textColor - (string) Text color of the SearchSuggestionList. By default the extension will use the text color configured for the AppBar

* border - (string) Border styling for the input wrapper (1px solid #000)

* borderRadius - (number) Border radius of the input wrapper

* searchIconColor - (string) Color of the search icon

* searchBarBlacklist - (Array) Desired array of pathname values given as strings.

* suggestionsMinChars - (number) Minimum number of chars to trigger search suggestions.

* hideOnScroll - (boolean) Hide search bar when scrolling

* searchFieldLabel - (string) Add a custom label to the search field

* showLastSearchQuery - (boolean) Display the last search query in the search field on the results page 

## Default searchBarBlacklist value
```json
{
  "searchBarBlacklist": [
    "/browse",
    "/cart",
    "/category/:categoryId/filter",
    "/search/filter",
    "/login",
    "/checkout",
    "/item/:productId/gallery/:slide",
    "/scanner"
  ],
  "barBgColor": "",
  "bgColor": "",
  "border": "",
  "borderRadius": 10,
  "textColor": "",
  "searchIconColor": "",
  "suggestionsMinChars": 3,
  "hideOnScroll": true,
  "searchFieldLabel": "",
  "showLastSearchQuery": true
}
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.


## License

Shopgate Cloud - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.

