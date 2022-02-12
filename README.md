# Stylelint themeizer
Stylelint plugin for "Themeizer" ecosystem.

## Features
Checking for the existence of all colors (as well as linear and radial gradients) as a css variable.
Replace them automatically when using stylelint with the `--fix` option.

## Installation
```bash
$ npm install --save-dev stylelint-themeizer
```
_or_
```bash
$ yarn add --dev stylelint-themeizer
```

## Usage
1. Add the plugin to the stylelint config.

_.stylelintrc.json_
```json
{
	"plugins": [
		"stylelint-themeizer"
	]
}
```

2. Configure the rule
```json
{
	"plugins": [
		"stylelint-themeizer"
	],
    "rules": {
		"themeizer/variables": {
            "url": "https://example.com/api/themes/",
            "revalidate": 0.5,
			"lookedTheme": "default-theme-name",
            "headers": {
                "key": "value"
            }
        }
	}
}
```
_where_:
`url` - api url to load and read colors
`revalidate` - period in which to fetch styles (in minutes)
`lookedTheme` - the name of the main theme in which to look colors
`headers` - an object of headers required for reading from api

## Themeizer ecosystem
* [Figma plugin "Themeizer"](https://www.figma.com/community/plugin/1065764293242137356/Themeizer) - plugin for changing themes in design and publishing them in the cloud;
* [themeizer](https://www.npmjs.com/package/themeizer) - package for embedding themes from "Themeizer" Figma plugin at the server level or at build stage;
* [next-themeizer](https://www.npmjs.com/package/next-themeizer) - package for adding "Themeizer" ecosystem interaction configuration to your next.js application;
* [themeizer-cli](https://www.npmjs.com/package/themeizer-cli) - a package to automatically replace published colors (as well as linear and radial gradients) in style files with a css variable;
* [stylelint-themeizer](https://www.npmjs.com/package/stylelint-themeizer) - stylelint plugin for "Themeizer" ecosystem.

## License

[MIT](https://github.com/vordgi/stylelint-themeizer/blob/main/LICENSE)