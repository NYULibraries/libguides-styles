# Libguides Styles

[![CircleCI](https://circleci.com/gh/NYULibraries/libguides-styles.svg?style=svg)](https://circleci.com/gh/NYULibraries/libguides-styles)

Manage the CSS and JS for NYU Libraries' instance of SpringShare's LibGuides (LG) product.

## CSS

All custom styles for LibGuides start through the `scss/index.scss` entrypoint but can be split into multiple modular files if necessary thanks to webpack.

## JS

All custom Javascript fo LibGuides start through the `js/index.js` entrypoint but can be split into multiple module files if necessary thanks to webpack.

## Layouts

There is no way in LibGuides to host templates externally so we will just use this repository as a copy of the templating work we have to do directly in the LG interface. It is not the canonical source of truth and may become out-of-sync with the live version if not meticulously manually managed.

### Layouts structure

LibGuides allows for the customization of a number of types of pages and our `layouts` directory is structured to reflect those:

- `guide` - an actual research guide, e.g. https://guides.nyu.edu/health
- `homepage` - the homepage, e.g. https://guides.nyu.edu
- `search` - search results page
- `subject`
  - `individual-subject` - an individual subject with multiple guides, e.g. https://guides.nyu.edu/subject_africana
  - `landing-page` -  https://guides.nyu.edu/sb.php
- `profile`
  - `individual-profile` - a person in the system's profile page, e.g. https://guides.nyu.edu/prf.php?account_id=24837
  - `landing-page` - https://guides.nyu.edu/prf.php
- `az` - the A-Z database list, e.g. https://guides.nyu.edu/az.php

Within these folders there will be a directory and an index file:

- `backups` - this is where we dumped old templates that we don't use anymore
- `index.html` - this is the customized template we're using for the page type

**Note:** If a directory name matching the above list or an `index.html` doesn't exist we are using the system default template.

#### Naming conventions

A system default template will read `System Default - {PAGE TYPE}`

Our custom template will read `NYU Custom - {PAGE TYPE}`

If we are developing a new feature and require a temporary branch we will name it `NYU Custom - {PAGE TYPE} - {FEATURE NAME}`, e.g. `NYU Custom - Homepage - A11y`

## Look & Feel logic

While there is an `Admin > Look & Feel` section in LG which is where you manage the global templating and JS/CSS there is also the concept of Groups, which can have their own JS/CSS, footer/header and can assign different templates at the homepage and guide level only.

Where possible we've tried to consolidate the customizations by:

- keeping JS minimal
- keeping CSS only at the global level
- allowing custom headers at the group level for branding purposes
- enforcing global templates instead of group templates

**Note:** The above principles match our strategy going forward and may not be universal in the current system.

## Developing locally

Using an nginx proxy we can develop our styles and JS locally in realtime. To bring up the local proxy do the following:

```
docker-compose build
docker-compose up dev
# Visit localhost:8080
```

Because webpack is watching changes on the `js/index.js` and `scss/index.scss` you can develop in real time and see the changes immediately reflected at localhost:8080.

### Changing absolute paths to localhost

Using the [nginx sub_filter module](http://nginx.org/en/docs/http/ngx_http_sub_module.html) we can change the absolute links to local links and the external CDN links to the locally hosted asset files. **Note this doesn't work for all of the on-the-fly generated Javascript** and occasionally while browing the site you'll get sent to a `https://localhost:8080` which will not resolve because we don't serve SSL locally.