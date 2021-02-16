<script>
  import { createForm } from 'felte';
  import reporter from '@felte/reporter-dom';
  import { checkPerKey, string, not, emptyString, email, enUS, object } from 'bueno';

  const { form } = createForm({
    onSubmit: () => {
      throw {
        password: 'This password already exists',
      };
    },
    onError: error => error,
    reporter: reporter({ single: true }),
    validate: (values) => {
      return checkPerKey(
        values,
        object({
          email: string(email),
          password: string(not(emptyString)),
        }),
        enUS,
      );
    },
  });
</script>

<form use:form>
  <label>
    <span>Email:</span>
    <input id="email-dom" name="email" type="email" aria-describedby="email-validation-dom">
  </label>
  <div id="email-validation-dom" data-felte-reporter-dom-for="email-dom" aria-live="polite" />
  <label>
    <span>Password:</span>
    <input id="password-dom" name="password" type="password" aria-describedby="password-validation-dom">
  </label>
  <div id="password-validation-dom" data-felte-reporter-dom-for="password-dom" aria-live="polite" />
  <button type="submit">Fail to sign in</button>
</form>

<style>
  form {
    display: inline-block;
    font-size: 1.2em;
    background: rgba(255, 62, 0, 0.2);
    padding: 2rem;
    border-radius: 10px 30px;
  }

  input {
    font-size: 1em;
    border: 1px solid #aaa;
    border-radius: 10px;
    padding: 0.3em;
    background: var(--on-primary-color);
  }

  label, input {
    display: block;
  }

  label span {
    font-weight: 700;
    margin-top: 0.7em;
  }

  button {
    margin-top: 0.7em;
    font-size: 0.8em;
    font-weight: 700;
    padding: 0.7em;
    background: var(--primary-color);
    border-radius: 10px;
    border: none;
    color: var(--on-primary-color);
    transition: transform 0.1s;
  }

  button:hover {
    background: var(--primary-color-hover);
  }

  button:active {
    transform: scale(0.9);
  }

  [data-felte-reporter-dom-for] {
    min-height: 1.5rem;
    font-size: 1rem;
    color: red;
  }
</style>
