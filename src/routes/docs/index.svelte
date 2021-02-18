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
  import DocsAside from '../../components/DocsAside.svelte';

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
  <DocsAside items={asideItems} />
</div>

<style>
  .main-container {
    display: grid;
    grid-template-areas: "aside main";
    grid-template-columns: minmax(200px, 20%) 1fr;
  }

  main {
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
</style>
