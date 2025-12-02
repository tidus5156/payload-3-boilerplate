import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔍 Database Audit Report\n');
console.log('='.repeat(60));

// 1. Query all pages
const pages = await payload.find({
  collection: 'pages',
  limit: 100,
  select: {
    id: true,
    slug: true,
    title: true,
    _status: true,
  },
});

console.log(`\n📄 PAGES COLLECTION (Total: ${pages.totalDocs})`);
console.log('-'.repeat(60));

// Group pages by prefix
const pagesByPrefix: Record<string, any[]> = {};
const pagesWithoutPrefix: any[] = [];

pages.docs.forEach(page => {
  if (!page.slug) {
    pagesWithoutPrefix.push(page);
    return;
  }

  const match = page.slug.match(/^([a-z]+)-/);
  if (match) {
    const prefix = match[1];
    if (!pagesByPrefix[prefix]) {
      pagesByPrefix[prefix] = [];
    }
    pagesByPrefix[prefix].push(page);
  } else {
    pagesWithoutPrefix.push(page);
  }
});

// Display pages by category
for (const [prefix, prefixPages] of Object.entries(pagesByPrefix)) {
  console.log(`\n  ${prefix.toUpperCase()} PAGES (${prefixPages.length}):`);
  prefixPages.forEach(p => {
    const status = p._status === 'published' ? '✅' : '📝';
    console.log(`    ${status} ID:${String(p.id).padStart(3)} | ${p.slug?.padEnd(35)} | ${p.title}`);
  });
}

if (pagesWithoutPrefix.length > 0) {
  console.log(`\n  ROOT/OTHER PAGES (${pagesWithoutPrefix.length}):`);
  pagesWithoutPrefix.forEach(p => {
    const status = p._status === 'published' ? '✅' : '📝';
    console.log(`    ${status} ID:${String(p.id).padStart(3)} | ${(p.slug || 'NO SLUG').padEnd(35)} | ${p.title}`);
  });
}

// 2. Check for potential issues
console.log('\n\n🔎 POTENTIAL ISSUES');
console.log('-'.repeat(60));

// Check for pages without slugs
const pagesWithoutSlugs = pages.docs.filter(p => !p.slug);
if (pagesWithoutSlugs.length > 0) {
  console.log(`\n  ⚠️  Pages without slugs (${pagesWithoutSlugs.length}):`);
  pagesWithoutSlugs.forEach(p => {
    console.log(`    ID:${p.id} | Title: ${p.title}`);
  });
} else {
  console.log(`\n  ✅ All pages have slugs`);
}

// Check for duplicate slugs
const slugCounts: Record<string, number> = {};
pages.docs.forEach(p => {
  if (p.slug) {
    slugCounts[p.slug] = (slugCounts[p.slug] || 0) + 1;
  }
});
const duplicates = Object.entries(slugCounts).filter(([_, count]) => count > 1);
if (duplicates.length > 0) {
  console.log(`\n  ⚠️  Duplicate slugs (${duplicates.length}):`);
  duplicates.forEach(([slug, count]) => {
    console.log(`    "${slug}" appears ${count} times`);
  });
} else {
  console.log(`  ✅ No duplicate slugs`);
}

// Check for orphaned pages (not matching routing patterns)
const routePatterns = [
  /^home$/,
  /^[a-z-]+$/, // root pages like "about", "contact", "resources", "areas-we-serve"
  /^owners-[a-z-]+$/,
  /^residents-[a-z-]+$/,
];

const orphanedPages = pages.docs.filter(p => {
  if (!p.slug) return false;
  return !routePatterns.some(pattern => pattern.test(p.slug));
});

if (orphanedPages.length > 0) {
  console.log(`\n  ⚠️  Pages with non-standard slugs (${orphanedPages.length}):`);
  orphanedPages.forEach(p => {
    console.log(`    ID:${p.id} | Slug: ${p.slug}`);
  });
} else {
  console.log(`  ✅ All pages follow routing conventions`);
}

// 3. Check drafts
const draftPages = pages.docs.filter(p => p._status !== 'published');
if (draftPages.length > 0) {
  console.log(`\n  📝 Draft pages (${draftPages.length}):`);
  draftPages.forEach(p => {
    console.log(`    ID:${p.id} | ${p.slug || 'NO SLUG'} | ${p.title}`);
  });
}

console.log('\n' + '='.repeat(60));
console.log('✅ Audit complete!\n');

process.exit(0);
