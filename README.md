# whiteboard
A web-based digital whiteboard.

## Constitution

This is a web-based digital whiteboard built with an emphasis on user experience, quality, security, and performance.
We will implement our digital whiteboard using TypeScript within NodeJS on the NextJS framework.
We will use React with the Material UI modules.
User experience focuses on maintaining a clean, decluttered UI supported by hot-keys for common operations.
Performance is achieved by handling user interactions such as drawing shapes and lines in the browser.
Each item the user enters on the whiteboard is represented by a JSON data object that is seamlessly managed by the server.

We achieve quality by focusing on linting, unit testing, and BDD testing.
Linting is done using ESLint with the type-script-eslint, eslint-plugin-react, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y plugins.
We will use Prettier for formatting and code style enforcement which will be integrated using the eslint-config-prettier utility.
For unit testing we use vitest with support from the React Testing Library.
We strive to ensure we have a unit test for each module we write so that we can maintain 75% unit test code coverage at a minimum.
For BDD testing we use Cucumber.js with support from Playwright.
We maintain security by minimizing the 3rd party dependencies and only using libraries or tools that have active support and wide adoption.

We maintain documentation for the tool using the Nextra documentation framework and Markdown files.
We maintain our application and documentation in a monorepo using the following structure.

/whiteboard
  |
  |-- /apps
  |    |
  |    |-- /web
  |    |    |-- /src
  |    |    |    |-- /components
  |    |    |    |    |-- Header.tsx
  |    |    |    |    |-- Header.test.tsx  <-- (Unit Test)
  |    |    |-- vitest.config.ts
  |    |    |-- next.config.js
  |    |    |-- package.json
  |    |
  |    |-- /docs
  |    |    |-- (docs content...)
  |    |
  |    |-- /e2e                  <-- BDD/E2E Tests
  |         |-- /features         <-- Your Gherkin .feature files
  |         |    |-- whiteboard.feature
  |         |
  |         |-- /steps            <-- Your TypeScript step definitions
  |         |    |-- whiteboard.steps.ts
  |         |
  |         |-- package.json      <-- Has Cucumber & Playwright deps
  |         |-- cucumber.js       <-- Cucumber config
  |         |-- playwright.config.ts  <-- Playwright config
  |
  |-- /packages
  |    |-- /ui
  |    |    |-- /src
  |    |    |    |-- Button.tsx
  |    |    |    |-- Button.test.tsx   <-- (Component Test)
  |    |    |-- vitest.config.ts
  |    |    |-- package.json
  |    |
  |    |-- /eslint-config
  |
  |-- package.json
  |-- pnpm-workspace.yaml

We use GitHub Actions to automate our CI/CD pipelines ensuring quality and security with every change to the code base.
We will use GitHub's security settings on the repository with CodeQL and Depend-a-Bot scanning to eliminate vulnerabilities.
We will be fully transparent about our application stack by maintaining an SBOM using cyclonedx.
We emply the GitHub Copilot with GitHub Spec-kit as our AI assistant, relying heavily on AI to perform incremental development of small features.
We package our application for deployment using NPM and strictly follow semantic versioning for each release.
No release can be made that doesn't pass all CI/CD tests.