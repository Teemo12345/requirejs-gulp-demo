require.config({
  baseUrl:'/js/',
  paths:{
    // 'app':'app',
    'echarts': 'lib/echarts/3.line.bar.k.min'
  },
   bundles: {
    echarts: ['echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/candlestick', 'echarts/component/legend', 'echarts/component/tooltip','echarts/component/dataZoom','echarts/chart/pie']
  }
})