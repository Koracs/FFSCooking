//https://www.fullstacklabs.co/blog/building-a-responsive-filter-component-on-react
import React, {useEffect, useRef, useState} from "react";

export default function Filter({ children, onApply, label }) {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(undefined);
    const buttonRef = useRef(undefined);

    useEffect(() => {
        const handleClickOutside = event => {
            const isDropdownClick = dropdownRef.current && dropdownRef.current.contains(event.target);
            const isButtonClick = buttonRef.current && buttonRef.current.contains(event.target);

            if (isDropdownClick || isButtonClick) {
                // If the ref is not defined or the user clicked on the menu, do nothing.
                return;
            }

            // Otherwise we close the menu
            setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);

        /* Event cleanup */
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, buttonRef]);


    function handleApply(event) {
        setIsOpen(false);
        onApply(event)
    }

    function handleCancel() {
        setIsOpen(false);
    }

    return (
        <>
            <div className="filter">
                <button onClick={() => setIsOpen(!isOpen)} className="button filter__button">{label}</button>
                {
                    isOpen &&
                    <div ref={dropdownRef} className="filter__dropdown">
                        <div style={{paddingtop: "3rem", paddingbottom: "3rem", textAlign: "left"}}>
                            {children}
                        </div>

                        <div className="filter__dropdown__actions">
                            <button onClick={handleCancel} className="filter__dropdown__actions_cancel">Cancel</button>
                            <button onClick={handleApply} className="filter__dropdown__actions_apply">Apply</button>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
