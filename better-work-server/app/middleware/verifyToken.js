/**
 * Description: 验证是否登录
 * Date: 2022-02-22
 * Creator: JackDan 
 */
module.exports = () => {
  return async function (ctx, next) {
    const _ver = await ctx.helper.verifyToken();
    if (ver) {
      await next();
    }
  }
}