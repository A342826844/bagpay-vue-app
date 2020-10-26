<template>
    <div class="search-country">
        <Headers :title="$t('common.country')"></Headers>
        <div class="positionF">
            <img class="search-img" src="../../assets/img/common/search.png" alt="">
            <input
                class="input"
                v-model="text"
                @input="searchName"
                type="text"
                :placeholder="$t('common.seachCountry')"
            >
        </div>
        <div class="radiou">
            <div
                :class="classMethods(key)"
                v-for="(item,key) in searchArry"
                :key="key"
                @click="changeRadiou($event,item)"
                ref="radiou"
            >
                <span class="title">{{item.name}}</span>
                <span class="value">({{item.en}})</span>
                <img src="../../assets/img/common/ok.png" v-if="index==item.short" class="is-active app-img-50" />
            </div>
        </div>
    </div>
</template>

<script>
import list from '@/commons/country/index';

export default {
    data() {
        return {
            list,
            text: '',
            searchArry: [],
            index: 'CN',
        };
    },
    created() {
        this.searchArry = this.list;
    },
    methods: {
        searchName() {
            console.time();
            this.searchArry = this.list.filter((item) => {
                const text = this.text.toLocaleLowerCase();
                JSON.stringify(item).toLocaleLowerCase();
                if (JSON.stringify(item).toLocaleLowerCase().indexOf(text) > -1) {
                    return true;
                }
                return false;
            });
            console.timeEnd();
        },
        changeRadiou(e, obj) {
            this.index = obj.short;
            this.$store.commit('changeCountryHandle', obj);
            window.history.go(-1);
        },
        classMethods(e) {
            return `row ${e}`;
        },
    },
};
</script>

<style lang="less">
.search-country {
    .positionF {
        position: relative;
        width: 608px;
        margin: auto;
        .search-img {
            width: 36px;
            height: 36px;
            position: absolute;
            left: 33px;
            top: 40px;
        }
        .input {
            background-color: rgba(228, 228, 228, .5);
            color: #999;
            width: 608px;
            height: 63px;
            border: none;
            outline: none;
            border-radius: 30px;
            padding-left: 100px;
            margin: 24px 0;
            font-size:  26px;
        }
    }

    .radiou {
        .is-active{
            float: right;
            margin-top: 32px;
        }
        .row {
            text-align: left;
            line-height: 95px;
            padding: 0 36px;
            background: #fff;
            border-bottom: 1px solid #dcdcdc;
            white-space: nowrap;
            .title {
                color: #464646;
                margin-right:22px
            }
            .value {
                color: #878787
            }
        }
    }
}
</style>
