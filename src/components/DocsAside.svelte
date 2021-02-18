<script>
  export let items = []
</script>

<aside>
  <nav>
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
  </nav>
</aside>

<style>
  .sections {
    padding: 1rem;
    margin: 1rem;
  }

  aside {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    grid-area: aside;
    max-height: 100vh;
    overflow: auto;
  }

  .sections, .subsections {
    list-style-type: none;
  }

  .subsections {
    margin-left: 1rem;
  }

  li {
    padding: 0.2rem;
  }
</style>
