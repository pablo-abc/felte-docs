---
section: Validation
subsections:
  - Submit errors
  - Error handling
---

## Validation

The `createForm` function can also accept a validation function. It's a function that accepts the current form values and needs to return an object with the same shape, but instead of the property values it can have a string or array of strings containing the validation messages.

```javascript
const { form } = createForm({
  // ...
  validate (values) => {
    const errors = {}
    if (!values.email) errors.email = 'Must be a valid email';
    if (!values.password) errors.password = [
      'Must not be empty',
      'Must be over 8 characters',
    ];
    if (values.password && values.password.length < 8) {
      errors.password = ['Must be over 8 characters'];
    }
    return errors;
  },
  // ...
});
```

It shouldn't be a hard task to use a third party library, such as [yup](https://github.com/jquense/yup), with this:

```javascript
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const { form } = createForm({
  // ...
  validate async (values) => {
    try {
      await schema.validate(values);
    } catch (err) {
      return err;
    }
  },
  // ...
});
```

This is also to show that `validate` can handle async functions as well!

Felte will validate whichever field it considers as `touched` as you fill the form, and it will validate all fields (and set them as `touched`) when submitting it.

### Submit errors

You can add an `onError` function to the `createForm` that will be called if the `onSubmit` function throws an error. It will be called with the value thrown from the `onSubmit` function. You can use the `onError` function to shape your server errors into the same shape that the `validate` function expect and return them from the same function for them to be handled.

```javascript
const { form } = createForm({
  // ...
  // Assuming your server already returns them with the appropriate shape.
  // Might not be the case for most cases.
  onError: (errors) => errors,
  // ...
});
```

### Error handling

`createForm` returns also its `errors` and `touched` fields as stores.

```html
<script>
  const { form, errors, touched } = createForm({ \*...*\ });
</script>

<pre>
  <!-- Prettify the errors and display them in HTML -->
  {JSON.stringify($errors, null, 2}
</pre>

<pre>
  {JSON.stringify($touched, null, 2}
</pre>
```