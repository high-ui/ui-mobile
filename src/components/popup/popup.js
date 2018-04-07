const passiveSupported = require('../../libs/passive_supported')

class Popup {
	constructor(options) {
		this.mask = this.createMask();
		this.container = options.container;

		document.body.appendChild(this.container);

		this.params = {
			hideOnBlur: options.hideOnBlur,
			onOpen: options.onOpen || function() {},
			onClose: options.onClose || function() {}
		};
	}

	createMask() {
		let mask = document.getElementById('id-ui-mask');

		if (!!!mask) {
			mask = document.createElement('a');

			mask.id = 'id-ui-mask';
			mask.className = 'ui-mask';
			mask.href = 'javascript:void(0)';

			document.body.appendChild(mask);
		}

		this.onClickMask = function() {
			this.params.hideOnBlur && this.params.onClose();
		};

		mask.addEventListener('click', this.onClickMask.bind(this), false)
		mask.addEventListener('touchmove', e => e.preventDefault(), passiveSupported ? {
			passive: false
		} : false)

		return mask;
	}

	show() {
		this.mask.style['zIndex'] = 500
	}

	hide() {
		this.mask.style['zIndex'] = -1
	}
}

export default Popup;