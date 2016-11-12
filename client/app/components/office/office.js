import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import OfficeMenu from './menu/office-menu';

import { changeOwnerData } from '../../actions/owner-actions';

class Office extends React.Component {

    constructor(props){
        super(props);
        this.changeOwnerData = this.changeOwnerData.bind(this);
    }

    changeOwnerData(data){
        this.props.changeOwnerData(data);
    }

    render(){
        const owner = this.props.owner.owner;

        const ownerNotFound = (
            <div className='office-page'>
                You must login or registration!
            </div>
        );

        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                owner: owner,
                changeOwnerData: this.changeOwnerData
            })
        );

        const ownerInfo = (
            <div className='office-page'>
                <OfficeMenu />
                <div className='office-content'>{ childrenWithProps }</div>
            </div>

        );

        return(
            (isEmpty(owner)) ? ownerNotFound : ownerInfo
        );
    }
}

function mapStateToProps(state){
    return {
        owner: state.owner
    }
}

export default connect(mapStateToProps, { changeOwnerData })(Office);