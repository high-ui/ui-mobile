<template>
	<div :class="switchClasses">
		<span :class="labelClasses" :style="labelStyles">{{label}}</span>
		<span
        	tabindex="0"
        	:class="wrapClasses"
        	@click="toggle"
        	@keydown.space="toggle"
    	>
        	<input type="hidden" :name="name" :value="currentValue">
        	<span :class="innerClasses">
            	<slot name="open" v-if="currentValue === trueValue"></slot>
            	<slot name="close" v-if="currentValue === falseValue"></slot>
        	</span>
    	</span>
	</div>
</template>

<script>
    // import Emitter from '../../mixins/emitter';
	const rowPrefix = 'ui-row'
    const prefixCls = 'ui-switch';

    export default {
        name: 'SwitchItem',
        // mixins: [ Emitter ],
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            label:{
				type: String,
				default: ''
			},
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            }
        },
        data () {
            return {
                currentValue: this.value
            };
        },
        computed: {
			switchClasses() {
				return [
					`${rowPrefix}`,
					`${prefixCls}`
				]; 
			},
			wrapClasses() {
				return [
					`${prefixCls}-wrapper`, {
						[`${prefixCls}-wrapper-checked`]: this.currentValue === this.trueValue,
						[`${prefixCls}-wrapper-disabled`]: this.disabled
					}
				];
			},
			innerClasses() {
				return `${prefixCls}-wrapper-inner`;
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
			}
        },
        methods: {
            toggle (event) {
                event.preventDefault();
                if (this.disabled) {
                    return false;
                }


                const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;


                this.currentValue = checked;
                this.$emit('input', checked);
                this.$emit('on-change', checked);

                // this.dispatch('FormItem', 'on-form-change', checked);
            }
        },
        watch: {
            value (val) {
                if (val !== this.trueValue && val !== this.falseValue) {
                    throw 'Value should be trueValue or falseValue.';
                }
                this.currentValue = val;
            }
        }
    };
</script>
<style lang="less">
	@import "../../style/themes/default.less";
	@import "../../styles/custom.less";
	@switch-prefix-cls: ~"@{css-prefix}-switch";

	.@{switch-prefix-cls} {
		background-color: @fill-base;
		height: @list-item-height-sm;
		line-height: @list-item-height-sm;
		font-size: @font-size-base;

		&-label {
			width: @input-label-width * 4;
			float: left;
			text-align: right;
		}
	}

	.@{switch-prefix-cls}-wrapper {
    	display: inline-block;
    	width: 48px;
    	height: 24px;
    	line-height: 22px;
    	border-radius: 24px;
    	vertical-align: middle;
    	border: 1px solid #ccc;
    	background-color: #ccc;
    	position: relative;
    	cursor: pointer;
    	user-select: none;
    	transition: all @transition-time @ease-in-out;
		float: right;
    	top: 4px;
    	right: 20px;

    	&-inner {
        	color: #fff;
        	font-size: @font-size-small;
        	position: absolute;
        	left: 25px;

        	i {
            	width: 12px;
            	height: 12px;
            	text-align: center;
        	}
    	}

    	&:after {
        	content: '';
        	width: 20px;
        	height: 20px;
        	border-radius: 20px;
        	background-color: #fff;
        	position: absolute;
        	left: 1px;
        	top: 1px;
        	cursor: pointer;
        	transition: left @transition-time @ease-in-out, width @transition-time @ease-in-out;
    	}

    	&:active:after {
        	width: 26px;
    	}

    	&:focus {
        	box-shadow: 0 0 0 2px fade(@primary-color, 20%);
        	outline: 0;
    	}

    	&:focus:hover {
        	box-shadow: none;
    	}

    	&-checked {
        	border-color: @primary-color;
        	background-color: @primary-color;

        	.@{switch-prefix-cls}-inner {
            	left: 8px;
        	}

        	&:after {
            	left: 25px;
        	}

        	&:active:after {
            	left: 19px;
        	}
    	}

    	&-disabled {
        	cursor: @cursor-disabled;
        	background: #f3f3f3;
        	border-color: #f3f3f3;

        	&:after {
            	background: #ccc;
            	cursor: not-allowed;
        	}

        	.@{switch-prefix-cls}-inner {
            	color: #ccc;
        	}
    	}
	}
</style>
