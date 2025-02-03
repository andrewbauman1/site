import fs from 'fs'  // Import the 'fs' module to interact with the file system

// Retrieve command-line arguments passed to the script
const datetime = process.argv[2]  // The datetime when the note was created
const tags = process.argv[3]  // Tags for the note, passed as a comma-separated string
const lang = process.argv[4]  // Language of the note (optional)
const location = process.argv[5] || null  // Location metadata, if provided, otherwise null
const content = process.argv[6]  // The actual content of the note

// Define an array of alphabet letters used for indexing notes
const alphabets = [...'acefmnortuvwyz']

// Count how many notes already exist for the given date by checking '_notes' directory
const idx = fs.readdirSync('_notes').filter(p => p.startsWith(datetime.split(' ')[0])).length

// Select an alphabet letter for indexing the new note based on the existing count
const a = alphabets[idx]

// Construct the filename using the date and selected index letter
const filePath = `_notes/${datetime.split(' ')[0]}-${a}${a}.md`

// Construct the Markdown file content with Jekyll frontmatter
const postContent = `---
title: Note
layout: default
open_heart: true
date: ${datetime}
location: ${location}
tags: ${tags.split(',').map(tag => `\n  - ${tag}`).join('')}${lang ? `\nlang: ${lang}` : ''}
---

${content}
`

// Write the formatted content to the generated file path
fs.writeFileSync(filePath, postContent)
