const { test, expect } = require('@playwright/test');

test.describe('Grid Bootstrap5 - Comprehensive UI Tests', () => {
  
  test('comprehensive grid features test', async ({ page }) => {
    // Navigate to the comprehensive test page
    await page.goto('/tests/ui/pages/comprehensive-test.html');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Test page title
    await expect(page).toHaveTitle(/Grid Bootstrap5 - Comprehensive UI Test Suite/);
    
    // Test that basic grid container is visible
    const gridContainer = page.locator('.d-grid').first();
    await expect(gridContainer).toBeVisible();
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'tests/ui/screenshots/comprehensive-test-full.png', 
      fullPage: true 
    });
    
    // Test specific grid sections
    await test.step('Test basic display grid', async () => {
      const basicGrid = page.locator('.d-grid.grid-cols-3').first();
      await expect(basicGrid).toBeVisible();
      
      // Screenshot of basic grid section
      await basicGrid.screenshot({ 
        path: 'tests/ui/screenshots/basic-grid.png' 
      });
    });
    
    await test.step('Test grid template columns', async () => {
      const gridCols1 = page.locator('.grid-cols-1').first();
      const gridCols2 = page.locator('.grid-cols-2').first();
      const gridCols4 = page.locator('.grid-cols-4').first();
      
      await expect(gridCols1).toBeVisible();
      await expect(gridCols2).toBeVisible();
      await expect(gridCols4).toBeVisible();
      
      // Screenshot grid columns section
      const columnsSection = page.locator('h2:has-text("Grid Template Columns")').locator('..').first();
      await columnsSection.screenshot({ 
        path: 'tests/ui/screenshots/grid-columns.png' 
      });
    });
    
    await test.step('Test grid column span', async () => {
      const spanSection = page.locator('h2:has-text("Grid Column Span")').locator('..').first();
      await expect(spanSection).toBeVisible();
      
      // Test specific span elements
      const span1 = page.locator('.grid-cs-1').first();
      const span2 = page.locator('.grid-cs-2').first();
      const span3 = page.locator('.grid-cs-3').first();
      const span6 = page.locator('.grid-cs-6').first();
      
      await expect(span1).toBeVisible();
      await expect(span2).toBeVisible();
      await expect(span3).toBeVisible();
      await expect(span6).toBeVisible();
      
      await spanSection.screenshot({ 
        path: 'tests/ui/screenshots/column-span.png' 
      });
    });
    
    await test.step('Test grid row span', async () => {
      const rowSpanSection = page.locator('h2:has-text("Grid Row Span")').locator('..').first();
      await expect(rowSpanSection).toBeVisible();
      
      const rowSpan2 = page.locator('.grid-rs-2').first();
      const rowSpan3 = page.locator('.grid-rs-3').first();
      
      await expect(rowSpan2).toBeVisible();
      await expect(rowSpan3).toBeVisible();
      
      await rowSpanSection.screenshot({ 
        path: 'tests/ui/screenshots/row-span.png' 
      });
    });
    
    await test.step('Test grid gap utilities', async () => {
      const gapSection = page.locator('h2:has-text("Grid Gap Utilities")').locator('..').first();
      await expect(gapSection).toBeVisible();
      
      const gap0 = page.locator('.grid-cg-0').first();
      const gap3 = page.locator('.grid-cg-3').first();
      const rowGap3 = page.locator('.grid-rg-3').first();
      
      await expect(gap0).toBeVisible();
      await expect(gap3).toBeVisible();
      await expect(rowGap3).toBeVisible();
      
      await gapSection.screenshot({ 
        path: 'tests/ui/screenshots/grid-gaps.png' 
      });
    });
    
    await test.step('Test justify self utilities', async () => {
      const justifySection = page.locator('h2:has-text("Justify Self Utilities")').locator('..').first();
      await expect(justifySection).toBeVisible();
      
      const justStart = page.locator('.just-self-start').first();
      const justEnd = page.locator('.just-self-end').first();
      const justCenter = page.locator('.just-self-center').first();
      const justStretch = page.locator('.just-self-stretch').first();
      
      await expect(justStart).toBeVisible();
      await expect(justEnd).toBeVisible();
      await expect(justCenter).toBeVisible();
      await expect(justStretch).toBeVisible();
      
      await justifySection.screenshot({ 
        path: 'tests/ui/screenshots/justify-self.png' 
      });
    });
    
    await test.step('Test complex grid layout', async () => {
      const complexSection = page.locator('h2:has-text("Complex Grid Layout")').locator('..').first();
      await expect(complexSection).toBeVisible();
      
      await complexSection.screenshot({ 
        path: 'tests/ui/screenshots/complex-layout.png' 
      });
    });
  });
});