import React from 'react';
import classnames from 'classnames';

const InputRadio = ({ label, labelClass, onChange, name, data, error, elementWrapperClass, checked }) => {
    return(
        <div className={classnames('form-group', { 'has-error': error })}>
            <label className={ classnames('control-label', labelClass) }>{ label }</label>
            <div className={ elementWrapperClass }>
                { data.map((val, k) => {
                    return <div key={ k } className="radio">
                        <label>
                            <input
                                type='radio'
                                onChange={ onChange }
                                name={ name }
                                value={ val.name }
                                checked={ checked(name) === val.name }
                                />
                            {val.label}
                        </label>
                    </div>
                }) }
                {error && <span className="help-block">{ error }</span>}
            </div>
        </div>
    );
};

InputRadio.propTypes = {
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
};

InputRadio.defaultProps = {
    elementWrapperClass: '',
    labelClass: ''
};

export default InputRadio;