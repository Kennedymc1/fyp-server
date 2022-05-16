# Getting Setup

Clone the repo and run `npm install` to install all the dependencies.

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.\
Open [http://localhost:4002/graphql](http://localhost:4002/graphql) to view it in the browser.

## Notes
- The `.env` file can be found in the slack group #dev-resources channel.

## Procedure
- When working on a feature, create a new branch with a descriptive title of that feature, when complete create a new Pull Request onto the `dev` branch. once PR gets reviewed and approved the branch will be merged onto the dev branch and deleted.
- The master branch is the deployment CI branch. Never push anything to `master` branch.

## guidelines for a PR to be approved
- remove all console logs
- should have passing tests that cover most if not all crucial edge cases
- Add a description on each commit and pull request
