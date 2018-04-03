<template>
  <div id="app">
  	<span>{{xxx}}</span>
    <InputItem placeholder="that is very good"/>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
