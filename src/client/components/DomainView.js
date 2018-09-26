import React ,{Component} from 'react';
import "react-table/react-table.css";
import Capability from './Capability';
import PropTypes from 'prop-types';
import { Grid, Popup ,Card} from 'semantic-ui-react'

export default class DomainView extends Component {

    static propTypes = {
        domains: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            capabilities: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                order: PropTypes.number.isRequired,
                id: PropTypes.string
            })),
            color: PropTypes.string
        })).isRequired
    }

    getCapability(capabilities, count) {
        if (capabilities.length >= count) {
            return capabilities.find((capability) => capability.order === count)
        } else {
            return null;
        }
    }

    allValuesAreNull(arr) {
        return arr.every(val => val == null)
    }

    validHex(hex) {
        var regex = /#([a-f0-9]{3}){1,2}\b/i;
        return regex.test(hex);
    }

    // Transpose capabilities
    reMapCapabilities(domains) {
        const defaultDomainColor = "#AAB7B8";
        let count = 1;
        let capabilities_dict = {};
        let capabilities_row = [];
        while (true) {
            capabilities_row = [];
            for (var index in domains) {
                let capabilities = domains[index].capabilities;
                let color = domains[index].color;
                color = color && this.validHex(color) ? color : defaultDomainColor;
                domains[index].color = color;
                let capability = this.getCapability(capabilities, count)
                if (capability) {
                    capability['color'] = color
                }
                capabilities_row.push(capability)
            }

            if (this.allValuesAreNull(capabilities_row)) {
                break;
            }

            capabilities_dict[count] = capabilities_row
            count++;
        }
        return capabilities_dict
    }

    render(){
        const { domains } = this.props
        const capabilities = this.reMapCapabilities(domains)
        return (
            <Grid columns="equal">
                {/* Map all domains */}
                <Grid.Row>
                {
                    domains.map((domain, index) => {
                        return (
                        <Grid.Column key={ index }>
                            <Popup
                                trigger={
                                    <Card className='system-card'>
                                        <Card.Content className="domain-name system-card-header" header={domain.name } style={{ backgroundColor: domain.color }} />
                                    </Card>
                                }
                                content={domain.description}
                                hideOnScroll
                                />
                        </Grid.Column>)
                    })
                }
                </Grid.Row>
                {/* Map all capabilities */}
                {
                    Object.keys(capabilities).map((row_index, index) => {
                        return (<Grid.Row key={ index }>
                        {
                            capabilities[row_index].map((capability, index) => {
                                return (<Grid.Column key={ index }>
                                    {
                                        capability ? (
                                            <Capability {...capability} />
                                        ) : (null)
                                    }
                                </Grid.Column>)
                            })
                        }
                        </Grid.Row>)
                    })
                }
            </Grid>
        )
    }
}
