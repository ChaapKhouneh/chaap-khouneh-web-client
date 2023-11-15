<template>
    <div class="smart-order-receiver-item">
        <div class="card">
            <div class="preview">
                <img v-if="file.type.startsWith('image/')" :src="file.data" :alt="file.name" />
                <!-- <object v-else-if="file.type === 'application/pdf'" :data="file.preview" type="application/pdf">
                    <p>ناتوان در پیش‌نمایش <a :href="file.data">دریافت</a></p>
                </object> -->
                <p v-else>
                    {{ file.type.substring(file.type.indexOf('/') + 1) }}
                </p>
            </div>
            <div class="info">
                <p class="info-row">
                    <small>عنوان سند</small>
                    {{ file.name }}
                </p>
                <p class="info-row">
                    <small>حجم سند</small>
                    {{ englishToPersianNumbers(file.size) }}
                </p>
                <p class="info-row">
                    <small>تعداد صفحات</small>
                    {{ englishToPersianNumbers(file.pageCount) }}
                </p>
                <p class="info-row">
                    <small>نوع سنده</small>
                    {{ file.type }}
                </p>
            </div>
            <div class="configurations">
                <label class="series" :for="`series-${itemId}`">
                    سری
                    <input type="number" :name="`series-${itemId}`" :id="`series-${itemId}`" v-model="file.series" />
                </label>
                <label class="size" :for="`size-${itemId}`">
                    اندازهٔ برگه
                    <select :name="`size-${itemId}`" :id="`size-${itemId}`" v-model="file.pageSize">
                        <option :value="0">A5</option>
                        <option :value="1">A4</option>
                        <option :value="2">A3</option>
                    </select>
                </label>
                <label class="type" :for="`type-${itemId}`">
                    حالت رنگی
                    <select :name="`type-${itemId}`" :id="`type-${itemId}`" v-model="file.colorMode">
                        <option :value="0">سیاه و سفید</option>
                        <option :value="1">رنگی</option>
                    </select>
                </label>
                <label class="double" :for="`double-${itemId}`">
                    پشت و رو؟
                    <input type="checkbox" :name="`double-${itemId}`" :id="`double-${itemId}`" v-model="file.double" />
                </label>
                <label class="bounding" :for="`bounding-${itemId}`">
                    صحافی فنری؟
                    <input type="checkbox" :name="`bounding-${itemId}`" :id="`bounding-${itemId}`"
                        v-model="file.bounding" />
                </label>
                <label class="description" :for="`description-${itemId}`">
                    شرح
                    <textarea :name="`description-${itemId}`" :id="`description-${itemId}`"
                        v-model="file.description"></textarea>
                </label>
            </div>
            <div class="actions">
                <button class="button-secondary" @click="emit('removeFile', file)">
                    حذف
                </button>
            </div>
        </div>
        <!-- {{ file }} -->
    </div>
</template>

<script lang="ts" setup>
import { uuidv4 } from '../../../../assets/js/generator';
import { englishToPersianNumbers } from '../../../../assets/js/translate';

const props = defineProps(['file']);
const emit = defineEmits(['removeFile']);
const { file } = props;
const itemId = uuidv4();
</script>
  
<style lang="scss" scoped>
.smart-order-receiver-item {
    .card {
        display: flex;
        // border: solid thin var(--color-primary);
        box-shadow: 0px 0px 10px -4px var(--color-primary);
        background-color: white;
        border-radius: 10px;
        flex-wrap: wrap;

        .preview {
            max-width: 200px;
            max-height: 200px;
            flex: 200px 1 0;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            margin: 5px;
            border-radius: 5px;

            img {
                max-width: 100%;
                min-height: 100px;
                min-width: 100px;
            }

            object {
                max-width: 120%;
                min-width: 100px;
                min-height: 100px;
            }

            p {
                background-color: var(--color-primary);
                width: 100%;
                height: 100%;
                min-width: 100px;
                min-height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-weight: bold;
                opacity: .9;
                text-transform: uppercase;
            }
        }

        .info {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            row-gap: 5px;
            padding: 20px;
            opacity: .8;

            .info-row {
                small {
                    opacity: .7;
                    margin-left: 10px;
                }
            }
        }

        .configurations {
            display: flex;
            flex-wrap: wrap;
            flex: 0px 1 1;
            justify-content: space-between;
            padding: 20px;
            column-gap: 10px;
            row-gap: 5px;

            label {
                font-size: small;
                display: flex;
                flex-grow: 1;
                column-gap: 5px;
                justify-content: space-between;
                align-items: center;

                input,
                textarea,
                select {
                    border: solid thin var(--color-primary);
                    // background-color: var(--color-primary);
                    background-color: white;
                    flex-grow: 1;
                    color: var(--color-primary);
                    padding: 5px;
                    border-radius: 5px;
                    opacity: .8;

                    &[type=checkbox] {
                        flex-grow: 0;
                    }
                }
            }
        }

        .actions {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 10px;

            button {
                height: 35px;
                border: none;
                background-color: white;
                cursor: pointer;

                &.button-secondary {
                    padding: 0 15px;
                    border-radius: 17.5px;
                    border: solid thin var(--color-secondary);
                    color: var(--color-secondary);
                }
            }
        }
    }



    &:not(:last-child) {
        .card {
            margin-bottom: 10px;
        }
    }
}
</style>
  