import Interval from './Interval.js';

class ChartUtils {
	static build(id, config) {
		return new Interval(id, config);
	}
}
export default ChartUtils;