<template>
    <div id="app">
        <Popup v-model="a">
        	<PopupHeader title="测试" left-text="取消" right-text="确定" @on-click-left="hide">
        		
        	</PopupHeader>
            <div>AAA</div>
        </Popup>
        <Tabs>
            <TabPane label="饼图">
                <Chart :config="config"></Chart>
            </TabPane>
            <TabPane label="饼图">
                <Chart :config="config"></Chart>
            </TabPane>
            <TabPane label="饼图">
                <Chart :config="config"></Chart>
            </TabPane>
        </Tabs>
        <InputItem placeholder="that is very good" label="测试"/>
        <Group>
            <InputItem placeholder="that is very good" label="测试测试测试"/>
            <SelectItem placeholder="that is very good" label="测试" :options="options"></SelectItem>
            <SelectItem placeholder="that is very good" label="测试" :options="options"></SelectItem>
        </Group>
        <Tabs>
            <TabPane label="aaaaa">
                <SelectItem placeholder="that is very good" label="测试1" :options="options"></SelectItem>
            </TabPane>
            <TabPane label="bbbbb">
                <SelectItem placeholder="that is very good" label="测试2" :options="options"></SelectItem>
            </TabPane>
            <TabPane label="cccc">
                <SelectItem placeholder="that is very good" label="测试3" :options="options"></SelectItem>
            </TabPane>
            <TabPane label="cccc">
                <SelectItem placeholder="that is very good" label="测试4" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试3" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试4" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试3" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试4" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试3" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试4" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试3" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试4" :options="options"></SelectItem>
                <SelectItem placeholder="that is very good" label="测试3" :options="options"></SelectItem>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import InputItem from './components/input';
import SelectItem from './components/select';
import Group from './components/group';
import Chart from './components/chart';
import Tabs from './components/tabs';
import Popup from './components/popup';
import PopupHeader from './components/popup-header';

export default {
    name: 'App',
    data() {
        return {
            a: true,
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
        Popup,
        InputItem,
        SelectItem,
        Tabs,
        TabPane: Tabs.Pane,
        Group,
        Chart,
        PopupHeader
    },
    methods: {
    	hide() {
    		this.a = false;
    	}
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
