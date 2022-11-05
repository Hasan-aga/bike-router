# Bike Router

![tests workflow](https://github.com/hasan-aga/bike-router/actions/workflows/test.yml/badge.svg)
[![End-to-end tests](https://github.com/Hasan-aga/bike-router/actions/workflows/e2eTests.yml/badge.svg?branch=master)](https://github.com/Hasan-aga/bike-router/actions/workflows/e2eTests.yml)

Live demo: [biker.hasan.one](https://biker.hasan.one/)

This tool will help you plan a cycling route. Simply pick two points on a map and the best path between them will be calculated and displayed on the map.
![example usecase](./assets/bike-demo.gif)

An elevation chart will also be displayed which will help you visualize the diffeculty of the path. You can click and drag on the chart to calculated the inclination percentage between any two points.
![example usecase](./assets/bike-demo2.gif)

Hovering over the chart will render a marker at the coresponding location on the path.
![example usecase](./assets/bike-demo3.gif)

# Development

To run this tool you will need an API key from [Geoapify Location Platform](https://www.geoapify.com/get-started-with-maps-api). After obtaining the key, put it in an environment variable called `REACT_APP_API_KEY`. You can use [dotenv](https://www.npmjs.com/package/dotenv) package to streamline the process.

This tool was created using [create-react-app](https://create-react-app.dev/) script. You can use the included standard scripts to run, build and test the project. End-to-end tests are a bit long so we have them on a separate script: `yarn e2e`
