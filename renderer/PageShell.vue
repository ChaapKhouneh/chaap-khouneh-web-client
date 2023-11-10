<template>
  <div class="layout">
    <div class="navigation-top">
      <a href="/" class="logo">
        <div class="logo-image-container">
          <img src="./logo.avif" height="64" width="64" alt="logo" />
        </div>
      </a>
      <p class="invoice">
        <span class="title">
          چاپ‌خونه
        </span>
        <span class="subtitle">
          خدمات چاپ - سریع، راحت، ارزان
        </span>
      </p>
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="navigation-bottom">
      <Link class="pricing" href="/pricing">تعرفه</Link>
      <Link class="order" href="/order">سفارش</Link>
      <Link class="about" href="/about">درباره</Link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Link from './Link.vue'
</script>

<style lang="scss">
@import '/assets/css/_variables.scss';

@font-face {
  font-family: 'iranian-sans';
  font-style: normal;
  src: local('iranian-sans'), url("/fonts/iranian-sans.ttf") format('truetype');
}

body {
  margin: 0;
  font-family: 'iranian-sans';

  #app {
    display: flex;
    background-color: var(--color-primary);
    width: 100vw;
    height: 100vh;
  }
}

* {
  box-sizing: border-box;
  // transition: all ease-in-out .3s;
}

a {
  text-decoration: none;
}
</style>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  width: calc(100% - 35px);
  height: calc(100% - 70px);
  margin: 35px 20px 35px 20px;
  background-color: white;
  border-radius: 5px;
  // box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.67);

  .navigation-top {
    display: flex;
    flex-shrink: 0;
    margin-top: -35px;
    align-items: center;

    .logo {
      margin-right: 5px;

      .logo-image-container {
        border-radius: 50%;
        border: solid medium var(--color-primary);
        background-color: var(--color-primary);
        overflow: hidden;
        width: 68px;
        height: 68px;
      }
    }

    .invoice {
      display: flex;
      align-items: center;
      column-gap: 20px;
      border-radius: 14px;
      border: solid thin var(--color-primary);
      background-color: var(--color-primary);
      color: white;
      padding: 5px 10px;
      margin-right: 5px;

      .title {
        // color: var(--color-secondary);
      }

      .subtitle {
        font-size: x-small;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 31vw;
      }
    }
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    // align-items: center;
    margin-bottom: -35px;
    overflow: auto;
  }

  .navigation-bottom {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    margin-bottom: -35px;

    .order,
    .pricing,
    .about {
      color: var(--color-primary);
      background-color: white;
      border: solid thin var(--color-primary);
      border-radius: 10px;

      &.active {
        color: white;
        background-color: var(--color-primary);
        border-color: white;
        font-weight: bold;
      }
    }

    .pricing,
    .about {
      width: 80px;
    }

    .pricing {
      margin-left: -15px;
    }

    .order {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      z-index: 1;
    }

    .about {
      margin-right: -15px;
      text-align: left;
    }
  }
}
</style>