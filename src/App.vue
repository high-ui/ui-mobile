<template>
    <div id="app">
    	<picker :data='year6' v-model='year1' @on-change='change'></picker>
        <div>{{year7Value}}</div>
        <picker :data='year7' :fixed-columns="2" :columns=3 v-model='year7Value' @on-change='change' ref="picker1"></picker>
        <Picker :data="years" v-model='year1'>
            
        </Picker>
        <Picker :data="years" v-model='year1'>
            
        </Picker>
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
import Picker from './components/picker';

let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}

export default {
    name: 'App',
    data() {
        return {
			years: [years],
			year1: [''],
			a: false,
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
			}],
			year7: [{
				name: '中国',
				value: 'china',
				parent: 0
			}, {
				name: '美国',
				value: 'USA',
				parent: 0
			}, {
				name: '广东',
				value: 'china001',
				parent: 'china'
			}, {
				name: '广西',
				value: 'china002',
				parent: 'china'
			}, {
				name: '美国001',
				value: 'usa001',
				parent: 'USA'
			}, {
				name: '美国002',
				value: 'usa002',
				parent: 'USA'
			}, {
				name: '广州',
				value: 'gz',
				parent: 'china001'
			}, {
				name: '深圳',
				value: 'sz',
				parent: 'china001'
			}, {
				name: '广西001',
				value: 'gz',
				parent: 'china002'
			}, {
				name: '广西002',
				value: 'sz',
				parent: 'china002'
			}, {
				name: '美国001_001',
				value: '0003',
				parent: 'usa001'
			}, {
				name: '美国001_002',
				value: '0004',
				parent: 'usa001'
			}, {
				name: '美国002_001',
				value: '0005',
				parent: 'usa002'
			}, {
				name: '美国002_002',
				value: '0006',
				parent: 'usa002'
			}],
			year7Value: [],
			year8Value: [],
			year6: [
				['你', '我', '他'],
				['you', 'I', 'him'],
				['ni', 'wo', 'ta'],
				[1, 2, 3, 4, 5],
				[5, 4, 3, 2, 1]
			]
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
        PopupHeader,
        Picker
    },
    methods: {
    	hide() {
    		this.a = false;
    	},

    	change (value) {
      		console.log('new Value', value)
    	},
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
