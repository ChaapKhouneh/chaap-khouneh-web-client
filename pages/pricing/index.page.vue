<template>
    <div class="page-pricing">
        <div class="description">
            <h1>تعرفهٔ خدمات</h1>
            <p>
                خبر خوب اینکه، اگه تعداد صفحات‌تون کمه و سفارش کوچیکی دارید نگران نباشید، چرا که تعرفهٔ ما برای همهٔ
                اندازهٔ سفارش‌ها یکسان هست و کم‌ترین حاشیهٔ سود ممکن رو در نظر گرفتیم.
                اگه خواستید قیمت‌هامون رو در عمل محک بزنید، سفارش‌تون رو شروع کنید و مراحل رو پیش برید. بعد اگه دوست داشتید
                می‌تونید ادامه بدید یا اینکه درخواست لغو کنید.
            </p>
            <p>
                چاپ‌خونه سعی می‌کنه در آیندهٔ خیلی نزدیک، خدمات با کیفیت‌های متنوعی به شما مشتریان محترم ارائه کنه تا بتونید
                برحسب نیازتون هزینهٔ تمام شده رو مدیریت
                کنید.
                ضمنا، درسته که خدمات ما در خونه‌های همکاران عزیزمون انجام می‌شه ولی هم فرآیند کنترل کیفیت داریم، هم به شما
                در
                ازای تعهدات‌مون ضمانت می‌دیم.
            </p>
        </div>
        <div class="table-container">
            <table class="pricing-table">
                <thead>
                    <tr>
                        <th rowspan="2">
                            اندازه
                        </th>
                        <th colspan="2">
                            یک‌رو
                        </th>
                        <th colspan="2">
                            دو رو
                        </th>
                    </tr>
                    <tr>
                        <th>
                            سیاه و سفید لیزری
                        </th>
                        <th>
                            رنگی لیزری
                        </th>
                        <th>
                            سیاه و سفید لیزری
                        </th>
                        <th>
                            رنگی لیزری
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            A5
                        </td>
                        <td>
                            ۵۰۰ <small>تومان</small>
                        </td>
                        <td>
                            ۱۸۰۰ <small>تومان</small>
                        </td>
                        <td>
                            ۶۵۰ <small>تومان</small>
                        </td>
                        <td>
                            ۲۵۰۰ <small>تومان</small>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            A4
                        </td>
                        <td>
                            ۸۵۰ <small>تومان</small>
                        </td>
                        <td>
                            ۳۳۰۰ <small>تومان</small>
                        </td>
                        <td>
                            ۱۱۵۰ <small>تومان</small>
                        </td>
                        <td>
                            ۴۵۰۰ <small>تومان</small>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            A3
                        </td>
                        <td>
                            ۱۸۰۰ <small>تومان</small>
                        </td>
                        <td>
                            ۷۰۰۰ <small>تومان</small>
                        </td>
                        <td>
                            ۲۵۰۰ <small>تومان</small>
                        </td>
                        <td>
                            ۱۰۰۰۰ <small>تومان</small>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>
  
<style lang="scss" scoped>
.page-pricing {
    padding: 15px;

    .description {
        opacity: .75;

        p {
            text-align: justify;
        }
    }


    .table-container {
        overflow-x: auto;

        .pricing-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            min-width: 400px;
            border-radius: 7px 7px 5px 5px;
            overflow: hidden;

            thead {
                tr {
                    background-color: var(--color-primary);
                    color: #ffffff;

                    th{
                        border: solid thin white;
                    }

                    &:nth-child(2) {
                        th {
                            font-weight: normal;
                        }
                    }
                }
            }

            td,
            th {
                text-align: center;
                padding: 12px 15px;
            }

            tbody tr {
                border-bottom: 1px solid #dddddd;

                &:nth-of-type(even) {
                    background-color: #f3f3f3;
                }

                &:last-of-type {
                    border-bottom: 2px solid var(--color-primary);
                }

                &:hover {
                    font-weight: bold;
                    color: var(--color-primary);
                }

                td {
                    small{
                        opacity: .5;
                    }
                    &:first-child {
                        color: white;
                        background-color: var(--color-primary);
                        opacity: .7;
                    }
                }
            }

        }
    }
}
</style>
  