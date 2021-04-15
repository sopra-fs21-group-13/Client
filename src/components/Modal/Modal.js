import './modal.css';

//export const /*erase if not working*/ 
export const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
            <div id="modal_title">
                Available Users
            </div>

            <div id="modal_content">
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}            
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}
                 {children}            
                 {children}
            </div>
            
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};