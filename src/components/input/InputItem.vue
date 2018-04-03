<template>
	<div :class="wrapClasses">
		<i :class="iconClasses" v-if="clearable" @click="handleClear"></i>
		<input 
			ref="input" 
			:class="inputClasses"
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
</template>
<script>
	const cssPrefix = 'ui';
	const prefixCls = `${cssPrefix}-input`;

	export default {
		name: 'InputItem',
		data() {
			return {
				currentValue: this.value,
				prefixCls: prefixCls,
				prepend: true
			}
		},
		props: {
			value: {
				type: [String, Number],
				default: ''
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
			wrapClasses() {
				return [
					`${prefixCls}-wrapper`
				];
			},

			inputClasses() {
				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-disabled`]: this.disabled
					}
				];
			},

			iconClasses() {
				return [
					`${cssPrefix}-icon`,
					{
						[`${prefixCls}-icon-clear`]: this.clearable
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
				this.$emit('on-change', event);
			},
            handleClear () {
                const e = { target: { value: '' } };
                this.$emit('input', '');
                this.setCurrentValue('');
                this.$emit('on-change', e);
            }
		}
	}
</script>
<style lang="less">
	@css-prefix: "ui";
	@input-prefix-cls: ~"@{css-prefix}-input";
	@icon-cls: ~"@{css-prefix}-icon";

	.@{icon-cls} {
    	width: 16px;
    	height: 16px;
    	display: none;
    	border-radius: 50%;
    	position: absolute;
    	top: 8px;
    	right: 4px;
    	background-color: #ddd;
    	background-image: url(../../assets/clear.svg);

    	&:hover{
    		background-color: #108ee9;
    	}
	}

	.@{input-prefix-cls} {
		caret-color:#108ee9;
		appearance: none;
		width: 100%;
		height: 32px;
		line-height: 32px;
		padding: 2px 0;
		border: 0;
		background-color: transparent;
		box-sizing: border-box;
		outline: none;

		&-wrapper {
			display: inline-block;
			width: 100%;
			position: relative;
			vertical-align: middle;
			line-height: normal;
		}

		&-wrapper:hover &-icon-clear {
			display: inline-block;
		}
	}
</style>