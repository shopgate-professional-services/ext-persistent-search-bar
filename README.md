# Shopgate Connect - Extension persistant-search-bar
Will render a Search Bar Field beneath the App Bar of the iOS and GMD themes. 

## Configuration
Add the persistaent-search-bar extension to your Shopgate Connect deployment config.
```
(...)
  {
    "id": "@shopgate-project/persistent-search-bar",
    "version": "1.0.0"
  }
(...)
```
Set the following value in your Shopgate Connect Admin:
* searchBarBlacklist - (Array) Desired array of pathname values given as strings.

## Default searchBarBlacklist value
```
{
  "searchBarBlacklist": [
    "/browse",
    "/cart",
    "/filter",
    "/login",
    "/checkout",
    "/item/:productId/gallery/:slide",
    "/search"
  ]
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

