# Big-React

Implementing the core features of React v18 from scratch 🎉🎉🎉

With the following characteristics:

👬 The implementation closest to the React source code

💪 Fully functional, the current can be run through the official number of test cases: 20

🚶 Iterative steps divided by Git tags, documenting the implementation of each feature from scratch

## TODO List

### Engineering Requirements

| Type       | Content                          | Completion |                    Version Implemented                     |
| ---------- | -------------------------------- | :--------: | :--------------------------------------------------------: |
| Structure  | monorepo (implemented with pnpm) |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Standard   | eslint                           |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Standard   | prettier                         |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Standard   | commitlint + husky               |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Standard   | lint-staged                      |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Standard   | tsc                              |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Testing    | jest environment setup           |     ✅     | [v1.3](https://github.com/CassandraCat/BigReact/tree/v1.3) |
| Build      | babel configuration              |     ✅     | [v1.3](https://github.com/CassandraCat/BigReact/tree/v1.3) |
| Build      | Dev environment package build    |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Build      | Prod environment package build   |    ⬜️     |                                                            |
| Deployment | Github Action for lint and test  |    ⬜️     |                                                            |
| Deployment | Github Action for npm release    |    ⬜️     |                                                            |

### Framework Requirements

| Type       | Content                          | Completion |                    Version Implemented                     |
| ---------- | -------------------------------- | :--------: | :--------------------------------------------------------: |
| React      | JSX transformation               |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| React      | React.isValidElement             |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| ReactDOM   | DOM insertion in browser         |     ✅     | [v1.1](https://github.com/CassandraCat/BigReact/tree/v1.1) |
| ReactDOM   | DOM movement in browser          |    ⬜️     |                                                            |
| ReactDOM   | DOM attribute changes in browser |    ⬜️     |                                                            |
| ReactDOM   | DOM deletion in browser          |     ✅     | [v1.4](https://github.com/CassandraCat/BigReact/tree/v1.4) |
| ReactDOM   | ReactTestUtils                   |     ✅     | [v1.3](https://github.com/CassandraCat/BigReact/tree/v1.3) |
| ReactNoop  | ReactNoop Renderer               |    ⬜️     |                                                            |
| Reconciler | Fiber architecture               |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Reconciler | Event model                      |    ⬜️     |                                                            |
| Reconciler | Lane model                       |    ⬜️     |                                                            |
| Reconciler | Basic update mechanism           |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Reconciler | Priority-based update mechanism  |    ⬜️     |                                                            |
| Reconciler | Single-node reconcile process    |     ✅     | [v1.4](https://github.com/CassandraCat/BigReact/tree/v1.4) |
| Reconciler | Multi-node reconcile process     |    ⬜️     |                                                            |
| Reconciler | Node deletion reconcile process  |     ✅     | [v1.4](https://github.com/CassandraCat/BigReact/tree/v1.4) |
| Reconciler | Support for HostText type        |     ✅     | [v1.1](https://github.com/CassandraCat/BigReact/tree/v1.1) |
| Reconciler | Support for HostComponent type   |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Reconciler | Support for HostRoot type        |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Reconciler | Support for FunctionComponent    |     ✅     | [v1.2](https://github.com/CassandraCat/BigReact/tree/v1.2) |
| React      | Hooks architecture (mount)       |     ✅     | [v1.2](https://github.com/CassandraCat/BigReact/tree/v1.2) |
| React      | Hooks architecture (update)      |     ✅     | [v1.4](https://github.com/CassandraCat/BigReact/tree/v1.4) |
| Reconciler | useState implementation          |     ✅     | [v1.2](https://github.com/CassandraCat/BigReact/tree/v1.2) |
| Reconciler | useEffect implementation         |    ⬜️     |                                                            |
| Reconciler | useRef implementation            |    ⬜️     |                                                            |
| Reconciler | Synchronous scheduling process   |    ⬜️     |                                                            |
| Reconciler | Asynchronous scheduling process  |    ⬜️     |                                                            |

## Debugging

There are two main debugging methods:

1. Running test cases

   Run `React` official test cases (not yet implemented, requires `ReactNoop` renderer to be implemented first)

2. yarn link

   Start a `React` test project with `CRA` or `Vite`, then build `react` and `react-dom` in this project by executing `yarn build`, and replace the project's `react` and `react-dom` dependencies with the built versions using `yarn link`.

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

### v1.2

Implement the mount process for useState, including the following functionalities:

- Support for FunctionComponent type
- Mount process implementation following the Hooks architecture
- Implementation of useState

### v1.3

Initialize the testing architecture with the following features:

- Set up the Jest environment
- Configure Babel
- Use ReactTestUtils
- Run the 20 official test cases related to ReactElement

### v1.4

Implement single-node update, including the following functionalities:

- Browser Environment DOM Deletion: For example, when an `<h3>` element changes to a `<p>` element, it should involve deleting the `<h3>` and inserting the `<p>`.
- Single Node Reconciliation Process: This includes reconciliation for HostComponent and HostText.
- Node Deletion Reconciliation Process: Prepare for subsequent ref and useEffect features with a thorough implementation.
- Hooks Architecture Update Implementation.
