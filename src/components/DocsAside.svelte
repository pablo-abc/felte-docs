<script>
  export let items = []
</script>

<aside>
  <ul class=sections>
    {#each items as item  (item.id)}
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
</aside>

<style>
  .sections {
    padding: 1rem;
    margin: 1rem;
  }

  aside {
    grid-area: aside;
  }

  .sections, .subsections {
    list-style-type: none;
  }

  .subsections {
    margin-left: 1rem;
  }

  .sections {
    position: -webkit-sticky;
    position: sticky;
    top: 1rem;
  }
</style>
