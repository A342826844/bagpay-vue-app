<template>
    <div class="pcindex">
        <div class="pcindex-top">
            <div class="pcindex-top-header flex-between-c">
                <div>
                    <img src="./img/logo1.png" alt="">
                </div>
                <div class="tab">
                    <span class="tab-item active">平台介绍</span>
                    <span class="tab-item">企业注册</span>
                </div>
                <div class="pcindex-top-language">
                    <div>
                        <img src="./img/language.png" alt="">
                        <span class="language-value">简体中文</span>
                    </div>
                    <div class="language-select">
                        <p><a href="./zh-cn/">简体中文</a></p>
                        <p><a href="./en-us/">English</a> </p>
                        <p><a href="./zh-tw/">繁體中文</a> </p>
                    </div>
                </div>
            </div>
            <div class="pcindex-top-body flex-between-c">
                <div>
                    <p class="font-20">最好的货币钱包</p>
                    <p class="font-42 color-black title">USDT数字钱包</p>
                    <p class="font-20">轻松购买、出售、存储，转账美金数字货币USDT</p>
                    <a class="font-16 app-download" href="#downloadNow">立即下载APP</a>
                </div>
                <div>
                    <img src="./img/cn.png" alt="">
                </div>
            </div>
        </div>
        <div class="pcindex-banner1 flex-center">
            <div>
                <img src="./img/bot.png" alt="">
            </div>
            <div class="pcindex-banner1-content">
                <h4 class="font-w400 font-32 title">BagPay全球首家的钱包机器人</h4>
                <p class="font-16">通过Telegram机器人，方便快捷操作网页版BagPay资产钱包；TG机器人回复您想要的。</p>
                <div>
                    <div class="card">
                        <h5 class="font-w400 font-20 title1">Telegram钱包机器人</h5>
                        <p class="font-14">BagPay Wallet 机器人，让你的 Telegram 账号拥有数字货币钱包的全部功能</p>
                    </div>
                    <div class="card">
                        <h5 class="font-w400 font-20 title1">Telegram派送红包</h5>
                        <p class="font-14">全球第一家Telegram红包机器人，自由创建金额红包，每日蹲点抢USDT红包。</p>
                    </div>
                    <div class="card">
                        <h5 class="font-w400 font-20 title1">资金钱包</h5>
                        <p class="font-14">客户资金都以数字货币方式存储在BagPay的冷热钱包系统上，保证资金绝对安全。</p>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="font-32 color-black pcindex-h3">
            BagPay支持多种支付，是基于区块链开发的平台之一， 支持世界各地的操作系统。
        </h3>
        <div class="pcindex-banner2">
            <ul class="pcindex-banner2-ul">
                <li class="pcindex-banner2-li" v-for="item in 4" :key="item">
                    <img class="pcindex-banner2-img" src="./img/hui.png" alt="">
                    <h6 class="pcindex-banner2-title font-24">Huione Pay</h6>
                    <p class="pcindex-banner2-value font-16">汇旺支付是一家旨在为世界带来领先金融科技服务的创新企业。支付致力于通过科技创新能力，立足东南亚，面向全球客户，提供安全可靠、利</p>
                </li>
            </ul>
        </div>
        <div class="pcindex-banner3 flex-center">
            <div>
                <img src="./img/shop.png" alt="">
                <h5 class="font-32">线下实体兑换店支持</h5>
                <p class="font-16">全球各地，线下实体店兑换支持，只需到店扫一扫，即可完成订单交易</p>
            </div>
            <div class="pcindex-banner3-right">
                <ul>
                    <li v-for="item in 3" :key="item" class="flex-start-c pcindex-banner3-li">
                        <div>
                            <img src="./img/otc.png" alt="">
                        </div>
                        <div class="">
                            <h4>OTC交易</h4>
                            <p>OTC线下交易支持“银行卡、ABA Bank、Huione  Pay”我们不对OTC交易收取任何费用。</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pcindex-banner4 flex-center">
            <div>
                <h3 id="downloadNow" class="font-32 pcindex-banner4-header">立刻下载APP</h3>
                <p class="font-16">BagPay资产钱包管理</p>
                <h6 class="font-18 pcindex-banner4-title">资产多链管理</h6>
                <p class="font-16 pcindex-banner4-value">支持多种主流币种 跨链交易 方便高效安全存储资产，轻松完成交易； 例如：USDT、USDC、TUSD...等币种。</p>
                <h6 class="font-18 pcindex-banner4-title">用USDT进行投资，理财，避险</h6>
                <p class="font-16 pcindex-banner4-value">持有USDT意味着持有美金，可在全球各地交易所购买股票，外汇，期货，或者兑换成其他数字货币进行投资：BTC，ETH等。</p>
                <h6 class="font-18 pcindex-banner4-title">Telegram导航机器人</h6>
                <p class="font-16 pcindex-banner4-value">通过Telegram机器人，方便快捷操作网页版BagPay资产钱包；TG机器人回复您想要的。</p>
                <div class="pcindex-banner4-btns">
                    <a v-for="item in 3" :key="item" class="pcindex-banner4-btn" href="">
                        <div class="btn-value flex-start-c">
                            <img class="banner4-btn-img" src="./img/apple.png" alt="">
                            <div>
                                <span>下载</span>
                                <div class="font-22">App Store</div>
                            </div>
                        </div>
                        <div class="pcindex-banner4-ercodebox">
                            <img class="download-ercode" src="./img/ercode.png" alt="">
                        </div>
                    </a>
                </div>
            </div>
            <div>
                <img src="./img/app-download.png" alt="">
            </div>
        </div>
        <div class="pcindex-banner5 flex-center">
            <div>
                <h3 class="font-32">持有正规合法牌照</h3>
                <div class="pcindex-banner5-tip font-16">BagPay通过全资持有WTG Bank Holdings，持有柬埔寨商业部颁发的数字资产交易牌照，可合法进行数字货币钱包。 </div>
            </div>
            <div class="pcindex-banner5-right">
                <div class="card flex-start-c">
                    <img class="banner5-img" src="./img/1_00.png" alt="">
                    <div>
                        <h4 class="font-26">合法支付钱包牌照</h4>
                        <p class="font-16">BagPay持有国际官方集中支付钱包交易牌照，可合法 进行数字货币钱包进行支付交易。</p>
                    </div>
                </div>
                <div class="card flex-start-c">
                    <img class="banner5-img" src="./img/1_00.png" alt="">
                    <div>
                        <h4 class="font-26">合法支付钱包牌照</h4>
                        <p class="font-16">BagPay持有国际官方集中支付钱包交易牌照，可合法 进行数字货币钱包进行支付交易。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="pcindex-footer">
            <div class="pcindex-footer-code">
                <div class="code-box">
                    <pre>
        message Transaction {
          enum Type {
            UNDEFINED = 0;
            // deploy a chaincode to the network and call Init function
            CHAINCODE_DEPLOY = 1;
            // call a chaincode Invoke function as a transaction
            CHAINCODE_INVOKE = 2;
            // call a chaincode query function
            CHAINCODE_QUERY = 3;
            // terminate a chaincode; not implemented yet
            CHAINCODE_TERMINATE = 4;
          }
          Type type = 1;
          //store ChaincodeID as bytes so its encrypted value can be stored
          bytes chaincodeID = 2;
          bytes payload = 3;
          bytes metadata = 4;
          string uuid = 5;
          google.protobuf.Timestamp timestamp = 6;

          ConfidentialityLevel confidentialityLevel = 7;
          string confidentialityProtocolVersion = 8;
          bytes nonce = 9;

          bytes toValidators = 10;
          bytes cert = 11;
          bytes signature = 12;
        }
                    </pre>
                </div>
                <div class="code-copyright">GitHub托管bit的BagPay-token.sol</div>
            </div>
            <div class="pcindex-footer-subscribe">
                <p class="font-32">BagPay-订阅我们 <br /> 了解更多信息！</p>
                <div class="subscribe-input">
                    <input placeholder="输入你的手机号码" type="text">
                    <button>订阅</button>
                </div>
                <!-- https://t.me/bagpayBot -->
            </div>
            <div class="pcindex-footer-link flex-center">
                <div class="flex-start-s">
                    <div class="link1">
                        <h4>导航</h4>
                        <p>个人</p>
                        <p>企业级</p>
                    </div>
                    <div class="link2">
                        <h4>Telegram社区</h4>
                        <p>TG导航</p>
                    </div>
                </div>
                <div class="link-right">
                    <img src="./img/logo.png" alt="">
                </div>
            </div>
            <div class="pcindex-footer-copyright">
                © 2018 BagPay Copyright.
            </div>
        </div>
    </div>
</template>

<script >
import Vue from 'vue';

export default Vue.extend({
    name: 'News',

});
</script>

<style >
@import url('../../assets/less/excludecss/pcindex.css');
</style>
