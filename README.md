# Shopgate Connect - Extension persistent-search-bar
Will render a Search Bar Field beneath the App Bar of the iOS and GMD themes.

## Configuration
Add the persistent-search-bar extension to your Shopgate Connect deployment config.
```
(...)
  {
    "id": "@shopgate-project/persistent-search-bar",
    "version": "1.11.0"
  }
(...)
```
The search bar background, input border radius, search icon color and the suggestion list background and text color are sourced from the active theme and are no longer configurable.

Set the following value in your Shopgate Connect Admin:

* border - (string) Border styling for the input wrapper (1px solid #000)

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
    "/category/:categoryId/all/filter",
    "/search/filter",
    "/login",
    "/item/:productId/gallery/:slide",
    "/scanner",
    "/privacy-settings",
    "/register",
    "/forgot-password",
    "/storefinder",
    "/orders/:orderId",
    "/order-details/:orderNumber",
    "/account/profile/contact",
    "/account/:tab",
    "/account",
    "/checkout",
    "/checkout/guest",
    "/checkout/guest/payment",
    "/checkout/addresses/:type",
    "/checkout/addresses/:type/contact",
    "/checkout/success",
    "/store-details/:code"
  ],
  "border": "",
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

