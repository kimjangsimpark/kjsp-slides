<script lang="ts">
  import { link, push } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
  import { userInfo } from '@/store/user';

  let showsSubMenu = false;

  const handleWindowClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).matches('.user-info')) return;

    showsSubMenu = false;
    window.removeEventListener('click', handleWindowClick);
  };

  const handleProfileClick = () => {
    showsSubMenu = !showsSubMenu;

    window.addEventListener('click', handleWindowClick);
  };

  const handleLogoutButtonClick = () => {
    const acceptLogout = confirm('로그아웃 하시겠어요?');

    if (!acceptLogout) return;

    localStorage.removeItem('accessToken');
    userInfo.set(null);
    void push('/home');
  };
</script>

<header class="header">
  <div class="logo">
    <a href="/home" use:link>
      <svg
        data-name="Layer 1"
        id="Layer_1"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="The Que Logo"
        role="img"
      >
        <title>The Que Logo</title>
        <defs
          ><style>
            .cls-1 {
              fill: #4fbe9f;
            }
            .cls-2 {
              fill: #09816c;
            }
          </style></defs
        ><title /><path
          class="cls-1"
          d="M51.38,45.67h0s-.23,3.44-3.37,3.44c-2.42,0-4.07-1.84-5.61-4.24l0,0c-1-1.78-3.55-5.68-3.55-5.68-1.61-2.29-3.53-4.24-6.28-4.86a13.3,13.3,0,0,0-9.54,1.59,1.17,1.17,0,0,0-.44,1.51l.33.68a1.21,1.21,0,0,0,1.29.76,9.07,9.07,0,0,1,3.6.24c2,.46,3.52,3.2,5.28,6.35a8.47,8.47,0,0,1-3.81.93c-6.53,0-11.83-7.82-11.83-17.46s5.3-17.46,11.83-17.46,11.82,7.81,11.82,17.46a25.7,25.7,0,0,1-.34,4.17,3.74,3.74,0,0,0,1,3.23,28.69,28.69,0,0,1,3.06,3.81.92.92,0,0,0,1.54,0,21.3,21.3,0,0,0,3.15-11.18C49.58,17.36,40.5,8,29.3,8S9,17.36,9,28.91,18.1,49.82,29.3,49.82a19.6,19.6,0,0,0,5.85-.89c2.34,3.72,5.31,7.07,10,7.07C54.59,56,55,45.67,55,45.67Z"
        /><path
          class="cls-2"
          d="M33.11,45.44a8.47,8.47,0,0,1-3.81.93c-3.24,0-6.17-1.92-8.3-5A1.87,1.87,0,0,0,18.17,41c-2,1.83-.32,4.36,2.4,6.76a19.58,19.58,0,0,0,14.58,1.17Z"
        /><path class="cls-2" d="M32.52,44.4h0l0,0Z" /><path
          class="cls-2"
          d="M36,50.26v0Z"
        /></svg
      >
      <h1>The Que</h1>
    </a>
  </div>
  <nav class="header-navigation">
    <ul class="page-list">
      <li><a href="/home/price" use:link use:active>Price</a></li>
      {#if !$userInfo}
        <li><a href="/home/sign-in" use:link use:active>Sign In</a></li>
        <li><a href="/home/sign-up" use:link use:active>Sign Up</a></li>
      {/if}
    </ul>
    {#if $userInfo}
      <div class="user-info" on:click={handleProfileClick}>
        <div class:active={showsSubMenu}>{$userInfo.username}</div>
        <div class="more-icon">=</div>
        <ul class="user-info-sub-menu" class:show={showsSubMenu}>
          <li><a href="/my/setting">Setting</a></li>
          <li><button on:click={handleLogoutButtonClick}>Logout</button></li>
        </ul>
      </div>
    {/if}
  </nav>
</header>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: $global-header-heihgt;
    padding: {
      left: 16px;
      right: 16px;
    }
    background-color: $background-color-light;
    border-bottom: 1px solid $gray-line-2;

    :global(a.active) {
      font-weight: 500;
      color: $primary-color;
    }

    .logo {
      a {
        display: flex;
        align-items: center;

        svg {
          width: 48px;
          height: 48px;
        }

        h1 {
          margin-left: 10px;
          font: {
            size: 22px;
            weight: 300;
          }
          cursor: inherit;
        }
      }
    }

    .header-navigation {
      display: flex;
      height: 100%;

      ul.page-list {
        display: flex;
        align-items: center;
        height: 100%;
        font-weight: 300;

        li {
          a {
            display: block;
            padding: {
              left: 16px;
              top: 8px;
              right: 16px;
              bottom: 8px;
            }

            &:hover {
              color: $primary-color;
            }
          }

          &:active {
            transform: translateY(0.05rem);
            border-radius: 3px;
            background-color: #f8f8f8;
            box-shadow: inset 1px 1px 1px $gray-line-1;
          }
        }
      }

      .user-info {
        position: relative;
        display: flex;
        align-items: center;
        padding: {
          left: 16px;
          top: 8px;
          right: 16px;
          bottom: 8px;
        }
        cursor: pointer;

        & div {
          pointer-events: none;
        }

        & button {
          pointer-events: all;
        }

        &:hover,
        .active {
          color: $primary-color;
        }

        .more-icon {
          margin-left: 8px;
        }

        .user-info-sub-menu {
          display: none;
          position: absolute;
          top: 64px;
          right: 10px;

          width: 90%;

          &.show {
            display: block;
          }

          li {
            width: 100%;
            font-size: 14px;

            a {
              display: block;
              padding: 10px;
              text-align: center;
              background-color: inherit;
            }

            button {
              width: 100%;
              padding: 10px;
              border: none;
              background-color: inherit;
            }
          }
        }
      }
    }
  }
</style>
