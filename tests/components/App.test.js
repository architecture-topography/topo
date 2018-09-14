import React from 'react';
import ReactDOM from 'react-dom';

import App from '../../src/client/components/App';

import {mount} from 'enzyme';
import fileParser from '../../src/client/io/fileParser';

jest.mock('../../src/client/io/fileParser');

const config = {
    "Platforms": [
        {
            "name": "Platform 1",
            "domains": [
                {
                    "name": "Domain 1",
                    "description": "Description 1",
                    "capabilities": [
                        {"name": "Capability 1", "order": 1}
                    ]
                }
            ]
        }
    ],
    "Others": []
};

const acceptedFileMock = {"name": "Accepted 1"};
const rejectedFileMock = {"name": "Rejected 1"};
const malformedJsonFileMock = "NOT_IN_JSON_FORMAT";

describe('<App />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', () => {
        const div = document.createElement('div');
        const wrapper = ReactDOM.render(<App config={config}/>, div);
        expect(wrapper.props.config).toEqual(config);

        ReactDOM.unmountComponentAtNode(div);
    });

    describe('onDrop', () => {
        describe('valid Json files', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(<App config={config}/>);
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
                wrapper = mount(<App config={config}/>);
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
                wrapper = mount(<App config={config}/>);
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
