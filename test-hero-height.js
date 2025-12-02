import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Get viewport height
  const viewportHeight = await page.evaluate(() => window.innerHeight);

  // Get the hero section height and position
  const heroMetrics = await page.evaluate(() => {
    const section = document.querySelector('section');
    const rect = section.getBoundingClientRect();
    return {
      sectionTop: rect.top,
      sectionBottom: rect.bottom,
      sectionHeight: rect.height,
      computedMinHeight: window.getComputedStyle(section.firstElementChild).minHeight,
      viewportHeight: window.innerHeight,
      actualCoverage: ((rect.bottom - rect.top) / window.innerHeight * 100).toFixed(2)
    };
  });

  console.log('Desktop (1920x1080):');
  console.log('  Viewport Height:', viewportHeight + 'px');
  console.log('  Section Top:', heroMetrics.sectionTop + 'px');
  console.log('  Section Bottom:', heroMetrics.sectionBottom + 'px');
  console.log('  Section Height:', heroMetrics.sectionHeight + 'px');
  console.log('  Computed minHeight:', heroMetrics.computedMinHeight);
  console.log('  Coverage:', heroMetrics.actualCoverage + '%');
  console.log('  Full Viewport?', heroMetrics.sectionBottom >= viewportHeight ? 'YES ✓' : 'NO ✗');

  // Test on different screen size
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.waitForLoadState('networkidle');

  const heroMetrics2 = await page.evaluate(() => {
    const section = document.querySelector('section');
    const rect = section.getBoundingClientRect();
    return {
      sectionTop: rect.top,
      sectionBottom: rect.bottom,
      sectionHeight: rect.height,
      viewportHeight: window.innerHeight,
      actualCoverage: ((rect.bottom - rect.top) / window.innerHeight * 100).toFixed(2)
    };
  });

  console.log('\nLaptop (1440x900):');
  console.log('  Viewport Height:', heroMetrics2.viewportHeight + 'px');
  console.log('  Section Height:', heroMetrics2.sectionHeight + 'px');
  console.log('  Coverage:', heroMetrics2.actualCoverage + '%');
  console.log('  Full Viewport?', heroMetrics2.sectionBottom >= heroMetrics2.viewportHeight ? 'YES ✓' : 'NO ✗');

  await browser.close();
})();
