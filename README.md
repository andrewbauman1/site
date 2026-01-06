# drewsiph.dev
Source code for [drewsiph.dev](https://drewsiph.dev), a personal website built with Jekyll.

## Philosophy

This site prioritizes durability and simplicity. Content is written in plain text, rendered to static HTML, and served with minimal JavaScript. The architecture favors web standards and long-term maintainability over trends.

## Technology

- **Static Generation**: [Jekyll](https://jekyllrb.com/)
- **Markup**: HTML, CSS
- **Scripting**: JavaScript (used sparingly)
- **Syndication**: RSS
- **Custom Elements**: 
  - [`<open-stories>`](https://github.com/dddddddddzzzz/open-stories-element) for narrative content
  - [`<open-heart>`](https://github.com/dddddddddzzzz/open-heart-element) for interactions

## Publishing Workflow

Content is managed through a custom CMS backend that handles drafts, media uploads, and GitHub-based publishing.

- **Backend**: [site-CMS](https://github.com/andrewbauman1/site-CMS) - Next.js application for content management
- **Deployment**: GitHub Actions automatically builds and deploys changes
- **Media**: Cloudflare Images and Stream for asset hosting

## Development

Requires Ruby. Run locally with:
```sh
./start
```

## Attribution

Based on [Mu-An Chiou's](https://muan.co/) original work, modified for custom content and workflows.

## License

### Content (All Rights Reserved)

Original written and visual content is not licensed for reuse:
- `_data/` - Site data and metadata
- `_posts/` - Blog posts and articles  
- `_stories/` - Multi-media narrative content
- `_notes/` - Field notes and observations
- `images/` - Photography and graphics

### Code (MIT License)

Jekyll configuration, templates, layouts, and build scripts are available under the MIT License. See `LICENSE` file for details.
