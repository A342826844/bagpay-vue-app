### api返回数据说明

```txt
{
    "code": 0, //错误码, 0为成功，其它为失败
    "message": "ok", //消息提示,错误时此处返回错误字符串
    "data": null //成功时返回的数据, 下面接口中所描述对象均是指此值
}
```

### 类型定义

#### 验证码类型 VerifyCodeType

```txt
	VerifyCodeTypeRegister          = 1  //注册
	VerifyCodeTypeLogin             = 2  //登录
	VerifyCodeTypeVerify            = 3  //验证手机或邮箱真实性
	VerifyCodeTypeChangePwd         = 4  //修改密码,需要登录
	VerifyCodeTypeForgetPwd         = 5  //忘记密码
	VerifyCodeTypeChangePayPwd      = 6  //修改支付密码,需要登录
	VerifyCodeTypeForgetPayPwd      = 7  //忘记支付密码,需要登录
	VerifyCodeTypeBindPhone         = 8  //绑定手机,需要登录
	VerifyCodeTypeChangePhone       = 9  //修改手机号,需要登录
	VerifyCodeTypeBindEmail         = 10 //绑定邮箱,需要登录
	VerifyCodeTypeChangeEmail       = 11 //修改邮箱,需要登录
	VerifyCodeTypeBindGA            = 12 //绑定google验证,需要登录
	VerifyCodeTypeChangeGA          = 13 //关闭google验证,需要登录
	VerifyCodeTypeAddBank           = 14 //添加收付款方式,需要登录
	VerifyCodeTypeAddWallet         = 15 //添加提币地址,需要登录
	VerifyCodeTypeAddTrustedWallet  = 16 //添加可信提币地址,需要登录
	VerifyCodeTypeWithdraw          = 17 //提币,需要登录
```

#### 用户操作类型 UserOpType

```txt
	UserOpTypeChangePwd             = 1  //修改密码
	UserOpTypeForgetPwd             = 2  //忘记密码
	UserOpTypeChangePayPwd          = 3  //修改支付密码
	UserOpTypeForgetPayPwd          = 4  //密码支付密码
	UserOpTypeAddBank               = 5  //添加收付款方式
	UserOpTypeAddWithdrawAddr       = 6  //添加提币地址
	UserOpTypeAddTrustWithdrawAddr  = 7  //添加可信提币地址
	UserOpTypeWithdraw              = 8  //提币
	UserOpTypeTrustedWithdraw       = 9  //可信地址提币
	UserOpTypeOtcSell               = 10 //场外卖出
	UserOpTypeBindEmail             = 11 //绑定邮箱
	UserOpTypeBindPhone             = 12 //绑定手机号
	UserOpTypeBindGa                = 13 //绑定google验证器
```

其中以下类型不需要登录

`VerifyCodeTypeRegister, VerifyCodeTypeLogin, VerifyCodeTypeForgetPwd`


#### 用户安全认证方式 UserAuthType

```txt
	UserAuthTypePassword     = 1 //密码
	UserAuthTypePayPassword  = 2 //支付密码
	UserAuthTypeEmail        = 3 //邮件
	UserAuthTypePhone        = 4 //手机
	UserAuthTypeGA           = 5 //google验证码
	UserAuthTypeTelegram     = 6 //telegram 验证码
```


#### 充值状态类型 DepositState

```txt
	DepositStateWaitReview   = 0 //等待审核
	DepositStateWaitConfirm  = 2 //等待确认
	DepositStateDone         = 1 //已完成
```

#### 充值类型 DepositType

```txt
	DepositTypeNormal      DepositType = 0 //链上转入
	DepositTypeInternal    DepositType = 1 //内部转入
```


#### 提现状态 WithdrawState

```txt
	WithdrawStateWaitReview  = 0  //等待审核
	WithdrawStateWaitSend    = -1 //等待发送
	WithdrawStateSending     = 2  //发送中
	WithdrawStateSent        = 3  //已发送
	WithdrawStateCanceled    = 4  //已取消
	WithdrawStateRejected    = 5  //已拒绝
	WithdrawStateDone        = 1  //已完成
```

#### 提现类型 WithdrawType

```txt
	WithdrawTypeNormal    = 0 //链上转出
	WithdrawTypeInternal  = 1 //内部转出
```

#### 用户安全日志类型 UserLogType

```txt
	UserLogTypeOther               = 0  //未定义类型
	UserLogTypeLoginSuccess        = 1  //登录成功
	UserLogTypeLoginFailed         = 2  //登录失败
	UserLogTypeLoginOut            = 3  //登出
	UserLogTypeChangePassword      = 4  //修改密码
	UserLogTypeChangePayPassword   = 5  //修改支付密码
	UserLogTypeBindPhone           = 6  //绑定手机
	UserLogTypeBindEmail           = 7  //绑定邮箱
	UserLogTypeBindGa              = 8  //绑定google验证器
	UserLogTypeChangePhone         = 9  //修改手机
	UserLogTypeChangeEmail         = 10 //修改邮箱
	UserLogTypeChangeGa            = 11 //绑定google验证器
	UserLogTypeAddWithdrawAddress  = 11 //添加提币地址
	UserLogTypeWithdraw            = 12 //提币
```

#### 财务日志类型 BalanceLogType

