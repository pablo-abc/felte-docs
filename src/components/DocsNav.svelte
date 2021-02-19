<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  export let items;

  const dispatch = createEventDispatcher();

  function clickHandler(event) {
    if (event.target.nodeName !== 'A') return;
    dispatch('close');
  }

  function escHandler(event) {
    if (event.key !== 'Escape') return;
    dispatch('close');
  }

  onMount(() => {
    process.browser && document.addEventListener('keyup', escHandler);
  });

  onDestroy(() => {
    process.browser && document.removeEventListener('keyup', escHandler);
  });
</script>

<nav on:click={clickHandler}>
  <ul class=sections>
    {#each items as item (item.id)}
      <li>
        <a href={`docs#${item.id}`}>
          {item.section}
        </a>
      </li>
      {#if item.subsections}
        <ul class=subsections>
          {#each item.subsections as subsection (subsection.id)}
            <li>
              <a href={`docs#${subsection.id}`}>
                {subsection.name}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    {/each}
  </ul>
</nav>

<style>
  .sections {
    padding: 0 1rem;
    margin: 0 1rem;
    font-size: 1.2rem;
  }
  @media (min-width: 942px) {
    .sections {
      padding: 1rem;
    }
  }

  .sections, .subsections {
    list-style-type: none;
  }

  .subsections {
    margin-left: 1rem;
  }

  li {
    padding: 0.3rem;
  }
</style>
