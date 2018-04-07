<template>
	<div v-show="show" :class="popupClasses">
		<slot></slot>
	</div>
</template>
<script>
	import Popup from './popup.js';

	const prefixCls = 'ui-popup';

	export default {
		name: 'Group',
		data() {
			return {
				show: this.value
			}
		},
		props: {
			value: Boolean,
			hideOnBlur: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				this.$emit('input', val);
					console.log('hide');
				if (val) {
					this.popup && this.popup.show();
				} else {
					this.popup.hide();
				}
			}
		},
		computed: {
			popupMaskClasses() {
				return [
					`${prefixCls}-mask`
				];
			},
			popupClasses() {
				return [
					`${prefixCls}`
				];
			}
		},
		methods: {},
		mounted() {
			this.$nextTick(() => {
				const that = this;
				this.popup = new Popup({
					hideOnBlur: that.hideOnBlur,
					container: that.$el,
					onOpen() {
						that.show = true;
					},
					onClose() {
						that.show = false;
					}
				});

				if(this.value){
					this.popup.show();
				}
			});
		}
	}
</script>
<style lang="less">
	@import "../../style/themes/default.less";
	@popup-prefix-cls: ~"@{css-prefix}-popup";

	.@{popup-prefix-cls} {
		height: 50%;
    	position: absolute;
    	width: 100%;
    	background-color: #fff;
    	bottom: 0;
    	z-index: 9999;

    	&-mask {
    		position: relative;
    	}
	}

	.ui-mask {
		position: absolute;
    	top: 0;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	background-color: #ccc;
    	opacity: 0.5;
    	z-index: -1;
	}
</style>