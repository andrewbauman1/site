import fs from 'fs'
import path from 'path'

// Retrieve command-line arguments: file path and JSON string
const filePath = process.argv[2]
const jsonString = process.argv[3]

// Check if the file already exists
const fileExists = fs.existsSync(filePath)

// Read existing photos from file if it exists; otherwise, initialize an empty array
const photos = fileExists ? JSON.parse(fs.readFileSync(filePath).toString()) : []

// Parse the input JSON string
try {
  console.log("Raw JSON Input:", jsonString);  // Debugging: See what's actually received
  const json = JSON.parse(jsonString);
  console.log("Parsed JSON:", json);
} catch (error) {
  console.error("❌ JSON Parsing Error:", error.message);
  console.error("Received data:", jsonString);
  process.exit(1); // Exit with an error
}

// Cloudflare Stream uses 'uid' instead of 'id', so ensure 'id' is set
if (!json['id']) json.id = json.uid

// Add the new JSON object to the list of photos
photos.push(json)

// Ensure the directory exists before writing the file
const dirName = path.dirname(filePath)
if (!fileExists && dirName !== '.') {
  fs.mkdirSync(dirName, { recursive: true })  // Create directories recursively if needed
}

// Write updated photo list back to the file
fs.writeFileSync(filePath, JSON.stringify(photos))

// If the file isn't 'stories.json', exit the script
if (!filePath.endsWith('stories.json')) process.exit()

// Parse uploaded date from the JSON metadata
const date = new Date(json.uploaded)
const desc = json.meta.alt || json.meta.title  // Get description from metadata
const isVideo = !!json.playback  // Check if the file is a video

// Initialize frontmatter for Jekyll markdown file
let frontmatter = `
layout: story
date: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}
tags: [ ${json.meta.tags.join(', ')} ]
title: Story`

let markdown = ``  // Initialize markdown content

if (isVideo) {
  // Video-specific metadata
  frontmatter += `
image: ${json.thumbnail}
video: ${json.meta.url}
caption: |
  ${json.meta.title}`

  // Markdown representation of the video
  markdown = `
<video src='${json.meta.url}' poster='${json.thumbnail}' aria-describedby='description'><!-- tracks --></video>

<div id='description'>${json.meta.title}</div>
`
} else {
  // Image-specific metadata
  frontmatter += `
image: https://imagedelivery.net/LQ_Z8HgbrQpAu3k88KR0Rg/${json.id}/public
caption: |
  ${json.meta.caption || ''}
alt: |
  ${desc}`

  // Markdown representation of the image
  markdown = `
![${json.meta.alt}](https://imagedelivery.net/LQ_Z8HgbrQpAu3k88KR0Rg/${json.id}/public)

${json.meta.caption}`
}

// Combine frontmatter and markdown into final content format
const content = `---${frontmatter}
---

${markdown}
`

// Write the generated markdown content to a file in the _stories directory
fs.writeFileSync(`_stories/${json.id || json.uid}.md`, content)
