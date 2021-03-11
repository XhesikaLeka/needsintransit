import React from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import "../App.css";

// const Modal1 = ({ 
//     isOpen, 
//     onClose, 
//     children, 
//     className, 
//     overlayClassName, 
//     mask,
//     maskClosable,
//     ...rest 
//   }) => 
//   {return (
//     <Modal
//       closeTimeoutMS={300}
//       className={className}
//       overlayClassName={overlayClassName}
//       isOpen={isOpen}
//       ariaHideApp={false}
//       mask={mask}
//       onClose={onClose}
//       maskClosable={maskClosable}
//       {...rest}
//     >
//       {children}
//     </Modal>
//   );
// };

// export default Modal1;

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        inset: undefined,
        position: undefined,
        zIndex: undefined,
        [theme.breakpoints.down("sm")]: {
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        [theme.breakpoints.up("sm")]: {
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
        },
    },
    paper: {
        backgroundColor: 'white',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        padding: 20,
        outline: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxWidth: 330,
        [theme.breakpoints.up("sm")]: {
            marginRight: 20,
            height: 'calc(100vh - 180px)',
        },
    },
    backdrop: {
        backgroundColor: 'rgba(38,143,152, 0.3)'
    }
}));

function Modal1({ opened, handleClose, children }) {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={opened}
            onClose={handleClose}
            hideBackdrop
            onBackdropClick={handleClose}
            // closeAfterTransition
        >
            <Slide direction="up" in={opened}>
                <div className={classes.paper}>
                    {children}
                </div>
            </Slide>
        </Modal>
    )
}

export default Modal1
