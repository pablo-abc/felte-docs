<script>
  import HomeExample from '../components/HomeExample.svelte';
</script>

<svelte:head>
  <title>Felte: A form library for Svelte</title>
</svelte:head>

<div>
  <section class=title>
    <h1>FELTE</h1>
    <h2>A form library for Svelte with simple validation reporting.</h2>
  </section>
  <section class=example>
    <HomeExample />
  </section>
</div>

<style>
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  div section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 8rem);
    margin: 2rem 0;
  }

  .title {
    min-width: min(60%, 600px);
  }

  h1 {
    margin: 0 auto;
    font-size: 4em;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1em;
    margin: 0 0 0.5em 0;
  }

  h2 {
    font-weight: 400;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 7em;
    }
  }
</style>
