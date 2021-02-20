<script>
  import HomeExample from '../components/HomeExample.svelte';
  import Features from '../components/Features.svelte';
  import TippyExample from '../components/examples/tippy/Example.svx';
  import DomExample from '../components/examples/dom/Example.svx';
  import SvelteExample from '../components/examples/svelte/Example.svx';
  import Head from '../components/Head.svelte';
</script>

<Head section="Home" />

<main>
  <div class=row>
    <section class=title>
      <h1>FELTE</h1>
      <h2>A form library for Svelte with simple validation reporting.</h2>
    </section>
    <section>
      <HomeExample />
    </section>
  </div>
  <div class=row>
    <Features />
  </div>
  <div class=row>
    <TippyExample />
  </div>
  <div class=row>
    <DomExample />
  </div>
  <div class=row>
    <SvelteExample />
  </div>
</main>

<style>
  .row {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    min-height: calc(100vh - 4rem);
  }

  .row section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem 1rem;
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

  @media (min-width: 971px) {
    h1 {
      font-size: 7em;
    }

    .title {
      min-height: calc(100vh - 10rem);
    }
  }
</style>
