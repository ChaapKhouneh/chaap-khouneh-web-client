<template>
    <div class="smart-order-receiver-price">
        <div class="properties">
            <p class="row">
                <small>هزینهٔ خدمات</small> {{ englishToPersianNumbers(pricesComputed.print.cost +
                    pricesComputed.bounding.cost) }}
            </p>
            <p class="row">
                <small>هزینهٔ ارسال</small> {{ englishToPersianNumbers(35000) }} <small></small>
            </p>
        </div>
        <div class="total">
            <p class="row">
                <small>قابل پرداخت</small> {{ englishToPersianNumbers(pricesComputed.print.cost +
                    pricesComputed.bounding.cost + 35000) }}
            </p>
            <button class="continue" @click="nextStep">
                {{ continueTitle }} و پرداخت
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { calculatePrices } from '../../../../assets/js/monary';
import { useStore } from '../../../../state';
import { englishToPersianNumbers } from '../../../../assets/js/translate';
import 'vue-loading-overlay/dist/css/index.css';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { COLOR_MODE, PAGE_SIZE } from '../../../../assets/js/enums';

const isLoading = inject('isLoading');

const { continueTitle } = defineProps(['continueTitle']);

const store = useStore();
const pricesComputed = computed(() => {
    const prices = calculatePrices(store.files);
    return prices;
})

const client = new ApolloClient({
    uri: '/api/graphql'
});

const nextStep = async () => {
    // store.orderStep++;

    isLoading.value = true;
    // simulate AJAX
    const order = {
        files: store.files,
        addressInfo: store.addressInfo,
    }
    console.log(order);

    const { data: serverResponse } = await client
        .mutate({
            mutation: gql`
                mutation Mutation($data: OrderCreateInput!) {
                    createOrder(data: $data) {
                        createdAt
                        id
                        paymentAuthority
                        status
                        totalPrice
                    }
                }
            `,
            variables:
            {
                "data": {
                    "totalPrice": pricesComputed.value.print.cost + pricesComputed.value.bounding.cost + 35000,
                    "AddressInfo": {
                        "create": {
                            "city": order.addressInfo.city,
                            "mobileNumber": order.addressInfo.mobileNumber,
                            "postalAddress": order.addressInfo.postalAddress,
                            "postalCode": order.addressInfo.postalCode,
                            "province": order.addressInfo.province,
                        }
                    },
                    "Files": {
                        "create": order.files.map((_file) => (
                            {
                                "bounding": _file.bounding,
                                "colorMode": COLOR_MODE[_file.colorMode],
                                "description": _file.description,
                                "double": _file.double,
                                "name": _file.name,
                                "pageCount": _file.pageCount,
                                "pageSize": PAGE_SIZE[_file.pageSize],
                                "series": _file.series,
                                "size": _file.size,
                                "type": _file.type,
                                "dataAsBase64": _file.data,
                            }
                        )),
                    }
                }
            }
        });

    console.log(serverResponse);

    Object.assign(store.orderInfo, serverResponse.createOrder);

    isLoading.value = false;

    store.orderStep++;

    // setTimeout(() => {
    //     isLoading.value = false;
    //     toast.warn(`درگاه پرداخت در حال حاضر فعال نیست. لطفا از طریق ایتا یا بله سفارش خود را ثبت کنید.`, {
    //         autoClose: 2000,
    //     });
    // }, 1000)
}
</script>

<style lang="scss" scoped>
.smart-order-receiver-price {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px 30px 5px;
    color: var(--color-primary);
    font-weight: bold;

    small {
        font-weight: initial;
        font-size: xx-small;
    }

    .total,
    .properties {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
    }

    .total {
        align-items: flex-end;

        p.row {
            color: var(--color-secondary);
        }

        .continue {
            height: 35px;
            border: none;
            cursor: pointer;
            padding: 0 15px;
            border-radius: 17.5px;
            background-color: var(--color-secondary);
            color: white;
            font-weight: bold;
        }
    }
}
</style>