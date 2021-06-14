![npm](https://img.shields.io/npm/v/grid-bootstrap5) ![npm](https://img.shields.io/npm/dw/grid-bootstrap5) ![NPM](https://img.shields.io/npm/l/grid-bootstrap5)

# grid-bootstrap5

Responsive grid classes for Bootstrap 5. Extends Bootstrap 5 with display: grid utilities.
Uses Bootstrap 5 variables and mixins. It will pick up Bootstrap's or your override varaibles such as $grid-breakpoints. To generate responsive grid utilities.

## Looking for Bootstrap 4 support?

We've got you covered.
Use __[grid-bootstrap](https://www.npmjs.com/package/grid-bootstrap)__

## Install

``` bash
npm i grid-bootstrap5
```

``` bash
yarn add grid-bootstrap5
```


## Use ready css

Link our distributed script in your html's head:

```html
<link rel="stylesheet" type="text/css" href="//unpkg.com/grid-bootstrap5"></script>
<!-- `grid-bootstrap` is now available on the page -->
```

## How to use

### For compiling

Include the entry point grid-bootstrap-import.scss into your scss file.
Replace {relative/path} with the path of your setup

```scss
@import '{relative/path}/node_modules/bootstrap/scss/functions';
@import '{relative/path}/node_modules/bootstrap/scss/variables';
@import '{relative/path}/node_modules/bootstrap/scss/mixins';
@import '{relative/path}/node_modules/bootstrap/scss/grid/grid';
@import '{relative/path}/node_modules/grid-bootstrap/scss/variables';

@import '{relative/path}/node_modules/grid-bootstrap5/scss/grid-bootstrap-import';
```

Or, if you already imported bootstrap sources just import grid bootstrap files

```scss
@import '{relative/path}/node_modules/bootstrap/scss/grid/grid';
@import '{relative/path}/node_modules/grid-bootstrap5/scss/grid-bootstrap-import';
```

#### Variables

You can override the following variables to adapt to your setup.

```scss
$max-columns: 8 !default;
$max-rows: 8 !default;
```

Now you can compile your scss.

### For using compiled

TBD

## Generated css classes

### General class

```html
.d-grid
```

### Grid col start/end

```html
.grid-col-start-#
.grid-col-*-start-#
.grid-col-end-#
.grid-col-*-end-#
...etc
```

### Grid row start/end

```html
.grid-row-start-#
.grid-row-*-start-#
.grid-row-end-#
.grid-row-*-end-#
...etc
```

### Grid template columns

This will create classes to set even width grid columns

```html
.grid-cols-#
.grid-cols-*-#
...etc
```

### Grid spacing utilities

#### Row gap

```html
.grid-rg-#
.grid-rg-*-#
...etc
```

#### Column gap

```html
.grid-cg-#
.grid-cg-*-#
...etc
```

#### Justify self

```html
.just-self-*-start
.just-self-*-end
.just-self-*-center
.just-self-*-stretch
...etc
```
