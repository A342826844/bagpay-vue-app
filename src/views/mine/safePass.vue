<template>
    <div class="realname">
        <TitleHeader :title="$t('mine.safePass')">
            <p class="app-padding40 realname-tip">设置/修改安全密码，用于提现、交易。</p>
            <form class="realname-form app-padding40" action="">
                <div class="form-item">
                    <Inputs readonly v-model="form.phone" placeholder="手机号"></Inputs>
                </div>
                <div class="form-item">
                    <Inputs
                    class="login-form-item"
                    :placeholder="$t('login.imgCode')"
                    v-model="form.imgCode"
                    autocomplete="username"
                    type="text"
                    >
                    <img class="code-img" :src="imgUrl" alt="" @click="getImg" />
                    </Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.code"  placeholder="验证码" clearable>
                        <span class="primary-color" @click="sendHandle">发送</span>
                    </Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.password"  placeholder="安全密码" clearable type="password"></Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.confirmPassword"  placeholder="再次输入" clearable type="password"></Inputs>
                </div>
            </form>
            <div class="lxa-footer-btn">
                <Button @click="saveHandle" v-t="'common.save'"></Button>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    imgUrl: string;
    imgCode: string;
    form: {
        phone: string;
        code: string;
        password: string;
        confirmPassword: string;
        imgCode: string;
    };
}

export default Vue.extend({
    name: 'RealName',
    data(): data {
        return {
            imgUrl: '',
            imgCode: '',
            form: {
                phone: '',
                code: '',
                password: '',
                confirmPassword: '',
                imgCode: '',
            },
        };
    },
    mounted() {
        this.getImg();
        this.$nextTick(() => {
            const phone = this._userInfo.phone.split('-');
            this.form.phone = phone[1] || '';
        });
    },
    methods: {
        // 获取图片
        getImg() {
            this.$api
                .getImages()
                .then((res: any) => {
                    this.form.imgCode = '';
                    this.imgUrl = res.data.data;
                    this.imgCode = res.data.id;
                });
        },
        sendHandle() {
            if (!this.form.phone) {
                console.log('请输入手机号');
            } else if (!this.form.imgCode) {
                console.log('请输入图形码');
            } else {
                this.$api.registerCode({
                    phone: `86-${this.form.phone}`,
                    type: 1,
                    captcha: this.imgUrl,
                    captcha_id: this.form.imgCode,
                }).then((res: any) => {
                    if (res.code === 0) {
                        console.log('发送成功');
                    }
                });
            }
        },
        saveHandle() {
            if (this.form.phone.length !== 11) {
                console.log('请输入正确手机号');
            } else if (!this.form.imgCode) {
                console.log('请输入图形码');
            } else if (this.form.code.length !== 4) {
                console.log('请输入正确验证码');
            } else if (!this.form.password) {
                console.log('请输入登录密码');
            } else if (this.form.password !== this.form.confirmPassword) {
                console.log('请再次输入登录密码且一致');
            } else {
                this.$api.forgetPayPwd({
                    passport: `86-${this.form.phone}`,
                    new_password: this.$md5(`${this.form.password}bagpaysol`),
                    sms_code: this.form.code,
                }).then((res: any) => {
                    console.log(res);
                    if (res.code === 0) {
                        this.$router.push('mine/safesetting');
                    }
                });
            }
        },
    },
});
</script>

<style lang="less" scoped>
.realname{
    height: 100%;
    overflow: scroll;
    font-size: 34px;
    &-tip{
        margin-top: 34px;
        text-align: left;
    }
    &-form{
        margin-top: 109px;
        .form-item{
            margin-top: 30px;
        }
    }
}
</style>
