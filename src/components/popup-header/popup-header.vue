<template>
 	<div class="ui-popup-header" :class="showBottomBorder ? 'ui-1px-b' : ''">
    	<div class="ui-popup-header-left" @click="$emit('on-click-left')">
      		<slot name="left-text">{{ leftText }}</slot>
    	</div>
    	<div class="ui-popup-header-title">
      		<slot name="title">{{ title }}</slot>
    	</div>
    	<div class="ui-popup-header-right" @click="$emit('on-click-right')">
      		<slot name="right-text">{{ rightText }}</slot>
    	</div>
  	</div>
</template>

<script>
export default {
  	name: 'popup-header',
  	props: {
    	leftText: String,
    	rightText: String,
    	title: String,
    	showBottomBorder: {
      		type: Boolean,
      		default: true
    	}
  	}
}
</script>

<style lang="less">
	.ui-popup-header {
  		display: flex;
  		height: 24px;
  		line-height: 24px;
  		font-size: 12px;
  		background-color: #fff;
	}

	.ui-popup-header-title {
  		flex: 1;
  		text-align: center;
  		color:#000;
	}

	.ui-popup-header-left {
  		padding-left: 10px;
  		color: #000;
	}

	.ui-popup-header-right {
  		padding-right: 10px;
  		color: #000;
	}
	
	.ui-popup-header.ui-1px-b {
  		border-bottom: 1px solid #D9D9D9;
	}
</style>
