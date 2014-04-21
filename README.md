# generator-wp-underscores [![Build Status](https://secure.travis-ci.org/kdo/generator-wp-underscores.png?branch=master)](https://travis-ci.org/kdo/generator-wp-underscores)

A very simple [Yeoman](http://yeoman.io) generator for WordPress starter theme [_s](github.com/automattic/_s).


## Getting Started

Install [Yeoman](http://yeoman.io)

```
npm install -g yo
```

Install generator-wp-underscores

```
npm install -g generator-wp-underscores
```

Create a folder in your WordPress themes folder and initiate the generator

```
mkdir theme-name && cd $_
yo wp-underscores
```

Answer some questions in the prompt and you're done!

Run

```
grunt serve
```
to watch `.scss` files and live reload!

**Note:** live reload works only if you're working on localhost, 192.168.50.4, or an URL ending in .dev

To build

```
grunt build
```
to create your `dist` production-ready folder


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
