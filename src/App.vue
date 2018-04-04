<template>
  <div id="app">
    <Chart :config="config"></Chart>
    <InputItem placeholder="that is very good" label="测试"/>
    <InputItem placeholder="that is very good" label="测试测试测试"/>
  </div>
</template>

<script>
import InputItem from './components/input';
import Chart from './components/chart';

export default {
  name: 'App',
  data() {
  	return {
  		config: {
        type: 'interval',
        position: 'genre*sold',
        color: 'genre'
      }
  	}
  },
  components: {
    InputItem,
    Chart
  }
}
</script>

<style lang="less">
@import "./style/themes/default.less";

#app {
  background-color: @fill-body;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  background-color: @fill-body;
}
</style>
