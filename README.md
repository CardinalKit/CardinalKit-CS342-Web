# VascTrac-Webapp

This repository contains the VascTrac portal web application. The portal is written in [TypeScript](https://www.typescriptlang.org/) (with some leftover JavaScript here and there) using [React](https://reactjs.org/) and [Redux](https://redux.js.org/). The repository uses [Create React App](https://facebook.github.io/create-react-app/) to manage build and compilation.

## Preflight Checks

1. Install [VascTrac local development environment](https://github.com/VascTrac/VascTrac-Infra/tree/master/dev) to get the [Go API server](https://github.com/VascTrac/VascTrac-Go) and the Nginx load balancer.
2. Install yarn dependencies with `yarn install`.
3. Start the development server with `yarn run start` and visit [localhost](localhost). The dev server currently opens up [localhost:3000](localhost:3000), however, this does not go through the load balancer and thus all API requests will fail.

## Recommended tools

1. [Watchman](https://facebook.github.io/watchman/docs/install.html) (otherwise `yarn run test` won't work)
2. [React Dev Tools](https://github.com/facebook/react-devtools) - Browser extension that lets you examine the React component hierarchy
3. [Redux Dev Tools](https://github.com/reduxjs/redux-devtools) - Browser extension that lets you examine redux states and time travel through them

## Project Structure

Note: These concepts all follow from the Redux core concepts described [here](https://redux.js.org/introduction/core-concepts).

- [`api`](./src/api) - Contains types and API call wrappers that match up with the server API. Each endpoint has an API type that exactly matches the API JSON representation and an internal type that is easier to work with in the webapp. e.e. `Event` is the internal webapp type, but the API matches `APIEvent`.
- [`actions`](./src/actions) - Contains action types and action creater functions. [Redux doc](https://redux.js.org/basics/actions)
- [`constants`](./src/constants) - Action types as string enums (could merge this folder with actions in future)
- [`reducers`](./src/reducers) - Store types and reducers that define state changes. [Redux doc](https://redux.js.org/basics/reducers)
- [`selectors`](./src/selectors) - Handle selecting and deriving data from the store. [Redux doc](https://redux.js.org/recipes/computing-derived-data)
- [`sagas`](./src/sagas) - Middleware that preforms responds to actions and does async tasks, like API requests. [Redux-Saga doc](https://redux-saga.js.org/)
- [`components`](./src/components) - React components that form the UI for the WebApp. [React doc](https://reactjs.org/docs/react-component.html)
- [`ui`](./src/ui) - React components that implement general style. If your component doesn't contain VascTrac data or language, it belongs here. This includes things like tables or buttons that we will reuse all over the place.

We use [Tailwind](https://tailwindcss.com/) for CSS. It defines many different "utility classes" that let us build just about whatever we want quickly. Try to avoid writing raw CSS as much as possible in favor of these utility classes as they are easier to understand and know to have good browser support, but if they are insufficient, feel free to define CSS classes in [styles](./src/styles/).
