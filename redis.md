<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 16:54:22
 * @LastEditTime: 2019-09-25 16:57:17
 * @LastEditors: Please set LastEditors
 -->
## redis基本指令

- 存储
   > set a 123
- 获取
   > get a
- 存储带有失效时间的key
   > setex a 10 123
- session存储
   > set session:sessionId 123
- 获取session存储
   > get session:sessionId