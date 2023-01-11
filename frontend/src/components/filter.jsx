import React, {useEffect, useRef, useState} from "react";

export default function Filter({children, label}) {
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

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, buttonRef]);

    return (
        <>
            <div className="filter">
                <button onClick={() => setIsOpen(!isOpen)} className="button filter__button">{label}</button>
                {
                    isOpen &&
                    <form>
                        <div ref={dropdownRef} className="filter__dropdown">
                            <div style={{paddingtop: "3rem", paddingbottom: "3rem", textAlign: "left"}}>
                                {children}
                            </div>

                            <div className="filter__dropdown__actions">
                                <button onClick={() => setIsOpen(false)}
                                        className="filter__dropdown__actions_apply">close
                                </button>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </>
    );
}
