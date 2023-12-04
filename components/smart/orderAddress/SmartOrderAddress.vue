<template>
    <div class="smart-order-review">
        <header class="page-title">
            <button class="button-secondary" @click="backToPreviousStep">&#8677;</button>
            <h4 class="step-title">تکمیل مشخصات پستی</h4>
        </header>
        <main class="orders-list">
            <form class="address-form">
                <label for="full-name" class="field">
                    <small>نام و نام خانوادگی</small>
                    <input type="text" id="full-name" class="full-name" v-model.lazy="addressInfo.fullName" v-debounce="1000">
                </label>
                <label for="moblie-number" class="field">
                    <small>شماره تلفن همراه</small>
                    <input type="text" id="moblie-number" class="moblie-number" v-model.lazy="addressInfo.mobileNumber" v-debounce="1000">
                </label>
                <label for="postal-code" class="field">
                    <small>کد پستی</small>
                    <input type="text" id="postal-code" class="postal-code" v-model.lazy="addressInfo.postalCode" v-debounce="1000">
                </label>
                <label for="province" class="field">
                    <small>استان</small>
                    <input type="text" id="province" class="province" v-model.lazy="addressInfo.province" v-debounce="1000">
                </label>
                <label for="city" class="field">
                    <small>شهر</small>
                    <input type="text" id="city" class="city" v-model.lazy="addressInfo.city" v-debounce="1000">
                </label>
                <label for="postal-address" class="field">
                    <small>آدرس پستی</small>
                    <textarea id="postal-address" class="postal-address" v-model.lazy="addressInfo.postalAddress" v-debounce="1000"></textarea>
                </label>
            </form>
        </main>
        <footer class="calculations">
            <SmartOrderAddressPrice continueTitle="تایید" />
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../../state';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { computed, onMounted, unref } from 'vue';
import { BOUNDING_SIZE, COLOR_MODE, ORDER_STEP, PAGE_SIZE } from '../../../assets/js/enums';
import { getBoundingSize } from '../../../assets/js/monary';
import { englishToPersianNumbers } from '../../../assets/js/translate';
import SmartOrderAddressPrice from '../orderAddress/child-components/SmartOrderAddressPrice.vue';

const store = useStore();
const addressInfo = computed({
    get() {
        return store.addressInfo ?? {};
    },
    set(value) {
        store.addressInfo = value;
    }
})

const backToPreviousStep = () => {
    store.orderStep = ORDER_STEP.REVIEW_ORDER;
}
</script>
  
<style lang="scss" scoped>
.smart-order-review {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    margin-top: 10px;

    .page-title {
        display: flex;
        // flex-direction: row-reverse;
        align-items: center;
        column-gap: 10px;
        padding: 10px;
        box-shadow: 0px 0px 20px -4px var(--color-primary);
        z-index: 1;

        .step-title {
            flex-grow: 1;
            color: var(--color-primary);
        }

        button {
            height: 35px;
            border: none;
            background-color: white;
            cursor: pointer;

            &.button-primary {
                padding: 0 15px;
                border-radius: 17.5px;
                background-color: var(--color-secondary);
                color: white;
            }

            &.button-secondary {
                border-radius: 50%;
                width: 35px;
                border: solid thin var(--color-secondary);
                color: var(--color-secondary);
            }
        }
    }

    .orders-list {
        flex: 0px 1 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 20px;

        .address-form {
            display: flex;
            flex-direction: column;
            column-gap: 10px;
            row-gap: 20px;

            .field {
                display: flex;
                justify-content: space-between;

                small {
                    opacity: .8;
                }

                input,
                textarea {
                    border: solid thin var(--color-primary);
                    border-radius: 5px;
                    padding: 5px;
                    color: var(--color-primary);
                    flex-grow: 1;
                    max-width: 60%;
                }
            }
        }
    }

    .calculations {
        box-shadow: 0px 0px 20px -4px var(--color-primary);
    }
}
</style>
  