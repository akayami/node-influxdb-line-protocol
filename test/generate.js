const {should, expect, assert} = require('chai');

const generate = require('../index').generate;

describe('Generation tests', () => {
	
	it('Generate basic', () => {
		const p = new generate('measurement');
		p.tag('tag', 'tagval');
		p.field('field', 'fieldval');
		const out = p.toString();
		expect(out).to.be.a.string;
		expect(out).to.equal('measurement,tag=tagval field=fieldval');
	});
	
	it('Generate with timestamp', () => {
		const d = new Date('2019-12-23T15:23:34');
		const p = new generate('measurement');
		p.tag('tag', 'tagval');
		p.field('field', 'fieldval');
		p.timestamp(d.getTime());
		const out = p.toString();
		expect(out).to.be.a.string;
		expect(out).to.equal('measurement,tag=tagval field=fieldval ' + d.getTime() * 1000);
	});
	
	it('Generate with nano timestamp', () => {
		const d = new Date('2019-12-23T15:23:34');
		const p = new generate('measurement');
		p.tag('tag', 'tagval');
		p.field('field', 'fieldval');
		p.nanotimestamp(d.getTime() * 1000);
		const out = p.toString();
		expect(out).to.be.a.string;
		expect(out).to.equal('measurement,tag=tagval field=fieldval ' + d.getTime() * 1000);
	});
	
	it('Generate minimal', () => {
		const p = new generate('measurement');
		p.field('field', 'fieldval');
		const out = p.toString();
		expect(out).to.be.a.string;
		expect(out).to.equal('measurement field=fieldval');
	});
	
	it('Missing fields', () => {
		const p = new generate('measurement');
		expect(() => {
			p.toString();
		}).to.throw('At least one field is required.');
	});
});