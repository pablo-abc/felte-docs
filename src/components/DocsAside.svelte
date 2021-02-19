<script>
  import { onDestroy, onMount } from 'svelte';
  import { cubicIn } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import DocsNav from './DocsNav.svelte';
  import {
    disableBodyScroll,
    clearAllBodyScrollLocks,
  } from 'body-scroll-lock';
  import focusLock from 'dom-focus-lock';

  export let items = []
  let open = false;
  let asideElement;
  let mqList;
  let isDesktop;

  $: {
    if (process.browser && asideElement) {
      if (open) {
        disableBodyScroll(asideElement);
        focusLock.on(asideElement);
      } else {
        clearAllBodyScrollLocks();
        focusLock.off(asideElement);
      }
      if (isDesktop) {
        clearAllBodyScrollLocks();
        focusLock.off(asideElement);
      }
    }
  }

  function menuTransition() {
    return {
      duration: 300,
      css: (t, u) => `
        transform: translateX(-${cubicIn(u) * 300}px);
        opacity: ${t};
      `,
    };
  }

  function watchMedia(e) {
    isDesktop = e.matches;
  }

  onMount(() => {
    mqList = matchMedia('(min-width: 942px)');
    isDesktop = mqList.matches;
    mqList.addEventListener('change', watchMedia);
  });

  onDestroy(() => {
    clearAllBodyScrollLocks();
    mqList?.removeEventListener('change', watchMedia);
  });
</script>

<div class=desktop-menu>
  <aside>
    <DocsNav {items} />
  </aside>
</div>

<div class=mobile-menu>
  {#if open && !isDesktop}
    <div class=overlay on:click="{() => (open = false)}" />
    <aside bind:this={asideElement} transition:menuTransition>
      <div class=actions>
        <button
          class=close-button
          on:click="{() => (open = false)}"
          aria-label="Close side menu"
          >
          <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <DocsNav on:close="{() => (open = false)}" {items} />
    </aside>
  {:else}
    <div class=menu-button transition:fade="{{ duration: 200 }}">
      <button
        on:click="{() => (open = true)}"
        class=menu-button
        aria-label="Open side menu"
        >
        <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  {/if}
</div>

<style>
  .desktop-menu {
    display: none;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }

  aside {
    position: fixed;
    top: 0;
    bottom: 0;
    background: var(--primary-background);
    overflow: auto;
    box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072),
      0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12)
    ;
  }

  @media (min-width: 942px) {
    .desktop-menu {
      display: block;
      grid-area: aside;
    }

    .mobile-menu {
      display: none;
    }

    aside {
      position: -webkit-sticky;
      position: sticky;
      top: 2rem;
      min-height: 0;
      max-height: calc(100vh - 4rem);
      box-shadow: none;
    }
  }

  .menu-button {
    position: fixed;
    display: grid;
    place-items: center;
    background: var(--primary-color);
    height: 44px;
    width: 44px;
    left: 1rem;
    bottom: 1rem;
    transition: background 100ms;
    border-radius: 50%;
  }

  .menu-button:hover {
    background: var(--primary-color-hover);
  }

  .menu-button button {
    background: transparent;
    color: var(--on-primary-color);
  }

  .menu-button svg {
    width: 30px;
  }

  .close-button {
    height: 44px;
    width: 44px;
    transition: color 100ms;
  }

  .close-button:hover {
    color: var(--primary-font-color-hover);
  }

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
</style>