```txt
	BalanceLogTypeDeposit       = 1 //充值
	BalanceLogTypeWithdraw      = 2 //提现
	BalanceLogTypeOtcBuy        = 3 //场外买入
	BalanceLogTypeOtcSell       = 4 //场外卖出
	BalanceLogTypeMerchantBail  = 5 //商家保证金
	BalanceLogTypePenalty       = 6 //罚金
	BalanceLogTypeReward        = 7 //奖金
```

#### otc申诉类型 OtcAppealType

```txt
	OtcAppealTypeNoResponse         = 1 //一直不响应
	OtcAppealTypePaidButNotRelease  = 2 //已付款不放币
	OtcAppealTypeMaliciousOrder     = 3 //恶意下单
	OtcAppealTypeFalsePaid          = 4 //恶意点击已付款
```

#### otc申诉状态 OtcAppealState

```txt
	OtcAppealStateNoProcess     = 0 //未处理
	OtcAppealStateProcessing    = 1 //处理中
	OtcAppealStateReject        = 2 //驳回
	OtcAppealStateReleaseCoin   = 3 //放币
	OtcAppealStateCancelDeal    = 4 //取消订单
	OtcAppealStateSolvedByUser  = 5 //用户已自行解决
	OtcAppealStateCanceled      = 6 //已撤消
```

#### otc订单状态 OtcDealState

```txt
	OtcDealStateTrading   = 0 //交易中
	OtcDealStatePaid      = 1 //已支付
	OtcDealStateDone      = 2 //已放币,已完成
	OtcDealStateCanceled  = 3 //已取消
```

#### otc申诉用户类型 OtcAppealUserType

```txt
	OtcAppealUserTypeBuyer   = 1 //买家
	OtcAppealUserTypeSeller  = 2 //卖家
```

#### 订单方向 OrderSide

```txt
	OrderSideBuy   = 1
	OrderSideSell  = 2
```

#### otc 广告状态 OtcOrderState

```
	OtcOrderStateWait        = 0 //等待中
	OtcOrderStateTrading     = 1 //交易中
	OtcOrderStateFinished    = 2 //已完成
	OtcOrderStateCanceled    = 3 //已取消
	OtcOrderStateClosed      = 4 //已关闭
	OtcOrderStatePlatClosed  = 5 //平台强制关闭
```

#### 支付方式类型 PayType

```txt
	PayTypeBank       = 1 //银行卡
	PayTypeAlipay     = 2 //支付宝
	PayTypeWechatPay  = 3 //微信
	PayTypeHuione     = 4 //汇旺
```

#### 实名状态 VerificationState

```txt
    VerificationStateNone    = 0 //未提交
	VerificationStateWait    = 1 //等待审核
	VerificationStatePass    = 2 //通过
	VerificationStateReject  = 3 //拒绝
```

#### 通用状态 CommonStatus

```txt
	CommonStatusDisabled  = 0 //禁用
	CommonStatusEnabled   = 1 //启用
```

#### otc商户状态 OtcMerchantStatus

```txt
	OtcMerchantStatusWait          = 0 //等待审核,账户内有足额保证金才可以提交
	OtcMerchantStatusPassed        = 1 //已通过,通过时会冻结保证金,如果保证金不足无法通过
	OtcMerchantStatusReject        = 2 //拒绝
	OtcMerchantStatusSuspend       = 3 //暂停资格
	OtcMerchantStatusRevoke        = 4 //吊销资格,可选是否退还保证金
	OtcMerchantStatusRevokeByUser  = 5 //用户自行注销,退还所有保证金
```


#### 国家类型 CountryType

```txt
	CountryChina         = 1  //中国
	CountryUSA           = 2  //美国
	CountrySingapore     = 3  //新加坡
	CountryIndia         = 4  //印度
	CountryVietnam       = 5  //越南
	CountryCanada        = 6  //加拿大
	CountryAustralia     = 7  //澳大利亚
	CountryKorea         = 8  //韩国
	CountrySwitzerland   = 9  //瑞士
	CountryHolland       = 10 //荷兰
	CountryTaiwan        = 11 //台湾
	CountryRussia        = 12 //俄罗斯
	CountryUnitedKingdom = 13 //英国
	CountryHongKong      = 14 //香港
	CountryNigeria       = 15 //尼日利亚
	CountryPhilippines   = 16 //菲律宾
	CountryCambodia      = 17 //柬埔寨
	CountryBrazil        = 18 //巴西
	CountryMalaysia      = 19 //马来西亚
	CountryMiddleEast    = 20 //中东
	CountryTurkey        = 21 //土耳其
	CountryNewZealand    = 22 //新西兰
	CountryBurma         = 23 //缅甸
```

#### 法币类型 CurrencyType

```txt
	CurrencyCNY = 1  //人民币
	CurrencyUSD = 2  //美元
	CurrencyEUR = 3  //欧元
	CurrencySGD = 4  //新加坡元
	CurrencyINR = 5  //印度卢比
	CurrencyVND = 6  //越南盾
	CurrencyCAD = 7  //加元
	CurrencyAUD = 8  //澳元
	CurrencyKRW = 9  //韩元
	CurrencyCHF = 10 //瑞郎
	CurrencyTWD = 11 //新台币
	CurrencyRUB = 12 //卢布
	CurrencyGBP = 13 //英镑
	CurrencyHKD = 14 //港币
	CurrencyNGN = 15 //尼日利亚奈拉
	CurrencyPHP = 16 //菲律宾比索
	CurrencyKHR = 17 //柬埔寨瑞尔
	CurrencyBRL = 18 //巴西雷亚尔
	CurrencyMYR = 19 //马来西亚林吉特
	CurrencyTRY = 20 //土耳其里拉
	CurrencyNZD = 21 //新西兰元
	CurrencyMMK = 22 //缅甸元
```

