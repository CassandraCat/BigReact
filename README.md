# Big-React

Implementing the core features of React v18 from scratch 🎉🎉🎉

With the following characteristics:

👬 The implementation closest to the React source code

💪 Fully functional, the current can be run through the official number of test cases: 25

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

| Type       | Content                                              | Completion |                    Version Implemented                     |
| ---------- | ---------------------------------------------------- | :--------: | :--------------------------------------------------------: |
| React      | JSX transformation                                   |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| React      | React.isValidElement                                 |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| React      | Hooks architecture (mount)                           |     ✅     | [v1.2](https://github.com/CassandraCat/BigReact/tree/v1.2) |
| React      | Hooks architecture (update)                          |     ✅     | [v1.4](https://github.com/CassandraCat/BigReact/tree/v1.4) |
| ReactDOM   | DOM insertion in browser                             |     ✅     | [v1.1](https://github.com/CassandraCat/BigReact/tree/v1.1) |
| ReactDOM   | DOM movement in browser                              |     ✅     | [v1.6](https://github.com/CassandraCat/BigReact/tree/v1.6) |
| ReactDOM   | DOM attribute changes in browser                     |    ⬜️     |                                                            |
| ReactDOM   | DOM deletion in browser                              |     ✅     | [v1.4](https://github.com/CassandraCat/BigReact/tree/v1.4) |
| ReactDOM   | ReactTestUtils                                       |     ✅     | [v1.3](https://github.com/CassandraCat/BigReact/tree/v1.3) |
| ReactNoop  | ReactNoop Renderer                                   |     ✅     | [v2.2](https://github.com/CassandraCat/BigReact/tree/v2.2) |
| Reconciler | Fiber architecture                                   |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Reconciler | Event model                                          |     ✅     | [v1.5](https://github.com/CassandraCat/BigReact/tree/v1.5) |
| Reconciler | onClick event support                                |     ✅     | [v1.5](https://github.com/CassandraCat/BigReact/tree/v1.5) |
| Reconciler | Input element onChange event support                 |    ⬜️     |                                                            |
| Reconciler | Lane model                                           |     ✅     | [v2.0](https://github.com/CassandraCat/BigReact/tree/v2.0) |
| Reconciler | Basic update mechanism                               |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Reconciler | Priority-based update mechanism                      |     ✅     | [v2.0](https://github.com/CassandraCat/BigReact/tree/v2.0) |
| Reconciler | Handle Fragment Node                                 |     ✅     | [v1.7](https://github.com/CassandraCat/BigReact/tree/v1.7) |
| Reconciler | Multi-node mount process                             |     ✅     | [v1.6](https://github.com/CassandraCat/BigReact/tree/v1.6) |
| Reconciler | Single-node reconcile process                        |     ✅     | [v1.4](https://github.com/CassandraCat/BigReact/tree/v1.4) |
| Reconciler | Multi-node reconcile process                         |     ✅     | [v1.6](https://github.com/CassandraCat/BigReact/tree/v1.6) |
| Reconciler | Node deletion reconcile process                      |     ✅     | [v1.4](https://github.com/CassandraCat/BigReact/tree/v1.4) |
| Reconciler | Support for HostText type                            |     ✅     | [v1.1](https://github.com/CassandraCat/BigReact/tree/v1.1) |
| Reconciler | Support for HostComponent type                       |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Reconciler | Support for HostRoot type                            |     ✅     | [v1.0](https://github.com/CassandraCat/BigReact/tree/v1.0) |
| Reconciler | Support for FunctionComponent                        |     ✅     | [v1.2](https://github.com/CassandraCat/BigReact/tree/v1.2) |
| Reconciler | useState implementation                              |     ✅     | [v1.2](https://github.com/CassandraCat/BigReact/tree/v1.2) |
| Reconciler | Legacy scheduling process (including batchedUpdates) |     ✅     | [v2.0](https://github.com/CassandraCat/BigReact/tree/v2.0) |
| Reconciler | useEffect implementation                             |     ✅     | [v2.1](https://github.com/CassandraCat/BigReact/tree/v2.1) |
| Reconciler | useRef implementation                                |    ⬜️     |                                                            |
| Reconciler | Synchronous scheduling process                       |     ✅     | [v2.0](https://github.com/CassandraCat/BigReact/tree/v2.0) |
| Reconciler | Concurrent scheduling process                        |     ✅     | [v2.3](https://github.com/CassandraCat/BigReact/tree/v2.3) |

## Debugging

Here are three debugging methods:

1. Real-time Debugging
   Running yarn demo `<directory-name>` will execute the demo project in the demos directory corresponding to the specified directory name.

   Benefits:
   The console will print information about the execution of major steps, allowing you to visually track the execution flow.
   Hot updates are available (including updates to both demo code and source code).

2. Using yarn link
   Set up a React test project using CRA or Vite. In this project, execute yarn build to bundle react and react-dom. Then, use yarn link to replace the react and react-dom dependencies in the test project with the bundled versions.

   Benefits:
   This method is the closest to actual usage scenarios of React in a project.

3. Running Official React Test Cases
   Execute yarn test to run the official test cases, which use the react and react-dom versions bundled by executing yarn build.

   Benefits:
   This allows you to observe framework implementation details and edge cases from the perspective of official test cases.

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

### v1.5

Implement an event system with the following features:

- Event Model
- Support for onClick events (as well as onClickCapture events)

### v1.6

Implemented the multi-node reconcile process (commonly known as the Diff algorithm), including the following features:

- Fixed a bug where onClick callbacks did not update during updates
- Insertion process for multiple nodes during mounting
- Reconciliation process for multiple nodes during insertion
- DOM movement in the browser environment

### v1.7

Implemented handling of Fragment and array nodes, including the following functionalities:

- Correctly create or reuse Fragment Fiber nodes.
- Handle array-form child nodes (e.g., { arr }).
- During recursive deletion of subtrees, record the corresponding Host nodes to be deleted.

### v2.0

Implemented the basic Lane model with support for scheduling synchronous updates and batchedUpdates, including:

- Lane model
- Prioritized Update mechanism
- Legacy scheduling process (including batchedUpdates)
- Fixed bugs related to unsupported number type nodes among multiple children

### v2.1

Implemented useEffect with asynchronous callback scheduling using the official scheduler module.

- useEffect implementation

### v2.2

To implement React-Noop-Renderer, I made adjustments to React-Reconciler and Rollup configuration to make React-Reconciler more adaptable to different host environments. This includes:

- Implemented React-Noop-Renderer to test Reconciler logic independently of ReactDOM.
- Modified Rollup configuration to better integrate React-Reconciler with various host environments.
- Integrated internal React packages jest-react and react-test-renderer, alongside custom React-Noop-Renderer, to test React cases under concurrent scenarios.
- Passed the useEffect call order case.
- Fixed minor bugs in the Diff algorithm discovered during the process.
- Imported Scheduler, jest-react, and react-test-renderer as NPM packages.

### v2.3

To implement concurrent updates, you can modify the `eventTypeToEventPriority` method in `packages/react-dom/src/SyntheticEvent.ts`, specifically changing the priority for the click event. This will allow you to observe the differences in how synchronous updates (SyncLane) and updates with other priorities handle click events and whether they trigger time slicing. This includes the following functionalities:

- Concurrent Scheduling Flow
- State Calculation for Concurrent Updates
