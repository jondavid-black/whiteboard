# whiteboard

# Whiteboard Monorepo

This project uses a monorepo structure with NodeJS, NextJS for the web app, Nextra for documentation, and Cucumber.js for BDD testing.

## Structure

- `apps/web` — NextJS web application
- `apps/docs` — Nextra documentation site
- `apps/bdd` — Cucumber.js BDD test suite

## Getting Started

### Setup

1. Install NodeJS (latest LTS)
  ```bash
  # Using Node Version Manager (nvm):
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install --lts
  nvm use --lts
  node -v   # Should show the latest LTS version
  ```

2. Install PNPM
  ```bash
  npm install pnpm
  ```

### Usage

1. Install dependencies for all apps:
  ```bash
  pnpm install
  ```

2. Start the web app:
  ```bash
  npm run dev:web
  ```

3. Start the docs app:
  ```bash
  npm run dev:docs
  ```

4. Run BDD tests:
  ```bash
  npm run test:bdd
  ```

## Notes
- All apps use the latest LTS releases.
- Each app has its own `package.json` and dependencies.
- Docs app uses Nextra with `nextra-theme-docs`.
- BDD app uses Cucumber.js with feature and step definition folders.

## Development Process
Whiteboard development heavily relies on GenAI technology.
This repo uses [GitHub Copilot](https://github.com/features/copilot) and the [GitHub Speckit](https://github.com/github/spec-kit) extensions.
The general workflow for starting new work should use the Speckit workflow in the GitHub Copilot Agent:
- `/speckit.specify <Your high level requirements here>`
- `/speckit.clarify`
- `/speckit.plan`
- `/speckit.checklist`
- `/speckit.tasks`
- `/speckit.analyze`
- `Review the checklists.  Mark all items that have been completed.  Ask any questions you need to mark the others.`

Completing these commands should establish a detailed plan to guide GitHub Copilot through the implementation phases.
Occasionally you may need to nudge the AI as you work through this process by answering questions or providing clarification.
Before proceeding review any files in the `/specs/<item>/checklists` folder to ensure everything is marked complete.
Once you have completed these AI commands it is recommended to commit and push before beginning implementation.
Note that this process will automatically create and work within a new branch based on the first few words you enter into the high level requirements text.
I like to create a new PR at this time so I can easily monitor CI throughout the implementation process.

To implement the plan use the `/speckit.implement` command in the GitHub Copilot Agent.
This will cause the AI to step through the generated plan and tasks.
The AI will fequently ask you questions such as 'do you want to begin the first implementation phase' or 'do you want to proceed'.
I've found simply responding with 'Yes, begin the first phase' or 'Yes, proceed' results in very good outcomes.
I've found it is sometimes best to review and approve commands individually as the AI works.
This allows you to tweak things to avoid unnecessary errors along the way that can spiral out of control.
When the AI pauses and asks if you'd like to proceed, be sure to review the changes it has made up to that point and click the `Keep` button before telling the AI to proceed.
Occasionally the GitHub Copilot may pause and say something to the effect of 'Continue to iterate?'
As long as the AI hasn't fallen into a non-productive loop just click 'Continue'.
The end result is the AI writing almost all the code with you occasionally typing 'Yes, proceed' to push it along.

The final step tends to focus on testing and QA steps.
This is where you usually have to get more involved: running linting and formatting, running unit and BDD tests manually, pasting errors back into the AI to generate corrections, etc.


## Constitution Guidance

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

```text
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
```

We use GitHub Actions to automate our CI/CD pipelines ensuring quality and security with every change to the code base.
We will use GitHub's security settings on the repository with CodeQL and Depend-a-Bot scanning to eliminate vulnerabilities.
We will be fully transparent about our application stack by maintaining an SBOM using cyclonedx.
We emply the GitHub Copilot with GitHub Spec-kit as our AI assistant, relying heavily on AI to perform incremental development of small features.
We package our application for deployment using NPM and strictly follow semantic versioning for each release.
No release can be made that doesn't pass all CI/CD tests.