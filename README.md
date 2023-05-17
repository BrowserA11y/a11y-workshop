# Web Accessibility Exercises: Book Store Demo Project

This repository contains a demo project for a book store, along with a series of exercises that aim to teach web developers how to make their websites more accessible to people with disabilities. The exercises are designed for developers with basic knowledge of Git, JavaScript, HTML, and CSS. SCSS knowledge is also helpful but not required.
The demo project consists of a simple website that allows users to browse and store books. The website includes various accessibility features, such as alternative text for images and a keyboard-accessible navigation menu. The application utilizes the [bookmonkey-api package](https://www.npmjs.com/package/bookmonkey-api) to make requests to the backend server and retrieve book information.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm i`
3. (Optional) Run `npm build` to start SCSS to CSS compilation (in case you want to edit SCSS)
4. Run `npx bookmonkey-api` to start backend
5. Open the `index.html` file in your browser. In this case you will see something like `file:///Users/my-username/accessibility/pages/index.html` as URL. However, the browser extensions (axe DevTools, lighthouse etc.) won't work with this method. To use them, you have to spin off a web server.
6. (Optional) The easiest way to spin off a web server is to use [Live Server extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Start the server as described on the extension page. In this case you will see something like `http://127.0.0.1:5500/`.

## Project structure

The project consists of assests, HTML pages, SCSS files and JS scripts which are in the respective folders. CSS are automatically generated and placed in the CSS folder. Each page has its own HTML and SCSS files which are named the same way (e.g. new-book.html and new-book.scss). Global styles are contained in global.scss.

## Running tests

To start end-to-end tests, run the following command: `npm run cypress`. This will open an interactive UI where you can start the test. More info in the [documentation](https://docs.cypress.io/guides/getting-started/opening-the-app).
Alternativelly, you can run the tests via CLI with `npx cypress run`.

## Exercises

The exercises in this repository are divided into several sections, each covering a different aspect of web accessibility. Some of the topics covered include:

- Semantic HTML
- Alternative text for images
- Keyboard accessibility
- Focus management
- ARIA attributes
- Color contrast
- Responsive design
- Each exercise includes a set of instructions, as well as a set of starter files that you can use as a starting point. The exercises are designed to be completed in order, as they build upon each other.

## Contributing

If you would like to contribute to this repository, please feel free to submit a pull request. Contributions are welcome and appreciated!

## How to updates the exercises in this masterclass

1. `git rebase -i a7bfef2d02ab39024567e281ea9b0096344494ea`
2. Change `pick` to `edit` at the tasks you want to change
3. Do your changes
4. `git commit --all --amend`
5. `git rebase --continue`
6. Fix possible merge error if needed
7. Repeat on step 3 if you edit more than one commits
8. run `./recreate-tags.sh`
9. `git push -f`
10. `git push --tags -f`

## License

This repository is licensed under the MIT License. See the LICENSE file for more information.
