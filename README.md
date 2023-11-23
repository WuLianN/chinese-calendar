## 万年历

>
> 源码来自寿星万年历https://github.com/sxwnl/sxwnl
>
> 节选部分代码, 并es6模块化代码
>


### 文件描述
1.  eph0.js 天文计算
2.  lunar.js 月历计算
3.  util.js 月历组件


### 功能
`lunar.js`
```js
class Lunar {
  yueLiCalc(By,Bm){} // 返回公历某一个月的'公农回'三合历
  getJieQiByYear(year) {} // 24节气计算函数
}
```

`util.js` 获取月历组件
```js
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const calendar = new Calendar({ year, month })
```

### 效果
![](https://github.com/WuLianN/calendar/blob/main/images/1.png)
