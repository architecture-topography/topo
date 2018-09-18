import React ,{Component} from 'react';
import "react-table/react-table.css";
import Domain from './Domain';
import PropTypes from 'prop-types';

export default class DomainView extends Component {

    static propTypes = {
        domains: PropTypes.arrayOf(Domain).isRequired
    }

    render(){
        const { domains } = this.props
        return (
            <div>
                {
                    domains.map(domain => <Domain domain={domain}/>)
                }
            </div>
        )
    }
}
