<script>
  export let segment;
</script>

<nav>
  <h1>
    <a
      href="."
      aria-current="{segment === undefined ? 'page' : undefined}"
      >
      felte
    </a>
  </h1>
  <ul>
    <li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="https://github.com/pablo-abc/felte">docs</a></li>
    <li>
      <a
        class=icon-link
        rel=noreferrer
        href="https://github.com/pablo-abc/felte"
        aria-label="Github Repository"
        >
        <img height=25 width=25 src="icons/github-icon.svg" alt="" />
      </a>
    </li>
  </ul>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,62,0,0.1);
    z-index: 99999;
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
  }

  h1 {
    margin: 0;
    padding: 0 2rem;
  }

  h1 a {
    padding: 0;
  }

  ul {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 2rem;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100%);
    height: 2px;
    background-color: rgb(255,62,0);
    display: block;
    left: 0;
    right: 0;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .icon-link {
    margin-top: 0.3rem;
    padding: 0 0.5em;
  }
</style>
