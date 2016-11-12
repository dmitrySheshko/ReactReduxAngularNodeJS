import React from 'react';
import classnames from 'classnames';

const InputText = ({ label, labelClass, onChange, type, name, value, error, elementWrapperClass }) => {
    return(
        <div className={classnames('form-group', { 'has-error': error })}>
            <label className={ classnames('control-label', labelClass) }>{ label }</label>
            <div className={ elementWrapperClass }>
                <input
                    type={ type }
                    onChange={ onChange }
                    className="form-control"
                    name={ name }
                    value={ value }
                    />
                {error && <span className="help-block">{ error }</span>}
            </div>
        </div>
    );
};

InputText.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

InputText.defaultProps = {
    type: 'text',
    elementWrapperClass: '',
    labelClass: ''
};

export default InputText;