## Setup
```
pnpm install
pnpm run dev
```

## Pre-Upload
```
pnpm build
```

## Purpose
This exists to enable easy experimentation and enumeration of types of navigation transitions which may or may not be appropriate for cross-origin or cross-site transitions.

It should be easy to:
- Add a new page to transition to/from.
- Add multiple types of transitions to/from all existing pages.

This has resulted in a somewhat weird architecture, where pages don't know what kinds of transitions they might participate in, and the pages only minimally collaborate with the `Example` component which embeds them.

## TODO
- Implement a Z axis shared axis transition: https://m2.material.io/design/motion/the-motion-system.html#shared-axis

## Random Notes

To make images consistent:
```
mogrify -path ./public/images/standardbugs \
        -resize 600x600^ \
        -gravity Center  \
        -extent 600x600  \
        ./public/images/bugs/*
```
