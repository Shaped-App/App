# How to create and use pull requests

### Create a branch
1. On your local machine, use the terminal to navigate to the repository folder
1. `git branch <branch name>`
1. `git checkout <branch name>`
1. Make edits to the code and test locally
1. `git add .`
1. `git commit -m “<commit message>”`
1. `git push --set-upstream origin <branch name>`

### Open a pull request
**When you have finished making changes for this branch:**
1. Open the git repository in github (https://github.com/Shaped-App/App)
1. Go to the “Pull requests” button (not in the header but under the repository name)
1. Select “New Pull Request”
1. Switch comparing branch to your branch:
1. Write helpful comment that explains what the pull request is changing
1. Submit pull request
   - NOTE: continuing to commit to this branch will update this PR. Do not move on until you are finished making edits.
1. Put a message in the slack channel "dev-pr-related" that the pull request has been submitted
1. After the PR has been approved by both a frontend and a backend member, merge it
1. Delete the branch
