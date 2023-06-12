import { useState } from "react";
import Form from 'react-bootstrap/Form';

export const EditableTextInput = ({ value, callback, children }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            callback(inputValue);
            setIsEditing(false);
        }
    };

    return (
        <div className="editable-text-input">
            {isEditing ? (
                <Form.Control
                    autoFocus
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    onBlur={() => setIsEditing(false)}
                />
            ) : (
                <div onClick={() => setIsEditing(true)}>{children}</div>
            )}
        </div>
    );
}