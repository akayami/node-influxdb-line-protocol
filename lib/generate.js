module.exports = class {
	
	constructor(measurement) {
		this.measurement = measurement;
		this.tags = {};
		this.fields = {};
		this.stamp = undefined;
	}
	
	tag(key, value) {
		this.tags[key] = value;
	}
	
	field(key, value) {
		this.fields[key] = value;
	}
	
	timestamp(t) {
		this.nanotimestamp(t * 1000 );
	}
	
	nanotimestamp(t) {
		this.stamp = t;
	}
	
	toString() {
		if(Object.keys(this.fields).length === 0) {
			throw new Error('At least one field is required.');
		}
		const measurement = [this.measurement];
		if(Object.keys(this.tags).length > 0) {
			measurement.push(this.serializePairs(this.tags));
		}
		
		const core = [measurement.join(','), this.serializePairs(this.fields)];
		if(this.stamp) {
			core.push(this.stamp);
		}
		return core.join(' ');
	}
	
	serializePairs(pairs) {
		const keys = Object.keys(pairs);
		const sets = [];
		for(let i = 0; i < keys.length; i++) {
			sets.push(keys[i] + '=' + pairs[keys[i]]);
		}
		return sets.join(',');
	}
};