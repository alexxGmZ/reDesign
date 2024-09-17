<p align="center">
   <img src="./assets/icon/256/reDesign-box/256x256.png">
</p>

<h1 align="center">reDesign</h1>

A rewrite of the HTML Canvas Graphics creator called **Designer** from the [MenuMaApp Manage](https://github.com/alexxGmZ/MenuMaApp/tree/main/Manage)
application. The goal is to make the feature a standalone Electron application.

The application was inspired by the simplicity of [Inkscape](https://inkscape.org/).

<br>

## Supported Platforms

[![Platforms](https://skillicons.dev/icons?i=windows,linux&theme=light)](https://skillicons.dev)

**Dependencies:**

* Electron & Electron Builder
* [Fabric.js](http://fabricjs.com/)
* Bootstrap
* Node.js (LTS)

<br>

## How to build

1. Clone the repository.
```bash
git clone https://github.com/alexxGmZ/reDesign
cd reDesign/
```
2. Install Node.js (LTS).
3. Install dependencies and yarn.
```bash
npm install
npm install -g yarn
```
4. Build which platform you are in.
```bash
# linux (AppImage)
yarn run linux

# windows (portable)
yarn run win
```
