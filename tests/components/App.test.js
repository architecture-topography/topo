import React from 'react';
import ReactDOM from 'react-dom';

import App from '../../src/client/components/App';

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

describe('<App />', () => {

    it('should render without crashing', () => {
        const div = document.createElement('div');
        const wrapper = ReactDOM.render(<App config={config}/>, div);
        expect(wrapper.props.config).toEqual(config);

        ReactDOM.unmountComponentAtNode(div);
    });
});
