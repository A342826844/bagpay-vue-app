interface CoinInfo {
    name: string; // 名称
    symbol: string; // 标识
    sort: number; // 排序，越大越靠前
    enable: number; // 是否启用
    enable_otc: number; // 是否开放otc交易
    otc_fee: number; // otc手续费
    decimal: number; // 小数精度
    in_enable: number; // 是否允许转入
    in_min: number; // 最低转入数量
    confirmations: number; // 转入最低确认数
    out_enable: number; // 是否允许转出
    out_fee: number; // 转出手续费
    out_min: number; // 最小转出量
    out_max: number; // lv3最大转出量(24小时)
    out_max_lv_1: number; // lv1认证的用户最大可转出量(24小时)
    out_max_lv_2: number; // lv2认证的用户最大可转出量(24小时)
    out_auto: number; // 自动转出限额(24小时)
    master_address: string;// 主钱包地址,需要memo的币种必填
    need_memo: 0; // 是否必须标记备注信息
    created_at: string; // 创建时间
}
