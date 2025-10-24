# Copilot Instructions for grid-bootstrap5

## Project Overview

This project extends Bootstrap 5 with CSS Grid utilities (`display: grid`). It provides responsive grid classes that work seamlessly with Bootstrap 5's existing framework, using Bootstrap's variables, mixins, and breakpoints.

**Main Purpose**: Generate responsive CSS Grid utility classes for Bootstrap 5 projects.

**Technology Stack**:
- SCSS/Sass for styling
- Bootstrap 5 (peer dependency)
- Node.js build tools (npm/yarn)
- Stylelint for code quality

## Project Structure

- `/scss` - Source SCSS files
  - `grid-bootstrap-next.scss` - Main entry point
  - `_variables.scss` - Project variables
  - `_utilities.scss` - Utility class definitions
  - `/grid/_grid.scss` - Core grid class generation
- `/dist` - Compiled CSS output
- `.stylelintrc.json` - Stylelint configuration

## Coding Standards

### SCSS/CSS Guidelines

1. **Use Bootstrap 5 conventions**: Follow Bootstrap's naming patterns and structure
2. **Responsive-first**: Use Bootstrap's breakpoint system (`$grid-breakpoints`)
3. **Use SCSS features**: Leverage `@for`, `@each`, mixins, and variables
4. **Important flags**: Use `!important` on utility classes (Bootstrap convention)
5. **Vendor prefixes**: Include `-ms-` prefix for legacy IE Grid support where needed
6. **Class naming**:
   - Use kebab-case for class names
   - Prefix grid utilities with `grid-` (e.g., `.grid-cols-`, `.grid-cg-`)
   - Use Bootstrap's breakpoint infixes (e.g., `-sm-`, `-md-`, `-lg-`)

### Code Style

- Use 4 spaces for indentation in SCSS
- Follow stylelint-config-standard-scss rules (see `.stylelintrc.json`)
- Keep selectors simple and maintainable
- Comment complex logic with inline comments
- Group related utilities together

### Variables

Default project variables:
```scss
$max-columns: $grid-columns !default;  // Default: 12
$max-rows: $grid-columns !default;     // Default: 12
```

Always use `!default` flag for variables that users may want to override.

## Build Process

### Commands

- `npm run css-lint` or `yarn css-lint` - Run Stylelint on SCSS files
- `npm run css` or `yarn css` - Full build (compile + compress)
- `npm run css-compile-main` - Compile SCSS to CSS with sourcemaps
- `npm run css-compress` - Minify compiled CSS
- `npm run watch` - Watch for SCSS changes and rebuild
- `npm run prepare` - Run on package install (builds CSS)

### Build Requirements

- All SCSS must pass Stylelint before committing
- Compiled CSS goes to `/dist/css/`
- Always generate sourcemaps
- Both expanded and minified versions are needed

## Generated CSS Classes

The project generates these utility patterns:

1. **Display Grid**: `.d-grid`, `.d-{breakpoint}-grid`
2. **Template Columns**: `.grid-cols-{n}`, `.grid-cols-{breakpoint}-{n}`
3. **Column Start/End**: `.grid-col-start-{n}`, `.grid-col-{breakpoint}-start-{n}`
4. **Row Start/End**: `.grid-row-start-{n}`, `.grid-row-{breakpoint}-start-{n}`
5. **Column Span**: `.grid-cs-{n}`, `.grid-cs-{breakpoint}-{n}`
6. **Row Span**: `.grid-rs-{n}`, `.grid-rs-{breakpoint}-{n}`
7. **Gap Utilities**: `.grid-cg-{n}`, `.grid-rg-{n}` (column/row gap)
8. **Justify Self**: `.just-self-{breakpoint}-{value}`

## Integration with Bootstrap

- Import Bootstrap functions, variables, and mixins first
- Use Bootstrap's `$grid-breakpoints` for responsive variants
- Use Bootstrap's `$spacers` for gap utilities
- Leverage Bootstrap's utility API for consistent patterns
- Follow Bootstrap's responsive naming conventions

## Testing

- Test SCSS compilation: `npm run css`
- Lint SCSS code: `npm run css-lint`
- No unit tests currently (CSS-only library)
- Manual testing via `index.html` example file

## Best Practices for Contributors

1. **Minimal Changes**: Keep changes focused and minimal
2. **Bootstrap Compatibility**: Ensure compatibility with Bootstrap 5.x
3. **Responsive Design**: Always consider all breakpoints
4. **Documentation**: Update README.md if adding new features
5. **Backwards Compatibility**: Don't break existing class names
6. **Performance**: Keep generated CSS size reasonable
7. **Browser Support**: Match Bootstrap 5's browser support requirements

## Common Tasks

### Adding a New Utility Class

1. Define in `_utilities.scss` using Bootstrap's utility API, or
2. Add to `/scss/grid/_grid.scss` for grid-specific classes
3. Use loops (`@for`, `@each`) for responsive variants
4. Test compilation and lint

### Modifying Grid Generation

- Edit `/scss/grid/_grid.scss`
- Consider impact on all breakpoints
- Test with different `$max-columns` and `$max-rows` values

### Updating Dependencies

- Check Bootstrap compatibility when updating
- Test compilation after dependency updates
- Run `npm run audit:fix` for security updates

## Distribution

- Main file: `dist/css/grid-bootstrap-next.css`
- Minified: `dist/css/grid-bootstrap-next.min.css`
- Published to npm as `grid-bootstrap5`
- CDN available via unpkg
