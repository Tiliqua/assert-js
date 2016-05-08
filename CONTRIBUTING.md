# Contributing guide

## Prepare Repository

Before you start fork this project using [Github](https://help.github.com/articles/fork-a-repo/).

### 1. Clone your fork to your local machine

```
mkdir Tiliqua
cd Tiliqua
git clone git@github.com:USERNAME/assert-js.git
cd assert-js
```

### 2. Setup upstream repository

```
git remote add upstream git@github.com:Tiliqua/assert-js.git
```

### 3. Check that the current tests pass

> Before your start make sure [npm](https://www.npmjs.com/) is installed on your local machine

```
npm install
npm test
```

## Work on new feature/patch/bugfix 

### 1. Make sure your master is up to date with upstream

```
cd Tiliqua/assert-js
git checkout master
git pull upstream master
```

### 2. Create new branch

```
git checkout -b BRANCH_NAME master
```

### 3. Work on your code

Try to cover new code with unit tests.
Try to keep your code as clean as possible. 

### 4. Build changes before committing

> Because AssertJS is written in ES6 that is not supported in 100% yet you need to build
> project before committing to make it usable in all environments.

```
npm run build
```

### 5. Commit your changes

```
git commit -a -m "Put changes description here"
```

### 6. Push changes to your Github fork

```
git push origin BRANCH_NAME
```

### 7. Open pull request using Github.

All PR should be made from your fork repo BRANCH_NAME to upstream master branch.

## Update documentation

In order to update documentation you need to checkout to ``gh-pages`` branch first

```
git fetch upstream
git checkout gh-pages
```

Now you should follow instructions from "Work on new feature/patch/bugfix" section of this document. 