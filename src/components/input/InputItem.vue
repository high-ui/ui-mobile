<template>
	<div :class="inputClasses">
		<span :class="labelClasses" :style="labelStyles">{{label}}</span>
		<div :class="wrapClasses">
			<i :class="iconClasses" v-if="clearable" @click="handleClear"></i>
			<input 
				ref="input"
				:label="label"
				:type="type"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxlength"
				:readonly="readonly"
				:autofocus="autofocus"
				:value="currentValue"
				@input="handleInput"
				/>
		</div>
	</div>
</template>
<script>
	const cssPrefix = 'ui';
	const rowPrefix = 'ui-row'
	const prefixCls = 'ui-input';

	export default {
		name: 'InputItem',
		data() {
			return {
				currentValue: this.value,
				prefixCls: prefixCls
			}
		},
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			label:{
				type: String,
				default: ''
			},
			type: {
				type: String
			},
			clearable: {
				type: Boolean,
				default: true
			},
			placeholder: {
				type: String,
				default: ''
			},
			maxlength: {
				type: Number
			},
			disabled:{
				type: Boolean,
				default: false
			},
			autofocus: {
				type: Boolean,
				defualt: false
			},
			readonly: {
				type: Boolean,
				default: false
			}
		},
		computed: {


			inputClasses() {
				return [
					`${rowPrefix}`,
					`${prefixCls}`
				];
			},

			wrapClasses() {
				return [
					`${prefixCls}-wrapper`,
					{
						[`${prefixCls}-disabled`]: this.disabled
					}
				];
			},

			labelClasses() {
				return `${prefixCls}-label`;
			},

			labelStyles() {
				if (this.label.length > 4) {
					return {
						'line-height': '17px'
					}
				}
			},

			iconClasses() {
				return [
					`${cssPrefix}-icon`,
					{
						[`${prefixCls}-icon-clear`]: this.clearable && this.currentValue
					}
				];
			}
		},
		methods: {
			handleInput(event) {
				let value = event.target.value;
				if (this.number) {
					value = Number.isNaN(Number(value)) ? value : Number(value);
				}

				this.$emit('input', value);
				this.setCurrentValue(value);
				this.$emit('on-change', event);
			},
            handleClear () {
                const e = { target: { value: '' } };
                this.$emit('input', '');
                this.setCurrentValue('');
                this.$emit('on-change', e);
            },
            setCurrentValue(val) {
            	console.log(this.currentValue);
            	this.currentValue = val;
            }
		}
	}
</script>
<style lang="less">
	@import "../../style/themes/default.less";
	@row-prefix-cls: ~"@{css-prefix}-row";
	@input-prefix-cls: ~"@{css-prefix}-input";
	@icon-cls: ~"@{css-prefix}-icon";

	.@{row-prefix-cls} {
		margin-bottom: @v-spacing-sm;
	}
	.@{icon-cls} {
    	width: 16px;
    	height: 16px;
    	display: none;
    	border-radius: 50%;
    	position: absolute;
    	top: 8px;
    	right: 4px;
    	background-color: @color-icon-base;
    	background-image: url(../../assets/clear.svg);

    	&:hover{
    		background-color: @tag-color;
    	}
	}

	.@{input-prefix-cls} {
		background-color: @fill-base;
		height: @list-item-height-sm;
		line-height: @list-item-height-sm;
		font-size: @font-size-base;

		&-wrapper {	
			margin-left: 76 * @hd;
			margin-right: 6px;
			position: relative;
			vertical-align: middle;
		}

		&-wrapper:hover &-icon-clear {
			display: inline-block;
		}

		&-label {
			width: @input-label-width * 4;
			float: left;
			text-align: right;
		}

		input {
    		caret-color:@tag-color;
			appearance: none;
			width: 100%;
			border: 0;
			background-color: transparent;
			height: 32px;
			line-height: 32px;
			outline: none;
		}
	}
</style>