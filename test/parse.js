const {should, expect, assert} = require('chai');

const parse = require('../index').parse;

describe('Parsing tests', () => {
	
	it('Basic Parsing', () => {
		const p = new parse('measurement,tag=tagval,tag1=tagval1 field=fieldval,field1=fieldval1');
		expect(p.getTags()).to.be.an('object').to.have.keys(['tag', 'tag1']);
		expect(p.getTags()['tag']).equal('tagval');
		expect(p.getTags()['tag1']).equal('tagval1');
		expect(p.getFields()).to.be.an('object').to.have.keys(['field', 'field1']);
		expect(p.getFields()['field']).equal('fieldval');
		expect(p.getFields()['field1']).equal('fieldval1');
	});
	
	it('Needs to handle minimal setup', () => {
		const p = new parse('measurement field=fieldval');
		expect(p.getFields()).to.be.an('object').to.have.keys(['field']);
		expect(p.getFields()['field']).equal('fieldval');
	});
	
	it('Needs to handle timestamp', () => {
		const d = new Date('2019-12-23T15:23:34');
		const t = d.getTime() * 1000;
		const p = new parse('measurement field=fieldval ' + d.getTime() * 1000);
		expect(p.getFields()).to.be.an('object').to.have.keys(['field']);
		expect(p.getFields()['field']).equal('fieldval');
		expect(p.getStamp()).equal(d.getTime() * 1000);
	});
});