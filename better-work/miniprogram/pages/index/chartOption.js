function getOption(data) {
  const option = {
    geo: {
      show: true,
      map: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false,
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#24a0fa'
            }, {
              offset: 1, color: '#15072a'
            }],
            global: false
          },
          shadowColor: 'rgba(1, 39, 44, 1)',
          shadowOffsetX: 0,
          shadowOffsetY: 8,
          borderColor: '#a18a3a',
          borderWidth: 1,
        },
        emphasis: {
          show: true,
          areaColor: '#2B91B7'
        }
      }
    },
    series: [
      {
        name: '散点',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 1,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#05C3F9'
          }
        },
        data: data,
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#24a0fa'
              }, {
                offset: 1, color: '#15072a'
              }],
              global: false
            },
            shadowColor: 'rgba(1, 39, 44, 1)',
            shadowOffsetX: 0,
            shadowOffsetY: 8,
            borderColor: '#a18a3a',
            borderWidth: 1,
          },
          emphasis: {
            show: true,
            areaColor: '#2B91B7'
          }
        },
        animation: false
      }, {
        name: '点',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin', //气泡
        symbolSize: 38,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 9,
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#F62157', //标志颜色
          }
        },
        zlevel: 6,
        data: data,
      }],
  };

  return option;
}

module.exports = {
  getOption: getOption,
}