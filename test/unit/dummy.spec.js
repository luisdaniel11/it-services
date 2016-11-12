describe('Dummy test suite', () => {

    it('should pass', () => {
        let value = 'foo';
        expect(value).toBe('foo');
        expect(value).not.toBe('bar');
    });
});

