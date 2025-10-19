import fs from 'fs'

// Retrieve command-line arguments passed to the script
const date = process.argv[2]           // Post date (YYYY-MM-DD)
const title = process.argv[3]          // Post title
const layout = process.argv[4] || 'default'  // Layout (default to 'default')
const feature = process.argv[5] || null      // Feature flag (optional)
const content = process.argv[6]        // Post content

// Create the filename based on the date and title
// Format: YYYY-MM-DD-title-slug.md
const titleSlug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
  .replace(/^-+|-+$/g, '')       // Remove leading/trailing hyphens

const filePath = `_posts/${date}-${titleSlug}.md`

// Construct the Markdown file content with Jekyll frontmatter
const postContent = `---
layout: ${layout}
date: ${date}
title: ${title}${feature ? `\nfeature: ${feature}` : ''}
---

${content}
`

// Ensure the _posts directory exists
if (!fs.existsSync('_posts')) {
  fs.mkdirSync('_posts', { recursive: true })
}

// Write the formatted content to the generated file path
fs.writeFileSync(filePath, postContent)

console.log(`✅ Created post: ${filePath}`)
