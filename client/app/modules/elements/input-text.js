import React from 'react';
import classnames from 'classnames';

const InputText = ({ label, labelClass, onChange, type, name, value, error, elementWrapperClass, placeholder }) => {
    return(
        <div className={classnames('form-group', { 'has-error': error })}>
            { label ? <label className={ classnames('control-label', labelClass) }>{ label }</label> : null }
            <div className={ elementWrapperClass }>
                <input
                    type={ type }
                    onChange={ onChange }
                    className="form-control"
                    name={ name }
                    value={ value }
                    placeholder={ placeholder }
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
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

InputText.defaultProps = {
    type: 'text',
    elementWrapperClass: '',
    labelClass: '',
    placeholder: ''
};

export default InputText;