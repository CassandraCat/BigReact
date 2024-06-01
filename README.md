# Big-React

Implementing the core features of React v18 from scratch 🎉🎉🎉

With the following characteristics:

👬 The implementation closest to the React source code

💪 Fully functional, the current can be run through the official number of test cases: 1

🚶 Iterative steps divided by Git tags, documenting the implementation of each feature from scratch

## TODO List

### Engineering Requirements

| Type         | Content                                           | Completion Status             | Remarks |
| ------------ | ------------------------------------------------- | ----------------------------- | ------- |
| Architecture | monorepo (implemented with yarn+lerna)            | <div align="center">✅</div>  |         |
| Standards    | eslint                                            | <div align="center">✅</div>  |         |
| Standards    | prettier                                          | <div align="center">✅</div>  |         |
| Standards    | commitlint + husky                                | <div align="center">✅</div>  |         |
| Standards    | lint-staged                                       | <div align="center">✅</div>  |         |
| Standards    | tsc                                               | <div align="center">✅</div>  |         |
| Testing      | Setting up jest environment                       | <div align="center">⬜️</div> |         |
| Build        | babel configuration                               | <div align="center">⬜️</div> |         |
| Build        | Dev environment package build                     | <div align="center">✅</div>  |         |
| Build        | Prod environment package build                    | <div align="center">⬜️</div> |         |
| Deployment   | Github Action for lint and test                   | <div align="center">⬜️</div> |         |
| Deployment   | Github Action to publish npm package based on tag | <div align="center">⬜️</div> |         |

### Framework Requirements

| Type       | Content                                                   | Completion Status             | Remarks |
| ---------- | --------------------------------------------------------- | ----------------------------- | ------- |
| React      | JSX conversion                                            | <div align="center">✅</div>  |         |
| ReactDOM   | DOM operations (add/delete/update) in browser environment | <div align="center">⬜️</div> |         |
| ReactNoop  | ReactNoop Renderer                                        | <div align="center">⬜️</div> |         |
| Reconciler | Fiber architecture                                        | <div align="center">✅</div>  |         |
| Reconciler | Event model                                               | <div align="center">⬜️</div> |         |
| Reconciler | Lane model                                                | <div align="center">⬜️</div> |         |
| Reconciler | Basic update mechanism                                    | <div align="center">✅</div>  |         |
| Reconciler | Priority-based update mechanism                           | <div align="center">⬜️</div> |         |
| Reconciler | Single node reconcile process                             | <div align="center">✅</div>  |         |
| Reconciler | Multiple node reconcile process                           | <div align="center">⬜️</div> |         |
| Reconciler | Node deletion reconcile process                           | <div align="center">⬜️</div> |         |
| Reconciler | Synchronous scheduling process                            | <div align="center">⬜️</div> |         |
| Reconciler | Asynchronous scheduling process                           | <div align="center">⬜️</div> |         |

## Debugging

There are two main debugging methods:

1. Running test cases

   Run `React` official test cases (not yet implemented, requires `ReactNoop` renderer to be implemented first)

2. yarn link

   Start a `React` test project with `CRA` or `Vite`, then build `react` and `react-dom` in this project by executing `yarn run build`, and replace the project's `react` and `react-dom` dependencies with the built versions using `yarn link`.

## Changelog

### v1.0

Insert single node render phase mount process, including the following features:

- JSX conversion
- Fiber architecture
- Single node reconcile process

> Note: Rendering in the browser environment has not yet been implemented.