#### telegram操作类型 telegramType
```txt
	OtcBuy               = 1  // 场外购买广告列表
	OtcSell              = 2  // 场外出售广告列表
	OtcSubmit            = 3  // 场外下单
	OtcOrder             = 4  // 场外订单详情
```

### 错误定义

```txt
ERR_SERVER_ERROR      //服务器内部错误
ERR_PARAMS_ERROR      //参数错误
ERR_NO_PERMISSION     //无权限
ERR_NOT_FOUND         //记录未找到
ERR_ALREADY_PROCESSED //已处理过
ERR_ALREADY_EXISTED   //已存在

ERR_PASSPORT_ALEARDY_EXIST   //账号已存在
ERR_BAD_PASSPORT             //账号格式不正确
ERR_BAD_EMAIL                //邮箱格式不正确
ERR_BAD_PHONE                //手机格式不正确
ERR_BAK_NICKNAME             //昵称格式不正确
ERR_BAD_PASSPORT_OR_PASSWORD //用户名或密码错误
ERR_NICKNAME_ALEARDY_EXIST   //昵称已存在
ERR_USER_DISABLED            //用户已禁用
ERR_BAD_VERIFICATION_CODE    //验证码错误
ERR_VERIFICATION_LV1_NEEDED  //必须完成lv1实名认证
ERR_VERIFICATION_LV2_NEEDED  //必须完成lv2实名认证
ERR_VERIFICATION_LV3_NEEDED  //必须完成lv3实名认证

ERR_BALANCE_NOT_ENOUGH    //余额不足
ERR_FROZEN_NOT_ENOUGH     //冻结的额度不足，系统故障
ERR_VOLUME_NOT_ENOUGH     //数量不足
ERR_COIN_DEPOSIT_DISABLE  //当前币种暂停充币
ERR_COIN_WITHDRAW_DISABLE //当前币种暂停提币
ERR_AMOUNT_TOO_SMALL      //金额太小
ERR_AMOUNT_TOO_LARGE      //金额太大
ERR_BAD_PASSWORD          //密码不正确
ERR_BAD_PAY_PASSWORD      //支付密码不正确
ERR_BAD_EMAIL_CODE        //邮箱验证码不正确
ERR_BAD_PHONE_CODE        //手机验证码不正确
ERR_BAD_GA_CODE           //google验证码不正确
ERR_BAD_VERIFY_CODE_TYPE  //验证码类型不正确
ERR_INTERVAL_TO_SHORT     //时间间隔太短
ERR_TOO_FREQUENT          //操作过于频繁
ERR_SEND_FAILED           //发送失败
ERR_SELF_ADDRESS          //自己的地址
ERR_BAD_ADDRESS           //地址不正确
ERR_NOT_TRUST_ADDRESS     //不是可信地址
ERR_BAD_STATE             //状态不正确
ERR_PHONE_NOT_BOUND       //手机号未绑定
ERR_EMAIL_NOT_BOUND       //邮箱未绑定
ERR_NOT_INTERNAL_ADDRESS  //不是平台内部地址
ERR_PRICE_CHANGED         //价格已发生变化
ERR_COIN_OTC_NOT_ENABLED //该种种未开放otc

ERR_NOT_VERIFICATION                //未实名
ERR_MERCHANT_BAIL_COIN_NOT_CONFIG   //商家保证金币种未配置
ERR_MERCHANT_BAIL_AMOUNT_NOT_CONFIG //商家保证金数量未配置
ERR_NOT_OTC_MERCHANT //不是otc商家
ERR_BAD_OTC_MERCHANT_STATUS //otc商家状态不正常
ERR_MAX_CANCEL_COUNT //以达到当日最大可取消次数

ERR_BAD_COIN_SYMBOL //币种标识不正确
```

### 验证码

#### 请求图形验证码

`[post] /verification-code/captcha`

返回数据

```json
{
    "data": "", //base64格式的图片数据
    "id": "" //验证码id, 进行核验时要和用户输入的验证码一同上传
}
```

#### 发送手机验证码

`[post] /verification-code/phone/:type`

请求参数：

```txt
type: [VerifyCodeType] 验证码类型
phone: [string] 手机号,格式:86-13011111111
captcha: [string] 图形验证码
captcha_id: [string] 图形验证码id
```

#### 发送邮箱验证码

`[post] /verification-code/email/:type`

请求参数：

```txt
type: [VerifyCodeType] 验证码类型
email: [string] 邮箱
captcha: [string] 图形验证码
captcha_id: [string] 图形验证码id
```

### 用户

#### 注册

`[post] /user/sign-up`

请求参数：

```txt
passport: [string] 邮箱或手机号
password: [string] 密码,客户端需要md5(password+'bagpaysol')再上传,服务端会再次md5后保存
verification_code: [string] 手机或邮箱验证码
nickname: [string] 可选，昵称
```

