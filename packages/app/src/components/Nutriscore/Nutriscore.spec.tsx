import Nutriscore from './Nutriscore';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Nutriscore', () => {
    it('should be rendered ok when the "a" score is given', () => {
        const tree = renderer.create(<Nutriscore letter="a" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should be rendered ok when the "a" score is given', () => {
        const tree = renderer.create(<Nutriscore letter="b" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should be rendered ok when the "a" score is given', () => {
        const tree = renderer.create(<Nutriscore letter="c" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should be rendered ok when the "a" score is given', () => {
        const tree = renderer.create(<Nutriscore letter="d" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should be rendered ok when the "a" score is given', () => {
        const tree = renderer.create(<Nutriscore letter="e" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});