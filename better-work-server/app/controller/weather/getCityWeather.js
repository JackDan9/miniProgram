"use strict";

const Controller = require("egg").Controller;


class GetCityWeatherController extends Controller {
  async index(config) {
    const { ctx } = this;

    let currentTime = new Date().getTime();
    let locationData = ctx.request.body;
    
    let weather_key = '723333367e644b65b064ac0d05714f93';
    let geoapi_url = 'https://geoapi.qweather.com/v2/city/lookup?location=' + locationData.location + '&key=' + weather_key;

    const geoResp = await ctx.curl(geoapi_url, {
      method: 'get',
    });
    const geoData = JSON.parse(geoResp.data.toString());
    
    let weather_url = 'https://devapi.qweather.com/v7/weather/now?location=' + geoData.location[0].id + '&key=' + weather_key
    const weatherResp = await ctx.curl(weather_url, {
      method: 'get',
    });
 
    const cityData = await ctx.service.weather.getCityWeather.getCityByLocationId(geoData.location[0].id);

    const weatherData = JSON.parse(weatherResp.data.toString());
    weatherData.now.cityTitle = geoData.location[0].country + '-' + geoData.location[0].name;
    weatherData.now.introduction = cityData.location_introduction;
    weatherData.now.palatableDishs = cityData.location_palatable_dishes;
    weatherData.now.sight = cityData.location_sight;
    weatherData.now.lat = geoData.location[0].lat;
    weatherData.now.lon = geoData.location[0].lon;
    weatherData.now.cityName = geoData.location[0].name;

    ctx.body = weatherData;
  };
  async getCityList() {
    const { ctx } = this;

    const pageData = ctx.request.body;

    const cityList = await ctx.service.weather.getCityWeather.getCityList(pageData);

    ctx.body = {
      code: 200,
      result: cityList,
      message: "获取城市列表成功"
    }
  };
  async editCity() {
    const { ctx } = this;

    const editCityParams = ctx.request.body;
    const editCityResult = await ctx.service.weather.getCityWeather.editCity(editCityParams);

    ctx.body = editCityResult;
  };
  async getCityByLocationName() {
    const { ctx } = this;

    const locationData = ctx.request.body;
    const res = await ctx.service.weather.getCityWeather.getCityByLocationName(locationData);

    ctx.body = {
      code: 200,
      result: res,
      message: "获取城市列表成功"
    }
  }
}

module.exports = GetCityWeatherController;