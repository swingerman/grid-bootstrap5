const { test, expect } = require('@playwright/test');

test.describe('Grid Bootstrap5 - Responsive Tests', () => {
  
  test('responsive grid behavior - desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/tests/ui/pages/responsive-test.html');
    await page.waitForLoadState('networkidle');
    
    // Test desktop layout
    await expect(page).toHaveTitle(/Responsive Tests/);
    
    // Take full page screenshot for desktop
    await page.screenshot({ 
      path: 'tests/ui/screenshots/responsive-desktop.png', 
      fullPage: true 
    });
    
    // Test responsive display grid (should be visible on desktop)
    const responsiveGrid = page.locator('.d-none.d-md-grid');
    await expect(responsiveGrid).toBeVisible();
    
    // Test responsive column count
    const responsiveColumns = page.locator('.grid-cols-1.grid-cols-sm-2.grid-cols-md-3.grid-cols-lg-4.grid-cols-xl-6');
    await expect(responsiveColumns).toBeVisible();
  });
  
  test('responsive grid behavior - tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/tests/ui/pages/responsive-test.html');
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot for tablet
    await page.screenshot({ 
      path: 'tests/ui/screenshots/responsive-tablet.png', 
      fullPage: true 
    });
    
    // Test responsive display grid (should be visible on tablet)
    const responsiveGrid = page.locator('.d-none.d-md-grid');
    await expect(responsiveGrid).toBeVisible();
  });
  
  test('responsive grid behavior - mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/tests/ui/pages/responsive-test.html');
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot for mobile
    await page.screenshot({ 
      path: 'tests/ui/screenshots/responsive-mobile.png', 
      fullPage: true 
    });
    
    // Test responsive display grid (should be hidden on mobile)
    const responsiveGrid = page.locator('.d-none.d-md-grid');
    await expect(responsiveGrid).not.toBeVisible();
    
    // Test that single column layout is active
    const responsiveColumns = page.locator('.grid-cols-1.grid-cols-sm-2.grid-cols-md-3.grid-cols-lg-4.grid-cols-xl-6');
    await expect(responsiveColumns).toBeVisible();
  });
  
  test('responsive breakpoints comparison', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1200, height: 800 },
      { name: 'large-desktop', width: 1400, height: 900 }
    ];
    
    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto('/tests/ui/pages/responsive-test.html');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot at each breakpoint
      await page.screenshot({ 
        path: `tests/ui/screenshots/breakpoint-${breakpoint.name}.png`, 
        fullPage: true 
      });
    }
  });
});