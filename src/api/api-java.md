### api返回数据说明

```txt
{
    "code": 0, //错误码, 0为成功，其它为失败
    "message": "获取成功", //消息提示,错误时此处返回错误字符串
    "data": null //成功时返回的数据, 下面接口中所描述对象均是指此值
}
```

### 类型定义

#### 返佣类型 CommType

```txt
	CommTypeTeam    = 0  //团队
	CommTypeFirst   = 1  //一级返佣 直推
	CommTypeSecond  = 2  //二级返佣 间推
	CommTypeThress  = 3  //三级返佣 间推
```

### 用户邀请

#### 获取邀请信息

`[get] /ext_user/getLoginUser`

返回数据

```json
{
    "userId": 1,
    "userName": "肖利铭", // 昵称
    "gradeName": "v1", // 团队名称
    "invitCode": "DZXQzR", // 普通邀请码
    "partnerInviteCode": "P_DZxGRz", // 合伙人邀请码
    "gradeId": 3, // 等级ID
    "allComm": 0, // 总返佣
    "availComm": 0, // 可提现佣金
    "costComm": 0, // 累计提现佣金
    "pid": 0, // 上级用户id
    "pid2": 0,// 上上级用户id
    "createdAt": "2020-11-16 18:26:49", // 被邀请时间
    "childCount": 3, // 邀请人数
    "parentCommSum": 0, // 给父级产生佣金
    "role": 0, // 角色 0:一级  1:二级 2:三级
}
```

#### 获取返佣规则

`[get] /grade_comm`

返回数据

```json
{
	"data": [
		{
			"id": 3, // 规则id
            "name": "V3", // 等级
            "firstComm": 0.15, // 直推
            "secondComm": 0.1, // 2级
            "threeComm": 0.2, // 三级
            "teamComm": 0, // 团队
            "inspect": 0, // 
            "role": 1, // 角色
            "sort": 3, // 团队
            "createdAt": "2020-11-13T09:29:30.000+00:00", // 创建时间
		}
	]
}
```

#### 获取邀请人员列表

`[get] /ext_user/getChildren`

请求参数:

```txt
cascade: [boolean] 币种标识
userId: [int64] 可选,开始时间
```

返回数据

```json
{
	"data": [
		{
			"userId": 4, // 用户Id
            "userName": "honcur", // 用户昵称
            "invitCode": "", // 普通邀请码
            "partnerInviteCode": null, // 合伙人邀请码
            "gradeId": 3, // 等级ID
            "allComm": 0, // 总返佣
            "availComm": 0, // 可提现佣金
            "costComm": 0, // 累计提现佣金
            "pid": 0, // 上级用户id
            "pid2": 0,// 上上级用户id
            "createdAt": "2020-11-16 18:26:49", // 被邀请时间
            "childCount": 3, // 邀请人数
            "parentCommSum": 0, // 给父级产生佣金
            "role": 0, // 角色 0:一级  1:二级 2:三级
		}
	]
}
```

#### 获取邀请返佣明细

`[get] /comm_detail`

请求参数:

```txt
currentPage: [int64] 页码
pageNum: [int64] 每页条数
```

返回数据

```json
{
    "total": 255, // 总条数
	"data": [
		{
			"id": 1, // 信息id
            "userId": 1, // 用户id
            "amount": 50, // 金额
            "coin": "usdt", // 币种
            "child1User": 3, // 交易者id
            "child2User": 4, // 交易者id
            "child3User": 0, // 交易者id
            "traderId": 4, // 交易者id
            "reason": " ", // 返佣备注
            "commType": 2, // 返佣类型 0： CommType
            "createdAt": "2020-11-16 18:49:59", // 时间
            "childNickname": "料子", // 直推下级昵称
            "traderNickName": "料子", // 交易者产生佣金昵称
		}
	]
}
```