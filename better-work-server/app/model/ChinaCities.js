/**
 * Description: 中国城市Model
 * Date: 2022-12-01
 * Creator: JackDan
 */
 'use strcit';

 module.exports = app => {
   const {
     STRING,
     DATE,
     INTEGER,
     TEXT
   } = app.Sequelize;
   const ChinaCities = app.model.define('china_cities', {
     id: {
       type: INTEGER,
       primaryKey: true,
       autoIncrement: true,
     },
     location_id: STRING(36),
     location_name_en: STRING(36),
     location_name_zh: STRING(36),
     country_code: STRING(36),
     country_name_en: STRING(36),
     country_name_zh: STRING(36),
     adm1_name_en: STRING(36),
     adm1_name_zh: STRING(36),
     adm2_name_en: STRING(36),
     adm2_name_zh: STRING(36),
     timezone: STRING(36),
     latitude: STRING(36),
     longitude: STRING(36),
     adcode: STRING(36),
     location_introduction: TEXT,
     location_palatable_dishes: TEXT,
     location_sight: TEXT,
     created_at: DATE,
     updated_at: DATE
   });
 
   return ChinaCities;
 }