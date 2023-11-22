<template>
  <header class="info">
    <div class="description">
      <p>
        به نام خدا
      </p>
      <p>
        سلام، به <b>چاپ‌خونه</b> خوش اومدید. (خدمات چاپ، از خونه به خونه)
      </p>
    </div>
    <div class="actions">
      <button class="order-start" @click="startOrder">
        شروع سفارش جدید
        <div class="moving-arrow">
          <div class="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </button>
      <button class="order-continue" v-if="hasIncompletedOrder" @click="continueOrder">
        ادامه
      </button>
    </div>
  </header>
  <div class="inverted-content">
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="">
      <path fill="#3189CE" fill-opacity="1"
        d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,101.3C840,139,960,213,1080,234.7C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
      </path>
    </svg> -->
    <div id="wave">
    </div>
    <div class="rest">
      <carousel :items-to-show="1" :autoplay="5000" dir="rtl" :wrapAround="true">
        <slide v-for="slide in slides" :key="slide.id">
          <div class="slide-item">
            <div class="image-container">
              <img :src="slide.image" alt="logo" />
            </div>
            <p class="slide-caption">
              {{ slide.caption }}
            </p>
          </div>
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Counter from './Counter.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ORDER_STEP } from '../../assets/js/enums';
import { useStore } from '../../state';
import { ref, inject, onMounted } from 'vue';
import fakeImage from '../../renderer/logo.avif';
import 'vue-loading-overlay/dist/css/index.css';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const isLoading = inject('isLoading');

const slides = [
  {
    image: fakeImage,
    caption: "۱. سفارش رو شروع کنید",
  },
  {
    image: fakeImage,
    caption: "۲. اسنادتون رو بارگذاری کنید",
  },
  {
    image: fakeImage,
    caption: "۳. ویژگی‌های چاپ رو تنظیم کنید",
  },
  {
    image: fakeImage,
    caption: "۴. پرداخت کنید",
  },
  {
    image: fakeImage,
    caption: "۵. به کارهای دیگه‌تون برسید تا چاپ‌خونه از طریق پست، سفارش‌تون رو به دست‌تون برسونه ...",
  },
]
let store = undefined;

const startOrder = () => {
  isLoading.value = true;

  store.orderStep = ORDER_STEP.SELECT_FILES;
  store.files = [];

  setTimeout(() => {
    isLoading.value = false;
    location.href = '/order';
  }, 1000);
}
const continueOrder = () => {
  location.href = '/order';
}
let hasIncompletedOrder = ref(false);
onMounted(() => {
  store = useStore();

  setTimeout(() => {
    hasIncompletedOrder.value = store.orderStep !== ORDER_STEP.GREETINGS;
  }, 500);

  toast.warn(`در حال حاضر درگاه پرداخت سامانه فعال نیست. لطفا از طریق ایتا و بله سفارش خود را ثبت نمایید. (@chaapkhouneh_ir).`, {
    autoClose: 20000,
  });
})
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  align-self: center;
  position: relative;
  padding: 15px;

  .description {
    opacity: .8;
  }

  .actions {
    display: flex;
    column-gap: 6px;
    margin-top: 20px;
    position: absolute;
    z-index: 1;

    .order-start {
      display: flex;
      border: none;
      background-color: var(--color-secondary);
      color: white;
      padding: 20px;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      opacity: .9;

      &:hover {
        opacity: 1;
      }

      .moving-arrow {
        position: relative;
        width: 60px;
        margin-top: 4px;

        .arrow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform: rotate(90deg);
          cursor: pointer;
        }

        .arrow span {
          display: block;
          width: 14px;
          height: 14px;
          border-bottom: 5px solid white;
          border-right: 5px solid white;
          transform: rotate(45deg);
          margin: -10px;
          animation: animate 2s infinite;
        }

        .arrow span:nth-child(2) {
          animation-delay: -0.2s;
        }

        .arrow span:nth-child(3) {
          animation-delay: -0.4s;
        }

        @keyframes animate {
          0% {
            opacity: 0;
            transform: rotate(45deg) translate(-20px, -20px);
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: rotate(45deg) translate(20px, 20px);
          }
        }
      }
    }

    .order-continue {
      border: solid thin var(--color-secondary);
      background-color: white;
      color: var(--color-secondary);
      padding: 20px;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      opacity: .9;

      &:hover {
        font-weight: bold;
      }
    }
  }
}

.inverted-content {
  width: calc(100% - 20px);
  align-self: center;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;

  // #wave {
  //   position: relative;
  //   height: 70px;
  //   width: 100%;
  //   background: white;
  //   transform: scaleX(-1);
  // }

  // #wave:before {
  //   content: "";
  //   display: block;
  //   position: absolute;
  //   border-radius: 100% 50%;
  //   width: 54%;
  //   height: 80px;
  //   background-color: var(--color-primary);
  //   right: -5px;
  //   top: 40px;
  // }

  // #wave:after {
  //   content: "";
  //   display: block;
  //   position: absolute;
  //   border-radius: 100% 50%;
  //   width: 54%;
  //   height: 70px;
  //   background-color: white;
  //   left: -5px;
  //   top: 27px;
  // }


  svg {}

  .rest {
    display: flex;
    flex-direction: column;
    background-color: var(--color-primary);
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    padding: min(12vw, 100px) 0 40px 0;

    :deep(.carousel) {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .carousel__pagination {
        padding: 0;
      }

      .carousel__viewport {

        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .carousel__track {

          // display: flex;
          // flex-direction: column;
          // flex-grow: 1;

          .carousel__slide {

            // display: flex;
            // flex-direction: column;
            // flex-grow: 1;

            .slide-item {

              display: flex;
              flex-direction: column;
              flex-grow: 1;

              .image-container {

                img {
                  border-radius: 5px;
                  max-height: 20vh;
                }
              }

              .slide-caption {
                color: white;
                padding: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>