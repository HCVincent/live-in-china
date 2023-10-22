import { showLoginModal } from "@/redux/modal-slice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const SignupModal: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  return (
    <div>
      <h2>Sign Up</h2>
      <Button onClick={() => dispatch(showLoginModal())}>
        Switch to Login
      </Button>
    </div>
  );
};
