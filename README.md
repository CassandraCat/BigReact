# Big-React

Implementing the core features of React v18 from scratch 🎉🎉🎉

With the following characteristics:

👬 The implementation closest to the React source code

💪 Fully functional, the current can be run through the official number of test cases: 1

🚶 Iterative steps divided by Git tags, documenting the implementation of each feature from scratch

## TODO List

### Engineering Requirements

| Type         | Content                                           | Status |                   Implemented in Version                    |
| ------------ | ------------------------------------------------- | :----: | :---------------------------------------------------------: |
| Architecture | monorepo (implemented with pnpm)                  |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Standards    | eslint                                            |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Standards    | prettier                                          |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Standards    | commitlint + husky                                |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Standards    | lint-staged                                       |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Standards    | tsc (TypeScript compiler)                         |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Testing      | jest environment setup                            |  ⬜️   |                                                             |
| Build        | babel configuration                               |  ⬜️   |                                                             |
| Build        | Development bundle build                          |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Build        | Production bundle build                           |  ⬜️   |                                                             |
| Deployment   | Github Action for lint and test                   |  ⬜️   |                                                             |
| Deployment   | Github Action to publish npm package based on tag |  ⬜️   |                                                             |

### Framework Requirements

| Type       | Content                                | Status |                   Implemented in Version                    |
| ---------- | -------------------------------------- | :----: | :---------------------------------------------------------: |
| React      | JSX transformation                     |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| ReactDOM   | Insertion of browser DOM elements      |   ✅   | [v1.1](https://github.com/CrazyCatZhang/BigReact/tree/v1.1) |
| ReactDOM   | Movement of browser DOM elements       |  ⬜️   |                                                             |
| ReactDOM   | Attribute changes in browser DOM       |  ⬜️   |                                                             |
| ReactDOM   | Deletion of browser DOM elements       |  ⬜️   |                                                             |
| ReactNoop  | ReactNoop Renderer                     |  ⬜️   |                                                             |
| Reconciler | Fiber architecture                     |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Reconciler | Event model                            |  ⬜️   |                                                             |
| Reconciler | Lane model                             |  ⬜️   |                                                             |
| Reconciler | Basic update mechanism                 |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Reconciler | Priority-based update mechanism        |  ⬜️   |                                                             |
| Reconciler | Single node insertion reconcile flow   |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Reconciler | Multiple node insertion reconcile flow |  ⬜️   |                                                             |
| Reconciler | Node deletion reconcile flow           |  ⬜️   |                                                             |
| Reconciler | HostText type support                  |   ✅   | [v1.1](https://github.com/CrazyCatZhang/BigReact/tree/v1.1) |
| Reconciler | HostComponent type support             |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Reconciler | HostRoot type support                  |   ✅   | [v1.0](https://github.com/CrazyCatZhang/BigReact/tree/v1.0) |
| Reconciler | FunctionComponent type support         |  ⬜️   |                                                             |
| Reconciler | Synchronous scheduling flow            |  ⬜️   |                                                             |
| Reconciler | Asynchronous scheduling flow           |  ⬜️   |                                                             |

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

### v1.1

Mounting process for inserting a single node (rendering DOM in a browser environment), including the following functionalities:

- Browser environment DOM insertion
- Support for HostText type
