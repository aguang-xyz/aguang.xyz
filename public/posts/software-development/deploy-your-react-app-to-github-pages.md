# Deploy Your React App as Github Pages.

[Github Pages](https://pages.github.com/) is a convenient way to publish a website for your project hosted on [Github](https://github.com/). In this article I'll introduce how to set up the Continuous Deployment Workflow based on [Github Actions](https://github.com/features/actions) to build and deploy your React App to [Github Pages](https://pages.github.com/).

## Develop Your React App.

First, we use [create-react-app](https://github.com/facebook/create-react-app) tool to initialize a new project.

```bash
npx create-react-app example-app
```

## Setup Github Workflow.

Then we create a Github Workflow File `.github/workflows/deploy-pages.yml`. Every time we merge a pull request into master or push commits into master, it will trigger a Github Action to build and publish the `build` folder into branch `gh-pages`.

```yml
name: Github Pages
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2.3.1

      - name: Install and Build 🔧
        run: |
          yarn 
          yarn build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.0
        with:
          branch: gh-pages
          folder: build
```

## Config Github Pages Source.

Now, we need to go project settings page and change the Github Pages Source from the branch `gh-pages`.

![](/images/software-development/deploy-your-react-app-to-github-pages/set-pages-branch.png)

After that, we can visit the Github Pages of this project.

## References.

* [GitHub: Where the world builds software](https://github.com/).
* [Github Pages: Websites for you and your projects](https://pages.github.com/).
* [Create React App: Create React apps with no build configuration](https://github.com/facebook/create-react-app).
