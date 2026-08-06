import React, { useState } from 'react';

const ShortcutPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    const togglePopup = () => {
        setIsVisible(!isVisible);
    };

    const handleClickOutside = (e) => {
        if (isVisible && !e.target.closest('.popup')) {
            setIsVisible(false);
        }
    };
    return (
        <div>
            <button className='btn' onClick={() => togglePopup()}>?</button>
            {isVisible && (
                <div className="popup" style={{ margin: '35px 0',background: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                    <button onClick={togglePopup} style={{  margin: '5px',cursor: 'pointer' }}>X</button>
                    skróty klawiaturowe są od pierwszej litery ostatniego wyrazy w przyciskach (działają tylko gdy jeden z inputów jest podświetlony)
                </div>
            )}
        </div>
    );
};
export default ShortcutPopup;
