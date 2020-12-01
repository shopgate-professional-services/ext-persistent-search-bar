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

* searchBarBlacklist - (Array) Desired array of pathname values given as strings.

* suggestionsMinChars - (number) Minimum number of chars to trigger search suggestions.

## Default searchBarBlacklist value
```json
{
  "searchBarBlacklist": [
    "/browse",
    "/cart",
    "/filter",
    "/login",
    "/checkout",
    "/item/:productId/gallery/:slide",
    "/search",
    "/scanner"
  ],
  "suggestionsMinChars": 3
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