返回数据：

`ok`

#### 通过账号获取安全验证类型(未登录)

`[get] /user/auth/option/:passport/:operate`

请求参数：

```txt
passport: [string] 邮箱或手机号
operate: [UserOpType] 操作类型
```

返回数据:

```txt
[UserOpType] //UserOpType类型的数组
```

#### 获取安全验证类型(需登录)

`[get] /user/auth/option/:operate`

请求参数：

```txt
operate: [UserOpType] 操作类型
```

返回数据:

```txt
[UserOpType] //UserOpType类型的数组
```


#### 登录

`[post] /user/sign-in`

请求参数：

```txt
passport: [string] 邮箱或手机号
password: [string] 密码,客户端需要md5(password+'bagpaysol')再上传,服务端会再次md5后保存
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据：

`ok`

#### 使用telegram登录

[post] /user/sign-in/telegram

请求参数：

txt
ac: [string] telegram认证token

返回数据：

ok

#### 使用telegram登录

https://bagpay.io/#/telegram?ac=

参数：

txt
ac: [string] telegram认证token
type: [telegramType] 操作类型
id: [int|string] 广告id或者订单id

#### APP下载
https://bagpay.io/download/
#### 登出

`[post] /user/sign-out`

请求参数：


返回数据：

`ok`


#### 检查昵称唯一性

`[post] /user/check-nickname`

请求参数：

```txt
nickname: [string] 昵称
```

返回数据：

`ok`


#### 忘记密码

`[post] /user/forget-password`

请求参数：

```txt
passport: [string] 邮箱或手机号
new_password: [string] 密码,客户端需要md5(password+'bagpaysol')再上传,服务端会再次md5后保存
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据：

`ok`


#### 忘记支付密码

`[post] /user/forget-pay-password`

请求参数：

```txt
passport: [string] 邮箱或手机号
new_password: [string] 密码,客户端需要md5(password+'bagpaysol')再上传,服务端会再次md5后保存
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据：

`ok`


#### 获取用户信息

`[post] /user/profile`

请求参数：


返回数据：

```json
{
    "phone": "86-13100000000",//[string] 手机号
    "email": "test@xx.com", //[string] 邮箱
    "password": "1", //[string] 处理过的密码,不为空代表已设置
    "pay_password": "1", //[string] 处理过的支付密码,不为空代表已设置
    "nickname": "昵称",
    "photo": "头像",
    "ver_lv": 0, //实名认证级别 0.未认证 1.基础认证 2.身份认证 3.视频认证
    "ga": "1", //处理过的google验证码,不为空代表已设置
    "status": 1, //状态,1.正常 0.禁用  
    "created_at": "", //创建时间   
}
```

#### 修改密码

`[post] /user/change-password`

请求参数：

```txt
new_password: [string] 密码,客户端需要md5(password+'bagpaysol')再上传,服务端会再次md5后保存
password: [string] 可选, 原密码
pay_password: [string] 可选, 原支付密码
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据：

`ok`

#### 修改密码

`[post] /user/change-pay-password`

请求参数：

```txt
new_password: [string] 密码,客户端需要md5(password+'bagpaysol')再上传,服务端会再次md5后保存
password: [string] 可选, 原密码
pay_password: [string] 可选, 原支付密码
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据：

`ok`


#### 修改昵称

`[post] /user/change-nickname`

请求参数：

```txt
nickname: [string] 昵称
```

返回数据：

`ok`


#### 绑定手机号

`[post] /user/bind-phone`

请求参数：

```txt
phone: [string] 手机号
password: [string] 可选, 密码
pay_password: [string] 可选, 支付密码
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据：

`ok`


#### 绑定邮箱

`[post] /user/bind-email`

请求参数：

```txt
email: [string] 邮箱
password: [string] 可选, 密码
pay_password: [string] 可选, 支付密码
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据：

`ok`


#### 绑定google验证码

`[post] /user/bind-ga`

请求参数：

```txt
password: [string] 可选, 密码
pay_password: [string] 可选, 支付密码
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据：

`ok`


#### 获取余额

`[post] /user/balance/:coin`

请求参数：

```txt
coin: [string] 币种
```

返回数据：

```json
{
    "id": 1,
    "uid": 1,
    "coin": "usdt",
    "available": 0, //可用
    "otc_frozen": 0, //otc冻结
    "withdraw_frozen": 0, //提现冻结
    "sys_frozen": 0 //系统冻结
}
```

#### 获取所有币种余额

`[post] /user/balances`

请求参数：


返回数据：

```json
[{
    "id": 1,
    "uid": 1,
    "coin": "usdt",
    "available": 0, //可用
    "otc_frozen": 0, //otc冻结
    "withdraw_frozen": 0, //提现冻结
    "sys_frozen": 0 //系统冻结
}]
```

#### 获取余额变动记录

`[post] /user/balance-log/:coin`

请求参数：

```txt
begin: [time] 可选,开始时间
end: [time] 可选,结束时间
offset: [int64] 跳过条数
limit: [int64] 最大返回条数
```

返回数据：

```json
{
    "total": 1,
    "list": [
        {
            "uid": 0,
            "coin": "usdt",
            "amount": 0, //变动数量,正是增加,负是减少 
            "fee": 0, //手续费
            "balance": 0, //变动后的余额
            "type": 0, //类型 1.充值 2.提现 3.场外买入 4.场外卖出 5.商家保证金 6.罚金 7.奖金 
            "tag": "", //标记 
            "remark": "", //备注  
            "created_at": "", //创建时间 
        }
    ]
}
```


