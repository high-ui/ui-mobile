<template>
	<canvas :class="chartClasses" :id="chartId">
	</canvas>
</template>
<script>
	import UUID from 'uuid';
	import F2 from '@antv/f2';
	import ChartUtils from './ChartUtils.js';

	const cssPrefix = 'ui';
	const rowPrefix = 'ui-row';
	const prefixCls = 'ui-chart';

	export default {
		name: 'Chart',
		data() {
			return {
				chartId: UUID.v1()
			}
		},
		props: {
			config: {
				type: Object,
				required: true
			}
		},
		computed: {
			chartClasses() {
				return [
					`${rowPrefix}`,
					`${prefixCls}`
				];
			}
		},
		watch:{
			data(newVal, oldVal) {
				this.chart.rebuild(newVal);
			}
		},
		methods: {
		},
		mounted() {
			this.chart = ChartUtils.build(this.chartId, this.config);
			this.data = [{
				genre: 'Sports',
				sold: 275
			}, {
				genre: 'Strategy',
				sold: 115
			}, {
				genre: 'Action',
				sold: 120
			}, {
				genre: 'Shooter',
				sold: 350
			}, {
				genre: 'Other',
				sold: 150
			}, ];

			this.chart.rebuild(this.data);
		}
	}
</script>
<style lang="less">
	@import "../../style/themes/default.less";
	@row-prefix-cls: ~"@{css-prefix}-row";
	@chart-prefix-cls: ~"@{css-prefix}-chart";

	.@{chart-prefix-cls} {
		width: 100%;
		background-color: @fill-base;
		height: 250px;
	}

</style>