<script context="module">
  export async function preload() {
    const res = await this.fetch('docs.json');
    const data = await res.json();
    if (res.status === 200) {
      return { data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import SvelteMarkdown from 'svelte-markdown';
  import Heading from '../../components/renderers/Heading.svelte';
  import Code from '../../components/renderers/Code.svelte';
  import Paragraph from '../../components/renderers/Paragraph.svelte';

  const renderers = {
    heading: Heading,
    code: Code,
  };
  export let data;

  let asideItems = data.map(section => ({
    id: section.attributes.id,
    section: section.attributes.section,
    subsections: section.attributes.subsections,
  }));

  let content = data.map(section => section.body).join('\n\n');
</script>

<svelte:head>
  <title>Felte | Documentation</title>
</svelte:head>

<div class=main-container>
  <main>
    <SvelteMarkdown source={content} {renderers} />
  </main>

  <aside>
    <ul class=sections>
      {#each asideItems as item  (item.id)}
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
</div>

<style>
  .main-container {
    display: grid;
    grid-template-areas: "aside main";
    grid-template-columns: minmax(200px, 20%) 1fr;
  }

  .sections, main {
    padding: 1rem;
    margin: 1rem;
  }

  main {
    grid-area: main;
  }

  @media (min-width: 942px) {
    main {
      width: min(80%, 1200px);
    }
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
