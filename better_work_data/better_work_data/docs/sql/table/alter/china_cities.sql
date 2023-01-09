ALTER TABLE `china_cities` ADD COLUMNE `location_introduction` TEXT DEFAULT NULL AFTER `adcode`;
ALTER TABLE `china_cities` ADD COLUMNE `location_palatable_dishes` TEXT DEFAULT NULL AFTER `location_introduction`;
ALTER TABLE `china_cities` ADD COLUMNE `location_sight` TEXT DEFAULT NULL AFTER `location_palatable_dishes`;