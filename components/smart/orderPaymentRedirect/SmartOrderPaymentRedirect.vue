<template>
    <div class="smart-order-payment-rediect">
        <div class="line"></div>
        <div class="content">
            <div class="start-description">
                با توجه به اینکه هنوز درگاه به وب‌سایت چاپ‌خونه تعلق نگرفته است، لطفا مبلغ مورد نظر را کارت به کارت کنید.
            </div>
            <div class="total-price">
                <small>قابل پرداخت</small> {{ englishToPersianNumbers(totalPriceComputed) }}
            </div>
            <div class="payment-authority">
                <small>شناسهٔ سفارش</small> {{ paymentAuthority }}
            </div>
            <div class="card">
                <div class="header">
                    <div class="right">بانک ملت</div>
                    <div class="left">ملت کارت</div>
                </div>
                <div class="numbers">
                    <div class="sheba">
                        <div>
                            IR23
                        </div>
                        <div>
                            0120
                        </div>
                        <div>
                            0000
                        </div>
                        <div>
                            0000
                        </div>
                        <div>
                            9536
                        </div>
                        <div>
                            4686
                        </div>
                        <div>
                            43
                        </div>
                    </div>
                    <div class="card-number">
                        <div>
                            6104
                        </div>
                        <div>
                            3389
                        </div>
                        <div>
                            1428
                        </div>
                        <div>
                            8390
                        </div>
                    </div>
                </div>
                <div class="name">
                    مهدی هوشمند
                </div>
            </div>
            <div class="end-description">
                لطفا بعد از پرداخت، شناسهٔ سفارش خود را به شناسهٔ @chaapkhouneh در ایتا یا بله ارسال کنید.
            </div>
            <button class="paid" @click="nextStep">پرداخت کردم (ادامه)</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../../state';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { englishToPersianNumbers } from '../../../assets/js/translate';
import { computed } from 'vue';
import { calculatePrices } from '../../../assets/js/monary';

const store = useStore();
const pricesComputed = computed(() => {
    const prices = calculatePrices(store.files);
    console.log({ prices });

    return prices;
})
const totalPriceComputed = computed(() => pricesComputed.value.print.cost + pricesComputed.value.bounding.cost + 35000);

const { paymentAuthority } = store.orderInfo;
if (!paymentAuthority) {
    toast.error(`شناسهٔ پرداخت یافت نشد.`, {
        autoClose: 2000,
    });
    store.orderStep--;
}
else {
    // location.href = `/pay?authority=${paymentAuthority}`;
    console.log('so lets pay');

}

const nextStep = () => {
    store.orderStep++;
}
</script>

<style lang="scss" scoped>
.smart-order-payment-rediect {
    flex: 0px 1 1;
    padding: 20px 20px 40px 20px;
    overflow-y: auto;
    overflow-x: hidden;

    .line {
        width: 3px;
        height: 56%;
        background-color: var(--color-primary);
        position: absolute;
        left: 50%;
        z-index: 0;
        opacity: .7;
    }

    .content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        column-gap: 20px;
        row-gap: 20px;

        .start-description,
        .end-description {
            text-align: center;
            border: dashed thin var(--color-primary);
            color: var(--color-primary);
            padding: 20px;
            font-size: 15px;
            border-radius: 5px;
            background-color: white;
        }

        .total-price {
            border: solid thick var(--color-primary);
            color: var(--color-primary);
            background-color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
        }

        .payment-authority {
            border: solid thick var(--color-secondary);
            color: var(--color-secondary);
            background-color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
        }

        .card {
            display: flex;
            flex-direction: column;
            background-color: #d73221;
            border-radius: 5px;
            padding: 10px;

            .header {
                display: flex;
                justify-content: space-between;
                color: white;
                font-size: small;
            }

            .numbers {
                padding: 20px 10px;
                display: flex;
                flex-direction: column;
                row-gap: 10px;
                direction: ltr;

                .sheba,
                .card-number {
                    display: flex;
                    justify-content: space-between;
                }
            }

            .name {
                padding: 20px 10px 5px;
            }
        }

        .paid {
            height: 35px;
            border: none;
            cursor: pointer;
            padding: 0 15px;
            border-radius: 17.5px;
            background-color: var(--color-primary);
            color: #fff;
            font-weight: 700;
        }
    }
}
</style>