# Head

- Creates meta tags in the App's `<head />` element.

- Works like the Nuxt Head option. Only that a component is used.

## Syntax

```vue
<template>
  <div>
    <!-- use a title template with " - Blog App" appended -->
    <Head title-template="Home page" />

    ...
  </div>

  <div>
    <!-- use plain title -->
    <Head title="Home page" />

    ...
  </div>

  <div>
    <!-- use links, same syntax for meta tags as well -->
    <Head
      title-template="Home page"
      :links="[
        {
          // uid is required
          uid: 'ext-style',
          rel: 'stylesheet',
          href: '/foo',
        },
      ]"
    />

    ...
  </div>
</template>
```

> Only `title`, `meta`, and `link` tags works
