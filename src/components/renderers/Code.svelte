<script>
  import hljs from 'highlight.js';
  export let lang;
  export let text;

  let code = hljs.highlight(lang, text).value;
</script>

<pre class={`hljs ${lang}`}><code class=hljs>{@html code}</code></pre>

<style>
  pre {
    margin: 1rem 0;
    border: 2px solid var(--primary-color);
    border-radius: 10px 30px;
  }
</style>
