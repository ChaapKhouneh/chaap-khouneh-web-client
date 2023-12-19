<template>
    <SmartStepper />
    <p v-if="!relatedOrder">در حال بارگیری ...</p>
    <div class="factor" v-if="relatedOrder">
        <div class="info-row">
            <p>قابل پرداخت</p>
            <p>{{ englishToPersianNumbers(relatedOrder.totalPrice) }}</p>
        </div>
        <div class="info-row small">
            <p>شناسهٔ سفارش</p>
            <p>{{ englishToPersianNumbers(authority) }}</p>
        </div>
        <div class="info-row small">
            <p>زمان ایجاد فاکتور</p>
            <p class="ltr">{{ new Date(relatedOrder.createdAt).toLocaleString('fa-IR') }}</p>
        </div>
        <hr>
        <div class="info-row">
            <p>انتخاب درگاه</p>
            <div class="payment-gateways">
                <label for="parsian-payment-gateway">
                    <img src="/img/top-psp-1400x900.jpg" alt="درگاه پرداخت پارسیان">
                </label>
                <input type="radio" name="paymentGateway" id="parsian-payment-gateway" value="ParsianPaymentGateway"
                    v-model="paymentGateway">
            </div>
        </div>
        <hr>
        <div class="info-row">
            <button class="back" @click="backToReview">بازگشت</button>
            <button class="pay" :disabled="!paymentGateway" @click="goToPaymentGateway">پرداخت</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import SmartStepper from '../../components/smart/stepper/SmartStepper.vue';
import { inject, onMounted, ref } from 'vue';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { englishToPersianNumbers } from '../../assets/js/translate';
import { useStore } from '../../state';
import { ORDER_STEP } from '../../assets/js/enums';

const store = useStore();

const isLoading = inject('isLoading');
isLoading.value = true;

const urlParams = new URLSearchParams(window.location.search);
const authority = urlParams.get('authority');
if (!authority) {
    location.href = `/order`;
}
let relatedOrder = ref(null);

const paymentGateway = ref(null);

onMounted(async () => {
    // now ask the server check the authority
    const client = new ApolloClient({
        uri: '/api/graphql'
    });

    relatedOrder.value = (await client
        .query({
            query: gql`
            query Query($where: OrderWhereInput!) {
                orders(where: $where) {
                    totalPrice
                    status
                    createdAt
                    ParsianPaymentInfo {
                        createResponseToken
                    }
                }
            }
  `,
            variables: {
                "where": {
                    "paymentAuthority": {
                        "equals": authority
                    }
                }
            }
        })).data?.orders?.[0];

    console.log({ relatedOrder });
    // 1.if found and is waiting for pay, continue
    if (relatedOrder && relatedOrder.status === 'WAITING_FOR_PAYMENT') {
        console.log('so lets pay');
        // double set: state, authority, ... (if needed)
    }
    // 2.if is already paid, redirect to thanks
    else if (relatedOrder && relatedOrder.status !== 'WAITING_FOR_PAYMENT') {
        console.log('already paid, redirect to thanks');
        store.orderStep = ORDER_STEP.THANKS;
        location.href = '/order';
    }
    // 3.and if not found, redirect to order
    else {
        console.log('not found, redirect to order');
        location.href = '/order';
    }

    isLoading.value = false;
});

const goToPaymentGateway = () => {
    if (paymentGateway.value === 'ParsianPaymentGateway') {
        location.href = `https://pec.shaparak.ir/NewIPG/?token=${relatedOrder.value.ParsianPaymentInfo.createResponseToken}`;
    }
}

const backToReview = () => {
    store.orderStep--;
    location.href = '/order';
}
</script>

<style scoped lang="scss">
.factor {
    flex: auto 1 1;
    border: solid thin var(--color-primary);
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    color: var(--color-primary);

    .info-row {
        display: flex;
        justify-content: space-between;

        &.small {
            font-size: small;
        }

        .ltr {
            direction: ltr;
        }

        .payment-gateways {
            display: flex;

            img {
                width: 100px;
            }
        }

        button {
            padding: 8px 20px;
            border-radius: 10px;

            &.pay {
                border: none;
                background-color: var(--color-primary);
                color: white;

                &:disabled {
                    opacity: .6;
                }
            }

            &.back {
                background: none;
                border: solid thin var(--color-primary);
                color: var(--color-primary);
            }
        }
    }
}
</style>