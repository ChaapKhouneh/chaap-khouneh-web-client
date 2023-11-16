<template>
    <div class="smart-order-review">
        <h3>بازبینی سفارش و انتخاب آدرس پستی</h3>
        <div class="files">
            <div class="each-file" v-for="file, index in files" :key="file.name + index">
                <div class="index">
                    {{ index }}.
                </div>
                <div class="info">
                    <div class="info-title">
                        عنوان سند
                    </div>
                    <div class="info-value">
                        {{ file.name }}
                    </div>
                </div>
                <div class="info">
                    <div class="info-title">
                        تعداد صفحات
                    </div>
                    <div class="info-value">
                        {{ file.pageCount }}
                    </div>
                </div>
                <div class="info">
                    <div class="info-title">
                        تعداد برگه‌های چاپ
                    </div>
                    <div class="info-value">
                        {{ file.double ? Math.ceil(file.pageCount / 2) : file.pageCount }}
                        ({{ file.double ? 'پشت و رو' : 'تک رو' }})
                    </div>
                </div>
                <div class="info">
                    <div class="info-title">
                        سری
                    </div>
                    <div class="info-value">
                        {{ file.series }}
                    </div>
                </div>
                <div class="info">
                    <div class="info-title">
                        اندازهٔ برگه
                    </div>
                    <div class="info-value">
                        {{ file.pageSize }}
                    </div>
                </div>
                <div class="info">
                    <div class="info-title">
                        حالت رنگی
                    </div>
                    <div class="info-value">
                        {{ file.colorMode }}
                    </div>
                </div>
                <div class="info">
                    <div class="info-title">
                        صحافی
                    </div>
                    <div class="info-value">
                        {{ file.bounding ? 'دارد' : 'ندارد' }}
                    </div>
                </div>
                <div class="info">
                    <div class="info-title">
                        شرح
                    </div>
                    <div class="info-value">
                        {{ file.description }}
                    </div>
                </div>
            </div>
        </div>
        <button class="return" @click="backToPreviousStep">بازگشت</button>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../../state';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { computed, onMounted, unref } from 'vue';
import { BOUNDING_SIZE, COLOR_MODE, ORDER_STEP, PAGE_SIZE } from '../../../assets/js/enums';
import { getBoundingSize } from '../../../assets/js/monary';

const store = useStore();
const files = store.files;
console.log({ files: files });

const backToPreviousStep = () => {
    store.orderStep = ORDER_STEP.SELECT_FILES;
}
</script>
  
<style lang="scss" scoped>
.smart-order-review {
    display: flex;
    // align-items: flex-start;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
    margin-top: 10px;
}
</style>
  