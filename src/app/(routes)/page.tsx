import AuthButton from "@/components/auth-buttons";
import { decrement, increment } from "@/redux/count-slice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  return (
    <button className="transform transition-all active:scale-90 bg-red-500">
      Click Me
    </button>
  );
}
