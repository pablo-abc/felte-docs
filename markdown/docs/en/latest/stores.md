---
section: Stores
subsections:
  - data
  - errors
  - touched
  - isValid
  - isSubmitting
  - Additional helpers
---

## Stores

Felte's `createForm` returns the stores it uses to handle your form. These stores are `data`, `errors` and `touched`.

### data

A writable store that contains the form's values. Depending on the field type, the values can be either a `string`, an array of `string`s, a `number`, a `boolean`, a `File`, an array of `File`s or `undefined` if no value has been set.

### errors

A writable store that contains the validation errors in the form. It will have the same shape as `data` but containing either a `string` or an array of `string`s with each validation message per field.

### touched

A writable store with the same shape as `data` but containing `boolean`s as values, defining if the field has been touched or not.

### isValid

A readable store containing a single boolean that tells if the form is valid or not.

### isSubmitting

A readable store containing a single boolean that tells if the form is submitting or not.

### Additional helpers

`createForm` also returns some additional helpers.

#### setField

A function that accepts a `string` path for the `data` store, the value to be set and an optional boolean argument defining if this operation should _touch_ the field (defaults to `true`).

Note that in order for this change to be reflected on your form you'll need to assign the store's value to the input's value.

#### setTouched

A function that accepts a `string` path for the `touched` store that sets a field to `touched`.

#### setError

A function that accepts a `string` path for the `errors` store that sets an error.

#### validate

A function that forces Felte to validate all inputs, touches all of them and updates the `errors` store.

#### reset

A function that resets all inputs and the `data` store to its original values.

#### createSubmitHandler

A function that creates a submit handler with overriden `onSubmit`, `onError` and/or `validate` functions. If nothing is passed as a first arg, or if any of the three accepted properties is undefined, it will use the values from the `createForm` configuration object as a default.

```html
<script>
  const { form, createSubmitHandler } = createForm({
    onSubmit: (values) => console.log('Default onSubmit'),
  });

  const altOnSubmit = createSubmitHandler({
    onSubmit: (values) => console.log('Alternative onSubmit'),
    validate: (values) => /* ... */,
    onError: (errors) => /* ... */,
  });
</script>

<form use:form>
  <input type="email" name="email">
  <input type="password" name="password">
  <button type="submit">Call default submit handler</button>
  <button type="submit" on:click={altOnSubmit}>Call alternative submit handler</button>
</form>
```
