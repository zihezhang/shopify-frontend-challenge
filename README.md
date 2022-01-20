# Shopify Frontend Summer Internship Challenge 2022

### [See Demo](https://thawing-bayou-98730.herokuapp.com/).

## Features

- Fetches from NASA's Astronomy Photo of the Day API from the past 14 days
- Loading state for when API is returning data
- Animated "like" and "unlike" action
- Likes are persistently stored using local storage
- Liked pages, where users can view their liked posts
- Share high quality image in a single click (link saved to clickboard and toast notification gets triggered for visual feedback)

## Next Steps
- Fix infinite scrolling (I've attempted to implement it using both a npm package and from scratch, but both were not functioning properly)
- Use typescript instead of javascript for better code structuring and object-oriented programming techniques
- Use React Context to pass props down multiple levels rather than passing it down each level on the way
- Implmement date filter (I've attempted this as well, but I figured infinite scrolling would be a better user experience + the shopify polaris date picker get really squished when I try to put it in the nav bar)
