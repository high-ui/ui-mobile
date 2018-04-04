import F2 from '@antv/f2';
import Geometry from './Geometry.js';

class Interval extends Geometry {
	constructor(id, config) {
		super(id, config);
	};

	init() {
		this.chart = new F2.Chart({
			id: this.id,
			pixelRatio: window.devicePixelRatio
		});
	};

	rebuild(data) {
		this.chart.clear();
		this.chart.source(data);
		this.chart.interval().position(this.config.position).color(this.config.color);
		this.chart.render();
	};
}
export default Interval;