### 币种信息

#### 获取单个币种信息

`[get] /coin/one/:coin`

请求参数:

```txt
coin: [string] 币种标识
```

返回数据: CoinInfo

```json
"name":  "usdt",         // 名称                               
"symbol": "usdt",        // 标识                               
"sort":  0,         // 排序，越大越靠前                   
"enable": 1,        // 是否启用                           
"enable_otc": 1,    // 是否开放otc交易                    
"otc_fee":  0.01      // otc手续费                          
"decimal": 8,       // 小数精度                           
"in_enable": 1,     // 是否允许转入                       
"in_min":  100,       // 最低转入数量                       
"confirmations": 1, // 转入最低确认数                     
"out_enable": 1,    // 是否允许转出                       
"out_fee":  5,      // 转出手续费                         
"out_min":  10,      // 最小转出量                         
"out_max":  1000000,      // lv3最大转出量(24小时)                 
"out_max_lv_1": 1000,   // lv1认证的用户最大可转出量(24小时)  
"out_max_lv_2": 10000,  // lv2认证的用户最大可转出量(24小时)  
"out_auto":  100,     // 自动转出限额(24小时)               
"master_address": "",// 主钱包地址,需要memo的币种必填      
"need_memo":  0,    // 是否必须标记备注信息               
"created_at": ""     // 创建时间   
```

#### 获取币种支持的协议

`[get] /coin/:coin/protocols`

请求参数:

```txt
coin: [string] 币种标识
```

返回数据: CoinProtocolInfo

```json
"symbol": "usdt",        // 标识    
"protocol": "erc20", // 协议名, 为空不需要展示名称                           
"otc_fee":  0.01      // otc手续费                          
"in_enable": 1,     // 是否允许转入                       
"in_min":  100,       // 最低转入数量                       
"confirmations": 1, // 转入最低确认数                     
"out_enable": 1,    // 是否允许转出                       
"out_fee":  5,      // 转出手续费                         
"out_min":  10,      // 最小转出量                         
"master_address": "",// 主钱包地址,需要memo的币种必填      
"need_memo":  0,    // 是否必须标记备注信息               
"created_at": ""     // 创建时间   
```

#### 获取所有币种列表

`[get] /coin/list`

返回数据:

`[CoinInfo]`


### 充币

#### 获取充币地址

`[get] /deposit/address/:coin`

请求参数:

```txt
coin: [string] 币种标识
```

返回数据:

```json
{
	"name": "usdt", //名称
	"symbol": "usdt",//标识
	"decimal": 8,//小数精度
	"out_enable": 1, //是否允许转入
	"out_min": 100,//最小转入量
	"need_memo": 0,//是否必须填写备注
	"address": "0x00000000000000000",//钱包地址
	"memo": ""//备注
}
```


#### 获取充币历史

`[get] /deposit/history/:coin`

请求参数:

```txt
coin: [string] 币种标识
begin: [time] 可选,开始时间
end: [time] 可选,结束时间
offset: [int64] 跳过条数
limit: [int64] 最大返回条数
```

返回数据:

```json
{
	"total": 10,
	"list": [
		{
			"id": 111, 
			"uid": 11, //所属用户
			"coin": "usdt",//币种
			"type": 0, //类型 0.链上 1.内部
			"amount": 1, //数量
			"tx": "0xaaaaaa",//链上的交易id
			"status": 0,//状态 0.确认中 1.已到账 2.异常  
			"created_at": "" //时间
		}
	]
}
```

### OTC申诉

#### 提交申诉

`[post] /otc/appeal/submit`

请求参数：

```txt
deal_id: [string] 订单id
type: [OtcAppealType] 问题类型
content: [string] 总是描述
images: [file] 申诉图片
```

返回数据:

`ok`

#### 取消申诉

`[post] /otc/appeal/cancel/:id`

请求参数：

```txt
id: [string] 申诉id
```

返回数据:

`ok`

#### 获取申诉

`[post] /otc/appeal/get/:id`

请求参数：

```txt
id: [string] 申诉id
```

返回数据: AppealInfo

```json
{
	"id": 11, 
	"order_id": 1, //广告id
	"deal_id": 2, //订单id
	"uid": 100, //控告者id
	"user_type": 1, //OtcAppealUserType
	"type": 1, //OtcAppealType
	"content": "", //总是描述
	"images": "", //申诉图片,逗号分隔
	"status": 1, //OtcAppealState
	"suggest": "", //处理意见
	"created_at": "" //创建时间
}
```

#### 根据订单id获取申诉

`[post] /otc/appeal/get-by-deal/:id`

请求参数：

```txt
id: [string] 订单id
```

返回数据: AppealInfo


### OTC订单

#### 下单

`[post] /otc/deal/submit`

请求参数：

```txt
order_id: [int64] 广告id
pay_type: [PayType] 支付类型
price: [float64] 价格
amount: [float64] 数量,如果是卖出的话需要保证账户中还有足够可以扣除的手续费，即账户中至少可用余额应该存在amount + fee
```

返回数据: DealInfo

