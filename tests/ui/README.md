# Grid Bootstrap5 UI Tests

This directory contains comprehensive UI tests for all CSS Grid features provided by the grid-bootstrap5 library.

## Test Structure

### Test Pages
- **`pages/comprehensive-test.html`** - Tests all grid features in one comprehensive page
- **`pages/responsive-test.html`** - Tests responsive behavior across breakpoints
- **`index.html`** - Test suite overview and navigation

### Test Scripts
- **`comprehensive.spec.js`** - Automated tests for all grid features
- **`responsive.spec.js`** - Automated responsive behavior tests

## Features Tested

### Core Grid Features
- ✅ **Display Grid**: `.d-grid`, `.d-{breakpoint}-grid`
- ✅ **Grid Columns**: `.grid-cols-{1-12}`, responsive variants
- ✅ **Column Start/End**: `.grid-col-start-*`, `.grid-col-end-*`
- ✅ **Column Span**: `.grid-cs-{1-12}`, responsive variants
- ✅ **Row Span**: `.grid-rs-{1-12}`, responsive variants
- ✅ **Grid Gaps**: `.grid-cg-{0-5}`, `.grid-rg-{0-5}`, responsive variants
- ✅ **Justify Self**: `.just-self-{start|end|center|stretch}`, responsive variants

### Responsive Testing
- ✅ **All Breakpoints**: XS, SM, MD, LG, XL, XXL
- ✅ **Mobile-First**: Single column to multi-column layouts
- ✅ **Responsive Spans**: Different spans at different breakpoints
- ✅ **Responsive Gaps**: Different gap sizes at different breakpoints
- ✅ **Complex Layouts**: Real-world responsive layout examples

## Running Tests

### Manual Testing
1. Start the development server:
   ```bash
   npm run serve
   ```
2. Open http://localhost:3000/tests/ui/ in your browser
3. Navigate through the test pages
4. Resize browser window to test responsive behavior

### Automated Testing
1. Install dependencies:
   ```bash
   npm run test:install
   ```

2. Run all tests:
   ```bash
   npm test
   ```

3. Run tests with browser UI:
   ```bash
   npm run test:ui
   ```

4. Run tests in headed mode (watch tests run):
   ```bash
   npm run test:headed
   ```

### CI/CD Integration
Tests run automatically on:
- ✅ Pull requests to main branch
- ✅ Pushes to main branch

Screenshots are captured and uploaded as artifacts for visual regression testing.

## Test Artifacts

### Screenshots
- Desktop, tablet, and mobile responsive views
- Individual feature screenshots
- Full page screenshots for visual regression

### Browser Coverage
- Chromium (Chrome/Edge)
- Mobile Chrome (on CI)
- Firefox and Safari (local development)

## Visual Regression Testing

The tests capture screenshots at different breakpoints and for different features. These can be used for:

1. **Visual Regression Detection** - Compare screenshots before/after changes
2. **Cross-Browser Testing** - Ensure consistent appearance across browsers
3. **Documentation** - Visual examples of all grid features
4. **Quality Assurance** - Verify grid layouts work as expected

## Contributing

When adding new grid features:

1. Add visual examples to the appropriate test page
2. Add automated tests to verify the feature works
3. Update this README with the new feature
4. Ensure tests pass on all supported browsers

## Test Coverage

Current test coverage includes:
- 📊 **10 major test sections** in comprehensive test
- 📱 **5 responsive test scenarios** 
- 🖥️ **3 viewport sizes** (mobile, tablet, desktop)
- 🎯 **50+ individual grid classes** tested
- ✨ **Complex real-world layouts** validated

All tests are designed to be fast, reliable, and maintainable.