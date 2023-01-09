'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/articles', controller.article.index);
  router.post('/getNewsList', controller.news.getNewsList);
  router.post('/getNewsDetailsList', controller.news.getNewsDetailsList);
  router.post('/getNewsDetail', controller.news.getNewsDetail);
  // router.post('/saveOrUpdateNews', controller.news.saveOrUpdateNews);
  // router.post('/editNews', controller.news.editNews);
  // router.post('/editNewsDetail', controller.news.editNewsDetail);
  router.post('/getRecuriteList', controller.recurite.getRecuriteList);
  router.post('/getRecuriteDetailsList', controller.recurite.getRecuriteDetailsList);
  router.post('/getRecuriteDetail', controller.recurite.getRecuriteDetail);
  router.post('/saveOrUpdateRecurite', controller.recurite.saveOrUpdateRecurite);
  router.post('/editRecurite', controller.recurite.editRecurite);
  router.post('/editRecuriteDetails', controller.recurite.editRecuriteDetails);
  router.delete('/deleteRecurite', controller.recurite.deleteRecurite);
  router.post('/addRole', controller.admin.role.addRole);
  router.post('/rolePermissions', controller.admin.role.rolePermissions);
  router.post('/register', controller.admin.register.userRegister);
  router.post('/login', controller.admin.login.userLogin);
  router.get('/getUserInfo', controller.admin.login.getUserInfo);
  router.post('/getUserList', controller.admin.user.getUserList);
  router.post('/getRoleList', controller.admin.role.getRoleList);
  // router.delete('/delRole', controller.admin.role.delRole);
  router.post('/wechat', controller.wechat.wechat.wechat);
  router.get('/wechat', controller.wechat.wechat.index);
  router.post('/getCityWeather', controller.weather.getCityWeather.index);
  router.post('/getCitiesList', controller.weather.getCityWeather.getCityList);
  router.post('/editCities', controller.weather.getCityWeather.editCity);
  router.post('/getCityByLocationName', controller.weather.getCityWeather.getCityByLocationName);
};
 