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
  import Link from '../../components/renderers/Link.svelte';
  import List from '../../components/renderers/List.svelte';
  import Head from '../../components/Head.svelte';

  export let data;

  const renderers = {
    heading: Heading,
    code: Code,
    link: Link,
    list: List,
  };

  let asideItems = data.map(section => ({
    id: section.attributes.id,
    section: section.attributes.section,
    subsections: section.attributes.subsections,
  }));

  let content = data.map(section => section.body).join('\n\n');
</script>

<Head section="Documentation" />

<div class=main-container>
  <main>
    <SvelteMarkdown source={content} {renderers} />
  </main>
  <DocsAside items={asideItems} />
</div>

<style>
  .main-container {
    margin-bottom: 4rem;
  }

  main {
    padding: 2rem 1rem;
  }

  @media (min-width: 966px) {
    .main-container {
      display: grid;
      grid-template-areas: "aside main";
      grid-template-columns: minmax(300px, 20%) 1fr;
    }

    main {
      width: min(75%, 1200px);
      grid-area: main;
      padding: 2rem;
    }
  }
</style>
