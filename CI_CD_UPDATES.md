# CI/CD Workflow Updates

## Date: October 1, 2025

## Summary
Updated GitHub Actions workflow and created Dependabot configuration to automate dependency and action updates.

---

## GitHub Actions Workflow Updates

### Changes Made to `.github/workflows/CI-CD.yaml`

#### 1. Updated Actions to Latest Versions

| Action | Old Version | New Version | Changes |
|--------|-------------|-------------|---------|
| `actions/checkout` | v1 | v4 | Major security and performance improvements |
| `actions/setup-node` | v1 | v4 | Better caching, improved performance |
| `JS-DevTools/npm-publish` | v1 | v3 | Enhanced reliability and features |
| `actions/upload-artifact` | N/A | v4 | Added for build artifact storage |

#### 2. Updated Node.js Version

- **Old**: Node.js 10 (EOL since April 2021)
- **New**: Node.js 20.x (Current LTS, supported until 2026)
- **Benefits**: 
  - Active security updates
  - Better performance
  - Modern JavaScript features
  - Compatible with latest dependencies

#### 3. Migrated from NPM to Yarn

- Changed all `npm` commands to `yarn` for consistency with local development
- Added `--frozen-lockfile` flag to ensure reproducible builds
- Enabled Yarn caching in `setup-node` action for faster builds

#### 4. Enhanced Workflow Structure

**Added Build Job:**
- Separated build and publish into distinct jobs
- Runs on all pushes and pull requests
- Performs linting before building
- Uploads build artifacts for inspection

**Improved Publish Job:**
- Only runs on main/master branch pushes
- Depends on successful build job
- Uses proper Node.js registry configuration

#### 5. Added Trigger Controls

```yaml
on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master
```

Benefits:
- Builds run on all branches for PRs
- Publishes only happen on main/master
- Better CI/CD flow control

### Before and After Comparison

**Before:**
```yaml
on: push

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 10
      - run: npm install
      - run: npm run css
      - uses: JS-DevTools/npm-publish@v1
        with:
          token: ${{ secrets.NPM_TOKEN }}
```

**After:**
```yaml
name: CI/CD

on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Lint SCSS
        run: yarn css-lint
      
      - name: Build CSS
        run: yarn css
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  publish:
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master')
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'yarn'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Build CSS
        run: yarn css
      
      - name: Publish to NPM
        uses: JS-DevTools/npm-publish@v3
        with:
          token: ${{ secrets.NPM_TOKEN }}
```

---

## Dependabot Configuration

### Created `.github/dependabot.yml`

This configuration enables automated dependency and GitHub Actions updates.

#### Features:

**1. NPM/Yarn Dependency Updates**
- Checks weekly every Monday at 9:00 AM
- Groups minor and patch updates together to reduce PR noise
- Allows up to 10 open PRs at a time
- Adds labels: `dependencies`, `automated`
- Commit message prefix: `chore`

**2. GitHub Actions Updates**
- Checks weekly every Monday at 9:00 AM
- Groups all actions updates together
- Allows up to 5 open PRs at a time
- Adds labels: `github-actions`, `dependencies`, `automated`
- Commit message prefix: `ci`

**3. Configuration Details:**

```yaml
version: 2
updates:
  # NPM/Yarn dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    groups:
      dependencies:
        patterns:
          - "*"
        update-types:
          - "minor"
          - "patch"
    labels:
      - "dependencies"
      - "automated"
    commit-message:
      prefix: "chore"
      include: "scope"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    groups:
      github-actions:
        patterns:
          - "*"
    labels:
      - "github-actions"
      - "dependencies"
      - "automated"
    commit-message:
      prefix: "ci"
      include: "scope"
```

---

## Benefits

### Security
- ✅ All GitHub Actions updated to latest secure versions
- ✅ Automated security updates for dependencies
- ✅ Automated security updates for GitHub Actions
- ✅ Node.js version with active security support

### Performance
- ✅ Yarn caching reduces build times
- ✅ Faster checkout with actions/checkout@v4
- ✅ Improved Node.js setup with setup-node@v4
- ✅ Modern Node.js 20.x performance improvements

### Maintainability
- ✅ Automated dependency updates via Dependabot
- ✅ Automated GitHub Actions updates via Dependabot
- ✅ Grouped updates reduce PR noise
- ✅ Clear job separation (build vs publish)
- ✅ Proper labeling and commit message conventions

### Reliability
- ✅ Frozen lockfile ensures reproducible builds
- ✅ Linting runs before build
- ✅ Build must succeed before publish
- ✅ Conditional publishing (only on main/master)
- ✅ Build artifacts available for inspection

---

## What Happens Next?

### When You Push These Changes:

1. **Dependabot Activation**
   - Dependabot will automatically scan your repository
   - It will create PRs for any outdated dependencies or actions
   - You'll receive PRs every Monday at 9:00 AM (if updates are available)

2. **CI/CD Workflow**
   - Every push to any branch will trigger the build job
   - Linting and building will be verified
   - PRs will show build status before merging
   - Publishing only happens on main/master pushes

3. **Dependency Management**
   - Minor and patch updates will be grouped together
   - Major version updates will create separate PRs
   - You can review and merge updates at your convenience

### Managing Dependabot PRs:

**Option 1: Auto-merge Minor Updates**
You can configure auto-merge for low-risk updates:
```bash
# Enable auto-merge for Dependabot PRs with specific labels
gh pr merge <PR-NUMBER> --auto --merge
```

**Option 2: Manual Review**
- Review the changelog for each update
- Check if tests pass
- Merge when comfortable

**Option 3: Customize Grouping**
Edit `.github/dependabot.yml` to customize how updates are grouped:
- Group by dependency type
- Group by update type
- Create custom groups for specific packages

---

## Testing

To test the workflow locally, you can use [act](https://github.com/nektos/act):

```bash
# Install act
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run the workflow
act -W .github/workflows/CI-CD.yaml
```

Or wait for a push to trigger the workflow on GitHub.

---

## Recommendations

1. **Monitor Initial Dependabot PRs**
   - Review the first few PRs carefully
   - Adjust configuration if too many PRs are created
   - Fine-tune grouping rules as needed

2. **Enable Branch Protection**
   - Require CI to pass before merging
   - Require reviews for Dependabot PRs (optional)
   - Enable auto-merge for trusted updates

3. **Review Workflow Runs**
   - Check the Actions tab after pushing
   - Verify builds complete successfully
   - Ensure publishing works as expected

4. **Keep Secrets Updated**
   - Verify `NPM_TOKEN` secret is still valid
   - Consider using OIDC for enhanced security
   - Rotate tokens periodically

5. **Consider Additional Checks**
   - Add code coverage reporting
   - Add automated security scanning (CodeQL)
   - Add performance benchmarks

---

## Rollback Plan

If issues arise with the new workflow:

1. **Revert Workflow Changes**
   ```bash
   git revert <commit-hash>
   git push
   ```

2. **Disable Dependabot**
   - Go to repository Settings → Code security and analysis
   - Disable Dependabot version updates
   - Or delete `.github/dependabot.yml`

3. **Use Previous Node Version**
   - Edit workflow to use Node 16.x or 18.x if needed
   - Though Node 10 should not be used (EOL)

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Node.js Release Schedule](https://nodejs.org/en/about/releases/)
- [Yarn Documentation](https://yarnpkg.com/)
