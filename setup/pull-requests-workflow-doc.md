# How to create and use pull requests

### Create a branch
1. On your local machine, use the terminal to navigate to the repository folder.
1. Navigate to the master branch. 
	- `git checkout master` 
1. Create your new branch.
	- `git checkout -b <branch name>`
1. Make any edits you want to the code and test locally to ensure they are working.
1. (Optional) Make any intermediate commits you need as you are working.
	- `git add .`
	- `git commit -m “<commit message>”`
1. If you haven't committed before this step, first return to the previous step (5) before proceeding.
1. Push your code
	- `git push -u origin <branch name>`

### Open a pull request
**When you have finished making changes for this branch:**

1. Open the git repository in [Github](https://github.com/Shaped-App/App)
1. If you have just recently pushed, you will see a "Compare & pull request" button. Click and proceed to step (5). Otherwise, continue with step(3).
1. Go to the “Pull requests” button (not in the header but under the repository name).
1. Select “New Pull Request”.
1. Configure your PR: 
	- Switch comparing branch to your branch.
	- Write helpful comment that explains what the pull request is changing.
		- (Optional) Note when the PR can be merged, eg. after front/backend have reviewed, after all requested reviewers has approved, only when you are ready, etc.
	- (Optional) Add requested reviewers for this PR.
	- (Optional) Assign specific people for this PR.
1. Submit pull request.
   - *Note*: continuing to commit to this branch will update this PR.
1. Put a message in the slack channel "dev-pr-related" that the pull request has been submitted
1. After the PR has been approved by both a frontend and a backend member, merge it via the *Squash and Merge* option
1. Delete the branch
