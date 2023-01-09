/**
 * 获取城市信息Service
 * 
 * @Date 2022-12-01
 * @Auther Shanjunjun
 */
'use strict';

const Service = require('egg').Service;

const Op = require('sequelize').Op;

class GetCityWeatherService extends Service {
  // 城市列表
  async getCityList(pageData) {
    const { ctx } = this;

    let resp = [];

    const { pageNumber = 1, pageSize = 10, sort } = pageData;
    await ctx.model.ChinaCities.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(pageSize) * (parseInt(pageNumber) - 1)
    }).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get news details list error: ", err);
    });

    return resp;
  };

  // 编辑城市
  async editCity(data) {
    const { ctx } = this;

    const { id } = data;
    let resp = {};

    await ctx.model.ChinaCities.update(data, {
      where: {
        id: id
      }
    }).then((res) => {
      console.log("edit recurite result: ", res);
      resp = {
        code: 200,
        result: true,
        message: "城市信息更新成功"
      };
    }).catch((err) => {
      console.error("edit recurite failed because: ", err);
      resp = {
        code: 10000,
        result: false,
        message: err
      };
    });

    return resp;
  };

  // 获取城市
  async getCityByLocationId(locationId) {
    const { ctx } = this;

    let resp = {};

    await ctx.model.ChinaCities.findOne({where: { location_id: locationId }}).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get city detail by " + locationId + " error: ", err);
    });

    return resp;
  };
  // 获取城市
  async getCityByLocationName(data) {
    const { ctx } = this;

    const { locationNameZh } = data;

    let resp = {};

    await ctx.model.ChinaCities.findAndCountAll({where: { location_name_zh: { [Op.like]: `%${locationNameZh}%` } }}).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get city detail by " + locationNameZh + " error: ", err);
    });

    return resp;
  };
}

module.exports = GetCityWeatherService;