```json
{
	"id": 100,
	"taker_id": 1, //下单用户id
	"maker_id": 2, //广告主用户id
	"order_id": 10, //广告id
	"taker_side": 1, //下单用户的交易方向 OrderSide
	"coin": "usdt", //币种
	"price": 1, //价格
	"amount": 100, //数量
	"value": 100, //交易额
	"fee": 0.01, //手续费 amount*fee_rate
	"pay_type": 1, //PayType
	"pay_tag": "0100", //付款参考号
	"bank_info_id": 10, //收付款信息id
	"state": 1, //OtcOrderState
	"appealing": 0, //是否申诉中
	"created_at": "" //创建时间 
}
```

#### 获取订单详情

`[get] /otc/deal/get/:id`

请求参数：

```txt
id: [int64] 订单id
```

返回数据:

```txt
{
	DealInfo
	target_nickname: [string] 对方昵称
	target_email: [string] 对方邮箱
	target_phone: [string] 对方手机号
	target_photo: [string] 对方头像
}
```


#### 取消订单

`[post] /otc/deal/cancel/:id`

请求参数：

```txt
id: [string] 订单id
```

返回数据:

`ok`


#### 标记为已付款(仅买家可调用)

`[get] /otc/deal/paid/:id`

请求参数:

```txt
id: [int64] 订单id
```

返回数据: 

`ok`


#### 释放币(只有卖方可以释放)

`[post] /otc/deal/release/:id`

请求参数：

```txt
id: [string] 订单id
```

返回数据:

`ok`


#### 获取订单列表

`[post] /otc/deal/list`

请求参数：

```txt
coin: [string] 可选,币种
order_id: [int64] 可选,订单id
state: [OtcOrderState] 可选,-1取全部
begin: [time] 可选,开始时间
end: [time] 可选,结束时间
offset: [int64] 跳过条数
limit: [int64] 最大返回条数
```

返回数据:

```json
{
	"total": 10,
	"list": [
		DealInfo
	],
	"target_users": { //对方用户信息 uid: Info
		"10": {
			"nickname":"xx",
			"photo":"xxx",
			"email": "",
			"phone": ""
		}
	}
}
```

### OTC商户

#### 申请商户

`[post] /otc/merchant/submit`

请求参数:

```txt
phone: [string] 手机号 86-13011111111
email: [string] 邮箱
social_type: [string] 社交媒体类型 wechat,telegram
social: [string] 社交媒体账号
ice_name: [string] 紧急联系人姓名
ice_phone: [string] 紧急联系人电话
ice_relation: [string] 紧急联系人与本人的关系
address: [string] 常住地址
```

返回数据:

`ok`


#### 更新商户申请信息

`[post] /otc/merchant/update`

仅等待审核和已拒绝的状态的才能更新

请求参数:

```txt
phone: [string] 手机号 86-13011111111
email: [string] 邮箱
social_type: [string] 社交媒体类型 wechat,telegram
social: [string] 社交媒体账号
ice_name: [string] 紧急联系人姓名
ice_phone: [string] 紧急联系人电话
ice_relation: [string] 紧急联系人与本人的关系
address: [string] 常住地址
```

返回数据:

`ok`

#### 获取申请信息

`[get] /otc/merchant/get`

返回数据：OtcMerchantInfo

```json
{
	"id": 1,
	"uid": 11,
	"name": "Allen", //真实姓名
	"phone": "86-13011111111", //电话
	"email": "tm@xx.com", //邮箱
	"social_type": "wechat", //社交媒体类型
	"social": "test", //社交媒体账号
	"ice_name": "xx", //紧急联系人姓名
	"ice_phone": "xx", //紧急联系人电话  
	"ice_relation": "xx", //紧急联系人与本人的关系
	"address": "xx", //常住地址
	"bail_coin": "usdt", //保证金币种 
	"bail_amount": 1000, //保证金数目 
	"status": 1, //OtcMerchantStatus
	"lst_id": 1, //最新一条状态变更记录id(otc_merchant_status_log)
	"created_at": "" //申请时间
}
```

#### 获取商户状态

`[get] /otc/merchant/stat/:uid`

返回数据：

```json
{
	"id": 1,
	"uid": 11,
	"nickname": "Allen", //昵称
	"phone": "86-13011111111", //电话
	"email": "tm@xx.com", //邮箱
	"photo": "", //头像
	"order_count": 0, //发布的广告数
	"finished_count": 0, //完成的订单数
	"finished_rate": 0.0, //订单的完成率
	"status": 1, //OtcMerchantStatus
	"verification_at": "" //认证时间
}
```

#### 获取提交的状态变更记录

`[get] /otc/merchant/status-log/:id`

请求参数:

```txt
id: [int64] 状态id, lst_id
```

返回数据: OtcMerchantStatusLogInfo

```json
{
	"id": 1, 
	"uid": 10, //所属用户id
	"mid": 11, //otc_merchant的id, 申请记录id
	"old_status": 0, //原状态  
	"new_status": 1, //新状态
	"reason": "", //理由
	"created_at": "" //时间
}
```

#### 获取提交的状态变更记录列表

`[get] /otc/merchant/status-log/list/:mid`

请求参数:

```txt
id: [int64] otc_merchant的id
```

返回数据：

```json
[
	OtcMerchantStatusLogInfo
]
```

### 提币

