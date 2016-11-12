import React from 'react';
import { Table } from 'react-bootstrap';

import OfficeChange from '../change-owner-data/change-data';

class OwnerData extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const owner = this.props.owner;
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{ owner.name }</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>{ owner.role }</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{ owner.gender }</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{ owner.description }</td>
                    </tr>
                    </tbody>
                </Table>
                <OfficeChange owner={ owner } actions={ { change: this.props.changeOwnerData } } />
            </div>
        );
    }
}

export default OwnerData;