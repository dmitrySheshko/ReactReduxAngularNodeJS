import React from 'react';
import classnames from 'classnames';

const Textarea = ({ label, labelClass, onChange, name, error, elementWrapperClass, value }) => {
    return(
        <div className={classnames('form-group', { 'has-error': error })}>
            <label className={ classnames('control-label', labelClass) }>{ label }</label>
            <div className={ elementWrapperClass }>
                <textarea onChange={ onChange } className="form-control" name={ name } rows="2" value={ value }></textarea>
                {error && <span className="help-block">{ error }</span>}
            </div>

        </div>
    );
};

Textarea.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
};

Textarea.defaultProps = {
    elementWrapperClass: '',
    labelClass: ''
};

export default Textarea;