#### 获取已保存的提币地址

`[get] /withdraw/address/list/:coin`

请求参数:

```txt
coin: [string] 币种
```

返回数据: WithdrawAddressInfo

```txt
id: [int64] 记录id
uid: [int64] 所属用户id
coin: [string] 所属币种 
protocol: [string] 所属协议,erc20,trc20,eos
remark: [string] 备注
address: [string] 地址
memo: [string] 地址附加信息
trust: [int] 是否是可信的
created_at: [string] 创建时间
```

#### 添加提币地址

`[get] /withdraw/address/add`

请求参数:

```txt
coin: [string] 所属币种 
protocol: [string] 所属协议,erc20,trc20,eos
remark: [string] 备注
address: [string] 地址
memo: [string] 地址附加信息
trust: [int] 是否是可信的

password: [string] 可选, 密码
pay_password: [string] 可选, 支付密码
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据:

`ok`


#### 删除提币地址

`[get] /withdraw/address/del/:id`

请求参数:

```txt
id: [int64] 提币地址id
```

返回数据:

`ok`

#### 提交提币申请

`[post] /withdraw/submit`

请求参数:

```txt
coin: [string] 所属币种 
protocol: [string] 所属协议,erc20,trc20,eos
amount: [float64] 数量
remark: [string] 备注
address: [string] 地址
memo: [string] 地址附加信息
trust: [int] 是否是可信的

