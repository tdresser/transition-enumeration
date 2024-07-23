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

## Random Notes

To make images consistent:
```
mogrify -path $OUTPATH \
        -resize 600x600^ \
        -gravity Center  \
        -extent 600x600  \
        $PATH/*
```

To crop screenshots
```
magick 3.png -crop 1080x2208+0+160 3_trim_ui.png
magick 3.png -crop 1080x2065+0+291 3_no_omnibox.png
```