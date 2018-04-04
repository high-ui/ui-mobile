<template>
  <div id="app">
  	<span>{{xxx}}</span>
    <InputItem placeholder="that is very good" label="测试"/>
    <InputItem placeholder="that is very good" label="测试测试测试"/>
  </div>
</template>

<script>
import InputItem from './components/input';

export default {
  name: 'App',
  data() {
  	return {
  		'xxx': "1231313",
  	}
  },
  components: {
    InputItem
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
