<script>
  import { createForm } from 'felte';
  import { svelteReporter as reporter, ValidationMessage } from '@felte/reporter-svelte';
  import { checkPerKey, string, not, emptyString, email, enUS, object } from 'bueno';

  const { form } = createForm({
    onSubmit: () => {
      throw {
        password: 'This password already exists',
      };
    },
    onError: error => error,
    reporter,
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
    <input id="email" name="email" type="email" aria-describedby="email-validation">
  </label>
  <ValidationMessage for="email" let:messages={message}>
    <span id="email-validation" class="validation-message">
      {message}
    </span>
  </ValidationMessage>
  <label>
    <span>Password:</span>
    <input id="password" name="password" type="password" aria-describedby="password-validation">
  </label>
  <ValidationMessage for="password" let:messages={message}>
    <span id="password-validation" class="validation-message">
      {message}
    </span>
  </ValidationMessage>
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

  .validation-message {
    display: block;
    min-height: 1.5rem;
    font-size: 1rem;
    color: red;
  }
</style>
