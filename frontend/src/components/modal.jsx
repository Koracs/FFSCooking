
export default function Modal({show, children, label, footer}) {

if(show !== true) return null

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{label}</h4>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        {footer}
                    </div>
                </div>
            </div>
        </>
    );
}