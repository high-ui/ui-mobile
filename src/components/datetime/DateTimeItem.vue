<template>
	<div :class="datetimeClasses"
  		data-cancel-text="取消"
  		data-confirm-text="确定">
		<span :class="labelClasses" :style="labelStyles">{{label}}</span>
		<div :class="wrapClasses">
			<i :class="iconClasses" v-if="clearable" @click="handleClear"></i>
			<i :class="iconIndicatorClasses"></i>
			<span class="ui-datetime-placeholder" v-if="!currentValue && placeholder">{{placeholder}}</span>
			<span class="ui-datetime-value" v-if="currentValue">{{ displayFormat ? displayFormat(currentValue) : currentValue }}</span>
		</div>
	</div>
</template>
<script>
	import UUID from 'uuid';
	import Picker from './datetimepicker';

	const cssPrefix = 'ui';
	const rowPrefix = 'ui-row'
	const prefixCls = 'ui-datetime';

	export default {
		name: 'DateTimeItem',
		data() {
			return {
				uuid: UUID.v1(),
				currentValue: this.value,
				prefixCls: prefixCls,
				currentShow: false,
				valid: true,
				errors: {}
			}
		},
		props: {
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
			format: {
				type: String,
				default: 'YYYY-MM-DD'
			},
			title: String,
			value: {
				type: String,
				default: ''
			},
			minYear: Number,
			maxYear: Number,
			confirmText: String,
			cancelText: String,
			clearText: String,
			yearRow: {
				type: String,
				default: '{value}'
			},
			monthRow: {
				type: String,
				default: '{value}'
			},
			dayRow: {
				type: String,
				default: '{value}'
			},
			hourRow: {
				type: String,
				default: '{value}'
			},
			minuteRow: {
				type: String,
				default: '{value}'
			},
			required: {
				type: Boolean,
				default: false
			},
			minHour: {
				type: Number,
				default: 0
			},
			maxHour: {
				type: Number,
				default: 23
			},
			startDate: {
				type: String,
				validator(val) {
					/* istanbul ignore if */
					if (process.env.NODE_ENV === 'development' && val && val.length !== 10) {
						console.error('[VUX] Datetime prop:start-date 必须为 YYYY-MM-DD 格式')
					}
					return val ? val.length === 10 : true
				}
			},
			endDate: {
				type: String,
				validator(val) {
					/* istanbul ignore if */
					if (process.env.NODE_ENV === 'development' && val && val.length !== 10) {
						console.error('[VUX] Datetime prop:end-date 必须为 YYYY-MM-DD 格式')
					}
					return val ? val.length === 10 : true
				}
			},
			valueTextAlign: String,
			displayFormat: Function,
			readonly: Boolean,
			hourList: Array,
			minuteList: Array,
			show: Boolean,
			defaultSelectedValue: String,
			computeHoursFunction: Function,
			computeDaysFunction: Function
		},
		computed: {
			datetimeClasses() {
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
			},

			iconIndicatorClasses(){
				return [
					`${cssPrefix}-icon`,
					`${prefixCls}-icon-indicator`
				];
			},

			pickerOptions() {
				const _this = this
				const options = {
					trigger: '#ui-datetime-' + this.uuid,
					format: this.format,
					value: this.currentValue,
					output: '.ui-datetime-value',
					confirmText: _this.getButtonText('confirm'),
					cancelText: _this.getButtonText('cancel'),
					clearText: _this.clearText,
					yearRow: this.yearRow,
					monthRow: this.monthRow,
					dayRow: this.dayRow,
					hourRow: this.hourRow,
					minuteRow: this.minuteRow,
					minHour: this.minHour,
					maxHour: this.maxHour,
					startDate: this.startDate,
					endDate: this.endDate,
					hourList: this.hourList,
					minuteList: this.minuteList,
					defaultSelectedValue: this.defaultSelectedValue,
					computeHoursFunction: this.computeHoursFunction,
					computeDaysFunction: this.computeDaysFunction,
					onSelect(type, val, wholeValue) {
						if (_this.picker && _this.picker.config.renderInline) {
							_this.$emit('input', wholeValue)
							_this.$emit('on-change', wholeValue)
						}
					},
					onConfirm(value) {
						_this.currentValue = value
					},
					onClear(value) {
						_this.$emit('on-clear', value)
					},
					onHide(type) {
						_this.currentShow = false
						_this.$emit('update:show', false)
						_this.validate()
						_this.$emit('on-hide', type)
						if (type === 'cancel') {
							_this.$emit('on-cancel')
						}
						if (type === 'confirm') {
							_this.$emit('on-confirm')
						}
					},
					onShow() {
						_this.currentShow = true
						_this.$emit('update:show', true)
						_this.$emit('on-show')
					}
				}
				if (this.minYear) {
					options.minYear = this.minYear
				}
				if (this.maxYear) {
					options.maxYear = this.maxYear
				}
				return options
			},
			firstError() {
				let key = Object.keys(this.errors)[0]
				return this.errors[key]
			},
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
            	this.currentValue = val;
            },
			getButtonText(type) {
				if (type === 'cancel' && this.cancelText) {
					return this.cancelText
				} else if (type === 'confirm' && this.confirmText) {
					return this.confirmText
				}
				return this.$el.getAttribute(`data-${type}-text`)
			},
			render() {
				this.$nextTick(() => {
					this.picker && this.picker.destroy()
					this.picker = new Picker(this.pickerOptions)
				})
			},
			validate() {
				if (!this.currentValue && this.required) {
					this.valid = false
					this.errors.required = '必填'
					return
				}
				this.valid = true
				this.errors = {}
			}

		},

		created() {
			this.isFirstSetValue = false;
		},

		mounted() {
			const uuid = this.uuid;
			this.$el.setAttribute('id', `ui-datetime-${uuid}`)
			if (!this.readonly) {
				this.$nextTick(() => {
					this.render()

					if (this.show) {
						this.$nextTick(() => {
							this.picker && this.picker.show(this.currentValue)
						})
					}
				})
			}
		},

		watch:{
			readonly(val) {
				if (val) {
					this.picker && this.picker.destroy()
				} else {
					this.render()
				}
			},
			show(val) {
				if (val === this.currentShow) return
				if (val) {
					this.picker && this.picker.show(this.currentValue)
				} else {
					this.picker && this.picker.hide(this.currentValue)
				}
			},
			currentValue(val, oldVal) {
				this.$emit('input', val)
				if (!this.isFirstSetValue) {
					this.isFirstSetValue = true
					oldVal && this.$emit('on-change', val)
				} else {
					this.$emit('on-change', val)
				}
				this.validate()
			},
			startDate() {
				this.render()
			},
			endDate() {
				this.render()
			},
			format(val) {
				if (this.currentValue) {
					this.currentValue = format(this.currentValue, val)
				}
				this.render()
			},
			value(val) {
				// do not force render when renderInline is true
				if (this.readonly || (this.picker && this.picker.config.renderInline)) {
					this.currentValue = val
					return
				}
				if (this.currentValue !== val) {
					this.currentValue = val
					this.render()
				}
			}
		},
		
		beforeDestroy () {
    		this.picker && this.picker.destroy()
  		}
	}
</script>
<style lang="less">
    @import './style.less';
	@import "../../style/themes/default.less";
	@row-prefix-cls: ~"@{css-prefix}-row";
	@datetime-prefix-cls: ~"@{css-prefix}-datetime";
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

    	&:hover{
    		background-color: @tag-color;
    	}
	}

	.@{datetime-prefix-cls} {
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

		&-icon-clear {
    		background-image: url(../../assets/clear.svg);
		}

		&-icon-indicator {
			background-image: url(../../assets/arrow-right.svg);
			display: inline-block !important;
			background-color: transparent !important;
		}

		&-wrapper:hover &-icon-clear {
			display: inline-block;
		}

		&-label {
			width: @input-label-width * 4;
			float: left;
			text-align: right;
		}

		&-placeholder {
			position: absolute;
    		right: 20px;
		}

		&-value {
			position: absolute;
    		right: 20px;
		}
	}
</style>