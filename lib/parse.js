module.exports = class {
	
	constructor(message) {
		const items = message.split(' ');
		const [measurement, ...tags] = items[0].split(',');
		this.measurement = measurement;
		this.tags = {};
		this.fields = {};
		tags.forEach((v)=> {
			const pair = v.split('=');
			this.tags[pair[0]] = pair[1];
		});
		items[1].split(',').forEach((v) => {
			const pair = v.split('=');
			this.fields[pair[0]] = pair[1];
		});
		if(items[2]) {
			this.stamp = items[2] * 1;
		}
	}
	
	getTags() {
		return this.tags;
	}
	
	getFields() {
		return this.fields;
	}
	
	getStamp() {
		return this.stamp;
	}
};