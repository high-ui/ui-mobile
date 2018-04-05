<template>
	<div :class="groupClasses">
		<div v-if="showTitle"><span>{{title}}</span><a>+</a></div>
		<slot></slot>
	</div>
</template>
<script>
	const cssPrefix = 'ui';
	const rowPrefix = 'ui-row'
	const prefixCls = 'ui-group';

	export default {
		name: 'Group',
		data() {
			return {
			}
		},
		props: {
			multiRow: {
				type: Boolean,
				default: false
			},
			title: {
				type: String
			}
		},
		computed: {
			groupClasses() {
				return [
					`${rowPrefix}`,
					`${prefixCls}`
				];
			},
			showTitle() {
				return !!this.title
			}
		},
		methods: {
		}
	}
</script>
<style lang="less">
	@import "../../style/themes/default.less";
	@row-prefix-cls: ~"@{css-prefix}-row";
	@group-prefix-cls: ~"@{css-prefix}-group";

	.@{group-prefix-cls} {
		.@{row-prefix-cls} {
			margin-bottom: 0;
		}

		.@{row-prefix-cls}:after {
			content: "";
    		width: 100%;
    		border-bottom: 1px solid @fill-body;
    		position: absolute;
		}
	}
</style>