password: [string] 可选, 密码
pay_password: [string] 可选, 支付密码
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```

返回数据:

`ok`



#### 取消提币申请

`[get] /withdraw/cancel/:id`

请求参数:

```txt
id: [int64] id
```

返回数据:

`ok`


#### 获取提币历史

`[get] /withdraw/history/:coin`

请求参数:

```txt
coin: [string] 币种
begin: [time] 可选,开始时间
end: [time] 可选,结束时间
offset: [int64] 跳过条数
limit: [int64] 最大返回条数
```

返回数据:

```json
{
	"total": 10, 
	"list": [
		{
			"id": 1,
			"uid": 10,
			"coin": "usdt",
			"protocol": "erc20", //该链使用的协议,erc20,trc20,eos
			"type": 1, //转出类型 0.链上转出 1.内部转出
			"amount": 100, //数量,实际到账数量=amount-fee 
			"fee": 5, //手续费
			"address": "0xaaaaaa", //提现地址
			"memo": "", //地址备注
			"tx": "0xaaaaa", //链上的交易id 
			"status": 1, //WithdrawState
			"reject_reason": "", //拒绝理由 
			"created_at": "", //提交时间 
		}
	]
}
```

#### 获取24小时内的已提币数量

`[get] /withdraw/day-amount/:coin`

```txt
coin: [string] 币种
```

返回数据：

`float64`

### 广告

#### 发布广告

`[post] /otc/order/place`

请求参数:

```txt
coin: [string] 币种标识
type: [OrderSide] 交易方向
price: [float64] 价格
total: [float64] 总数量,包含了手续续，实际可交易数量要减掉手续费
min_value: [float64] 最小下单交易额
max_value: [float64] 最大下单交易额,0为不限
pay_types: [string] 支持的支付方式类型[PayType],逗号分隔
country: [CountryType] 所在国家
currency: [CurrencyType] 法币类型
floating_rate: [float64] 采用浮动价格后有效，溢价比例，0为不采用浮动价格, 1为不溢价，大于1为正溢价，小于1为负溢价
remark: [string] 备注
```

返回数据:

`OrderId`


#### 获取广告详情

`[get] /otc/order/get/:id`

请求参数:

```txt
id: [int64] 广告id
```

返回数据: OrderInfo

```json
{
	"id": 1,
	"uid": 10, //所属用户id
	"nickname": "allen", //昵称
	"coin": "usdt", //币种
	"type": 1, //OrderSide 交易方向
	"price": 1, //价格
	"total": 100, //总可交易挂单数量,实际冻结数量为total+fee
	"fee": 0.1, //总应收取的手续费
	"filled": 10, //已成交
	"filled_value": 10, //已成交金额
	"filled_fee": 0, //已成交扣除的手续费
	"frozen": 0, //下单被冻结数量
	"min_value": 10, //最小下单金额
	"max_value": 100, //最大下单金额
	"pay_types": "1,2", //支持的支付类型
	"country": 1, //国家类型
	"currency": 1, //货币类型 
	"remark": "", //备注
	"status": 1, //OrderState
	"floating_rate": 0, //采用浮动价格后有效，溢价比例，0为不采用浮动价格, 1为不溢价，大于1为正溢价，小于1为负溢价
	"close_why": "", //平台强制关闭的原因
	"created_at": "" //创建时间
}
```

#### 下架广告

`[get] /otc/order/cancel/:id`

请求参数:

```txt
id: [int64] 广告id
```

返回数据: 

`ok`


#### 获取可交易的广告列表

`[get] /otc/order/trade/list`

请求参数:

```txt
coin: [string] 可选,币种
side: [OrderSide] 可选,广告方向
uid: [int64] 可选，用户id
offset: [int] 可选,跳过条数
limit: [int] 可选,最大返回条数
```

返回数据: 

```json
{
	"total": 10,
	"list": [
		OrderInfo
	]
}
```


#### 获取我发布的广告列表

`[get] /otc/order/list`

请求参数:

```txt
coin: [string] 可选,币种
status: [int] 可选,状态 -1代表全部
begin: [string] 可选,开始时间
end: [string] 可选,结束时间
offset: [int] 跳过条数
limit: [int] 最大返回条数
```

返回数据: 

```json
{
	"total": 10,
	"list": [
		OrderInfo
	]
}
```

#### 获取能用配置信息

`[get] /config/common`

返回数据:

```json
{
	"OtcMerchantBailCoin": "usdt", //otc商家保证金币种
	"OtcMerchantBailAmount": "1000", //otc商家保证金金额
	"OtcGlobalMaxCancel": "3", //24小时最大允许取消订单数
	"OtcGlobalDealTimeout": "1800", //订单超时时长,秒
}
```

#### 其它货币对美元汇率

`[get] /exchange-rate/usd`

返回数据:

```json
{
	"usdt": 1,
	"btc": 11300,
	"cny": 0.149,
}
```


### 文件

#### 下载文件 

`[get] /file/:id`

请求参数:

```txt
id: [string] 文件id
```


### 实名

#### 获取实名信息

`[get] /verification/get`

返回数据:

```json
{
	"real_name": "Axx", // 真实姓名
	"id_type": 1, // 证件类型 1.身份证 2.护照
	"id_num": "*****xxx", // 身份证号
	"status_lv_1": 1, // lv1状态 0.等待审核 1.通过 2.拒绝
	"status_lv_2": 1, // lv2状态 0.等待审核 1.通过 2.拒绝
	"status_lv_3": 1, // lv3状态 0.等待审核 1.通过 2.拒绝
	"reject_reason": "", //拒绝理由
	"created_at": "", // 创建时间
}
```

#### 提交lv1认证

`[post] /verification/lv1/submit`

请求参数:

```txt
real_name: [string] 真实姓名
id_type: [int] 证件类型 1.身份证 2.护照
id_num: [string] 身份证号
```

返回数据:

`ok`

#### 提交lv2认证

`[post] /verification/lv2/submit`

请求参数:

```txt
pic1: [file] 身份证正面照片
pic2: [file] 身份证反面照片
pic3: [file] 手持身份证照片
```

返回数据:

`ok`

#### 提交lv3认证

`[post] /verification/lv3/submit`

请求参数:

```txt
video: [file] 视频文件
```

返回数据:

`ok`


### 支付方式

#### 获取支付方式列表

`[get] /bank/list`

返回数据: BankInfo

```json
[
	{
		"id": 1, //id
		"name": "ABA", //简称
		"title": "ABA bank", //显示名称
		"url": "", //网址
		"img": "", //logo
		"remark": "" //备注
	}
]
```

#### 获取指定已添加的支付方式信息

`[get] /bank/user/get/:id`

请求参数:

```txt
id: [int] 支付方式id
```

返回数据: UserBankInfo

```json
{
	"id": 1, 
	"uid": 1,
	"type": 1, //类型：1.银行卡 2.支付宝 3.微信 4.汇旺  
	"real_name": "Axx", //持卡人姓名
	"bank": "ABA bank", //银行名称
	"sub_bank": "", //支行名称
	"account": "xxx", //账号
	"qrc": "", //二维码地址
	"status": 1, //0.禁用 1.可用    
	"created_at": "", //添加时间
}
```

#### 根据类型获取已添加的支付方式信息(只返回开用状态的一条)

`[get] /bank/user/get-by-type/:type`

请求参数:

```txt
type: [int] 类型：1.银行卡 2.支付宝 3.微信 4.汇旺  
```

返回数据：

`UserBankInfo`

#### 获取已添加的所有支付方式

`[get] /bank/user/list`

返回数据：

`[UserBankInfo]`

#### 启用指定的支付方式

`[post] /bank/user/enable/:id`

请求参数:

```txt
id: [int] 支付方式id
```

返回数据：

`ok`

#### 禁用指定的支付方式

`[post] /bank/user/disable/:id`

请求参数:

```txt
id: [int] 支付方式id
```

返回数据：

`ok`

#### 添加支付方式

`[post] /bank/user/add`

请求参数：

```txt
type: [int] 类型：1.银行卡 2.支付宝 3.微信 4.汇旺  
real_name: [string] 持卡人姓名
bank: [string] 银行名称
sub_bank: [string] 支行名称
account: [string] 账号
qrc: [file] 二维码
```

### 应用

#### 检测更新

`[get] /app/version/check`

请求参数:

```txt
channel: [string] 渠道 apple,google
version: [string] 版本
build: [string] 构建号
```

返回数据:

```json
{
	"channel": "apple", //渠道
	"version": "1.0.0", //版本
	"build": "10", //构建号
	"content": "xxx", //更新内容
	"force_update": 0, //是否强制更新
	"url": "", //下载地址
	"created_at": ""
}
```

### 广告

#### 取广告列表

`[get] /advert/list`

请求参数：

```txt
lang: [string] 语言,en/zh-CN
type: [int] 可选, 广告类型 1.开屏广告 2.首页banner
```

返回数据：

```json
[
	{
		"id": 1,
		"type": 1,
		"sort": 1, //排序,越大越靠前
		"title": "xx", //标题
		"url": "", //跳转地址
		"image": "", //图片id
		"lang": "", //语言
	}
]
```