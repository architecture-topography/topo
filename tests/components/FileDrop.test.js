import React from 'react';
import ReactDOM from 'react-dom';

import FileDrop from '../../src/client/components/FileDrop';

import {mount} from 'enzyme';
import fileParser from '../../src/client/io/fileParser';

jest.mock('../../src/client/io/fileParser');

const acceptedFileMock = {"name": "Accepted 1"};
const rejectedFileMock = {"name": "Rejected 1"};
const malformedJsonFileMock = "NOT_IN_JSON_FORMAT";

const noop = () => {};

describe('<FileDrop />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FileDrop updateSystemMapping={noop} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    describe('onDrop', () => {
        describe('valid Json files', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(<FileDrop updateSystemMapping={noop} />);
                fileParser.mockImplementation(() => Promise.resolve({accepted: acceptedFileMock}))
            });

            it('should accept valid JSON files', async () => {
                await wrapper.instance().onDrop([acceptedFileMock], []);

                expect(fileParser).toHaveBeenCalled();
                expect(wrapper.state().acceptedFiles).toEqual([acceptedFileMock]);
                expect(wrapper.state().rejectedFiles).toEqual([]);
            });
        });

        describe('invalid Json files', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(<FileDrop updateSystemMapping={noop} />);
                fileParser.mockImplementation(() => Promise.resolve({rejected: malformedJsonFileMock}));
            });

            it('should reject malformed JSON file', async () => {
                const acceptedFiles = [acceptedFileMock];

                await wrapper.instance().onDrop(acceptedFiles, []);

                expect(fileParser).toHaveBeenCalled();
                expect(wrapper.state().acceptedFiles).toEqual([]);
                expect(wrapper.state().rejectedFiles).toEqual([malformedJsonFileMock]);
            });

            it('should reject invalid JSON file extension', async () => {
                const rejectedFiles = [rejectedFileMock];

                await wrapper.instance().onDrop([], rejectedFiles);

                expect(fileParser).not.toHaveBeenCalled();
                expect(wrapper.state().acceptedFiles).toEqual([]);
                expect(wrapper.state().rejectedFiles).toEqual([rejectedFileMock]);
            });
        });

        describe('valid and invalid Json files', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(<FileDrop updateSystemMapping={noop} />);
                fileParser.mockImplementation(() => Promise.resolve({accepted: acceptedFileMock}))
            });

            it('should accept valid and reject invalid JSON files', async () => {
                await wrapper.instance().onDrop([acceptedFileMock], [rejectedFileMock]);

                expect(fileParser).toHaveBeenCalled();
                expect(wrapper.state().acceptedFiles).toEqual([acceptedFileMock]);
                expect(wrapper.state().rejectedFiles).toEqual([rejectedFileMock]);
            });
        });
    });
});
