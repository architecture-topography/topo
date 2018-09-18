import React ,{Component} from 'react';
import "react-table/react-table.css";
import Domain from './Domain';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react'

export default class DomainView extends Component {

    static propTypes = {
        domains: PropTypes.arrayOf(Domain).isRequired
    }

    render(){
        const { domains } = this.props
        return (
            <Grid>
                <Grid.Row columns={domains.length}>
                {
                    domains.map(domain => {
                        return <Grid.Column><Domain {...domain}/></Grid.Column>
                    })
                }
                </Grid.Row>
            </Grid>
        )
    }
}
