<template>
	<div :class="tabsClasses">
		<div :class="tabPaneClasses">
			<span :class="tabCls(item)" :style="tabStyle" v-for="(item, index) in navList" @click="handleChange(index)">{{item.label}}</span>
		</div>
		<div><slot></slot></div>
	</div>
</template>
<script>
	const cssPrefix = 'ui';
	const rowPrefix = 'ui-row'
	const prefixCls = 'ui-tabs';

	export default {
		name: 'Tabs',
		data() {
			return {
				activeKey: this.value,
				navList: []
			}
		},
		props: {
			value: {
                type: [String, Number]
            }
		},
		computed: {
			tabsClasses() {
				return [
					`${rowPrefix}`,
					`${prefixCls}`
				];
			},

			tabPaneClasses() {
				return [
					`${prefixCls}-tab-header`
				];
			},

			tabStyle() {
				return {
					width: (100 / this.navList.length) + '%'
				}
			}
		},
		methods: {
			getTabs () {
                return this.$children.filter(item => item.$options.name === 'TabPane');
            },

			tabCls(item) {
				return [
					`${prefixCls}-tab`, {
						// [`${prefixCls}-tab-disabled`]: item.disabled,
						[`${prefixCls}-tab-active`]: item.name === this.activeKey
					}
				];
			},
			handleChange(index) {
				const nav = this.navList[index];
				this.activeKey = nav.name;

				this.$emit('input', nav.name);
				this.$emit('on-click', nav.name);
				this.showTab(index);
			},

			showTab(index) {
				this.getTabs().forEach((pane, idx) => {
					if (idx === index) {
						pane.show = true;
					} else {
						pane.show = false;
					}
				});	
			}
		},
		mounted() {
			this.navList = [];
			this.getTabs().forEach((pane, index) => {
				this.navList.push({
					label: pane.label,
					name: pane.currentName || index
				});

				if (!pane.currentName) {
					pane.currentName = index;
				}

               	if (index === 0) {
                	if (!this.activeKey) {
                		this.activeKey = pane.currentName || index;
                	}
              	}
			});

			this.showTab(0);
		}
	}
</script>
<style lang="less">
	@import "../../style/themes/default.less";
	@row-prefix-cls: ~"@{css-prefix}-row";
	@tabs-prefix-cls: ~"@{css-prefix}-tabs";

	.@{tabs-prefix-cls} {
		&-tab {
			text-align: center;
			background-color: @fill-base;
			height: 30px;
			line-height: 30px;
			display: inline-block;
			cursor: pointer;
		}

		&-tab-header {
			background-color: @fill-base;
		}

		&-tab-active {
			color: @color-link;
			border-bottom: 2px solid @color-link;
		}
	}
</style>