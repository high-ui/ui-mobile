<template>
    <div id="app">
        <Chart :config="config"></Chart>
        <InputItem placeholder="that is very good" label="测试"/>
        <Group>
            <InputItem placeholder="that is very good" label="测试测试测试"/>
            <SelectItem placeholder="that is very good" label="测试" :options="options"></SelectItem>
            <SelectItem placeholder="that is very good" label="测试" :options="options"></SelectItem>
        </Group>
        <SelectItem placeholder="that is very good" label="测试" :options="options"></SelectItem>
        <SelectItem placeholder="that is very good" label="测试" :options="options"></SelectItem>
    </div>
</template>

<script>
import InputItem from './components/input';
import SelectItem from './components/select';
import Group from './components/group';
import Chart from './components/chart';

export default {
    name: 'App',
    data() {
        return {
            config: {
                type: 'interval',
                position: 'genre*sold',
                color: 'genre'
            },
            options: [{
                name: 'A',
                value: 'A'
            }, {
                name: 'B',
                value: 'B'
            }, {
                name: 'C',
                value: 'C'
            }, {
                name: 'D',
                value: 'D'
            }]
        }
    },
    components: {
        InputItem,
        SelectItem,
        Group,
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
