<template>
    <div class="smart-order-receiver">
        <header class="actions">
            <h4 class="step-title">بارگزاری</h4>
            <button class="button-primary" @click="addFile">+ افزودن سند جدید</button>
            <button class="button-secondary" @click="removeAllFiles">🗑</button>
        </header>
        <main class="orders-list">
            <SmartOrderReceiverItem v-for="file, index in files" :key="file.name + index" :file="file"
                @remove-file="removeFile" />
        </main>
        <footer class="calculations">
            <SmartOrderReceiverPrice continueTitle="ثبت" />
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../../state';
import selectFiles from 'select-files';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { toBase64 } from '../../../assets/js/file';
import { computed, onMounted, unref } from 'vue';
import SmartOrderReceiverItem from './child-components/SmartOrderReceiverItem.vue';
import SmartOrderReceiverPrice from './child-components/SmartOrderReceiverPrice.vue';
// import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { convertDataURIToBinary } from '../../../assets/js/pdf/base64';
import { BOUNDING_SIZE, COLOR_MODE, PAGE_SIZE } from '../../../assets/js/enums';
import { getBoundingSize } from '../../../assets/js/monary';

const store = useStore();
const files = computed({
    get() {
        console.log(store.files);

        return store.files;
    },
    set(value) {
        store.files = value;
    }
})
const addFile = () => {
    // const accept = 'image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx';
    const accept = 'image/*,.pdf';
    selectFiles({ accept, multiple: true }).then(async _files => {
        if (_files && _files.length > 0) {
            const convertedFiles: any = [];
            for (const file of _files) {
                const data = await toBase64(file);
                const { preview, pageCount } = await calculatePageAdditionalData(file.type, data, file);
                convertedFiles.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data,
                    preview,
                    pageCount,
                    series: 1,
                    pageSize: PAGE_SIZE.A4,
                    colorMode: COLOR_MODE.BLACK_WHITE_LASER,
                    double: false,
                    bounding: false,
                    description: '',
                })
            }
            files.value.push(...convertedFiles);

            toast.info(`تعداد ${convertedFiles.length} سند افزوده شد.`, {
                autoClose: 2000,
            });
            console.log(convertedFiles);
        }
        else {
            toast.warn(`هیچ سندی انتخاب نشده است.`, {
                autoClose: 2000,
            });
        }
    });
}

const calculatePageAdditionalData = async (type, data, file) => {
    if (type.startsWith('image/')) {
        return { pageCount: 1, preview: data };
    }
    else if (type.startsWith('application/pdf')) {
        var pdfAsArray = convertDataURIToBinary(data);

        // const pdfDoc = await PDFDocument.load(pdfAsArray)
        // const pages = pdfDoc.getPages()
        // const firstPage = pages[0]
        // const { width, height } = firstPage.getSize()
        // const pageCount = pdfDoc.getPageCount();
        // for (let index = 1; index < pageCount; index++) {
        //     pdfDoc.removePage(1);
        // }
        // const preview = 'data:application/pdf;base64,' + await pdfDoc.saveAsBase64();
        // return { pageCount, preview };
        var reader = new FileReader();
        const promise = new Promise((resolve, reject) => {
            reader.onloadend = function () {
                var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                resolve(count);
            }
            reader.readAsBinaryString(file);
        });
        return { pageCount: await promise, preview: null }
    }
    else {
        return { pageCount: 1, preview: null };
    }
}

const removeAllFiles = () => {
    if (confirm('آیا از حذف تمام اسناد مطمئن هستید؟')) {
        files.value = [];
    }
}

const removeFile = (fileToRemove) => {
    fileToRemove = unref(fileToRemove);
    if (confirm(`آیا از حذف سند "${fileToRemove.name}" مطمئن هستید؟`)) {
        files.value = files.value.filter(_file => _file !== fileToRemove);
    }
}
</script>
  
<style lang="scss" scoped>
.smart-order-receiver {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    margin-top: 10px;

    .actions {
        display: flex;
        // flex-direction: row-reverse;
        align-items: center;
        column-gap: 10px;
        padding: 10px;
        box-shadow: 0px 0px 20px -4px var(--color-primary);
        z-index: 1;

        .step-title{
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
    }

    .calculations {
        box-shadow: 0px 0px 20px -4px var(--color-primary);
    }
}
</style>
  