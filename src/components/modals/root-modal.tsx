import { closeModal } from "@/redux/modal-slice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../ui/modal";
import { LoginModal } from "./login-modal";
import { SignupModal } from "./signup-modal";

export const RootModal: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const activeModal = useSelector(
    (state: RootState) => state.modal.activeModal
  );

  return (
    <Modal open={isModalOpen} onClose={() => dispatch(closeModal())}>
      {activeModal === "login" && <LoginModal />}
      {activeModal === "signup" && <SignupModal />}
    </Modal>
  );
};
