---
section: Getting started
---

## Getting started

To start you will only need to install Felte from npm.

```sh
npm i -S felte

# Or if you use yarn

yarn add felte
```

Then in any svelte component, import the `createForm` function and call it with an `onSubmit` action. The `createForm` returns an action that you can use in any form. This is all you need to make your form reactive.

```html
<script>
  import { createForm } from 'felte';

  const { form } = createForm({
    onSubmit: (values) => {
      // ...
    },
  })
</script>

<form use:form>
  <input type="text" name="email">
  <input type="password" name="password">
  <input type="submit" value="Sign in">
</form>
```

In order for Felte to be aware of your inputs, make sure to assign a **name** to them.

Felte also offers valildation handling and error reporting but this is all you need for the most basic, validation-less form.
