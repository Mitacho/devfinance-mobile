<p align="center">
  <img src="/.github/logo.svg" width="96" />
</p>

<h1 align="center">
  DevFinance Mobile
</h1>

A React Native version of [DevFinance](https://mitacho.github.io/devfinance)

## Layout

<img src="/.github/home.svg" width="280" />

<img src="/.github/settings.svg" width="280" />

## Android Developer Instructions

You need to generate an upload key: https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key

After that, place the generated ``key.keystore`` file under the ``android/app directory`` in the project folder.

**clone and install dependencies**

```bash
git clone https://github.com/Mitacho/devfinance-mobile.git
yarn install
```

**run the React Native app**

open a terminal instance and type the following command in the project root folder:

```bash
yarn start
```

open another terminal instance and type the following command in the project root folder:

```bash
yarn android
```
