<template>
    <div class="smart-order-review">
        <header class="page-title">
            <button class="button-secondary" @click="backToPreviousStep">&#8677;</button>
            <h4 class="step-title">بازبینی سفارش</h4>
        </header>
        <main class="orders-list">
            <div class="files">
                <div class="each-file" v-for="file, index in files" :key="file.name + index">
                    <div class="index">
                        {{ englishToPersianNumbers(index + 1) }}
                    </div>
                    <div class="info-area">
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
                                {{ englishToPersianNumbers(file.pageCount) }}
                            </div>
                        </div>
                        <div class="info">
                            <div class="info-title">
                                تعداد برگه‌های چاپ
                            </div>
                            <div class="info-value">
                                {{ englishToPersianNumbers(file.double ? Math.ceil(file.pageCount / 2) : file.pageCount) }}
                                ({{ file.double ? 'پشت و رو' : 'تک رو' }})
                            </div>
                        </div>
                        <div class="info">
                            <div class="info-title">
                                سری
                            </div>
                            <div class="info-value">
                                {{ englishToPersianNumbers(file.series) }}
                            </div>
                        </div>
                        <div class="info">
                            <div class="info-title">
                                اندازهٔ برگه
                            </div>
                            <div class="info-value">
                                {{ PAGE_SIZE[file.pageSize] }}
                            </div>
                        </div>
                        <div class="info">
                            <div class="info-title">
                                حالت رنگی
                            </div>
                            <div class="info-value">
                                {{ COLOR_MODE[file.colorMode] }}
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
            </div>
        </main>
        <footer class="calculations">
            <SmartOrderReceiverPrice continueTitle="تایید" />
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
import SmartOrderReceiverPrice from '../orderReceiver/child-components/SmartOrderReceiverPrice.vue';

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

        .files {
            display: flex;
            flex-direction: column;
            row-gap: 10px;
            
            .each-file {
                display: flex;
                flex-wrap: wrap;
                border: solid thin var(--color-primary);
                border-radius: 10px;
                padding: 10px 0;

                .index {
                    background-color: var(--color-primary);
                    border-radius: 5px 0 0 5px;
                    color: white;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .info-area {
                    display: flex;
                    flex-direction: column;
                    row-gap: 5px;
                    flex-grow: 1;
                    padding: 0 20px;

                    .info {
                        display: flex;
                        align-items: center;
                        column-gap: 5px;

                        .info- {
                            &title {
                                font-size: small;
                                opacity: .7;
                                // color: var(--color-primary);
                            }

                            &value {
                                // font-weight: bold;
                                color: var(--color-primary);
                            }
                        }
                    }
                }

            }
        }
    }

    .calculations {
        box-shadow: 0px 0px 20px -4px var(--color-primary);
    }
}
</style>
  