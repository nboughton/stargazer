# Stargazer (stargazer)

An app for journaling solo Ironsworn: Starforged campaigns

# Contribution Guidelines

## No breaking changes

Modifications to the data model at this point must be limited to optional props which are verified where used to prevent runtime errors.

## Write clear and readable code

Please ensure all code submissions are designed to be as readable as possible and include comments where appropriate to ensure the intent of your code is obvious.

## Please don't try to implement multiplayer

Stargazer is designed as a solo-play app and Oracle dashboard. Pull requests attempting to add multi-player/multi-character will not be merged.

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn run lint
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).
