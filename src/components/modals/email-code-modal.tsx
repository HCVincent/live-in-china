"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, showLoginModal } from "@/redux/modal-slice";
import * as z from "zod";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SendHorizontal } from "lucide-react";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { setSignupField } from "@/redux/form-data-slice";
import { RootState } from "@/redux/store";

const formSchema = z.object({
  emailCode: z.string().min(1, {
    message: "email verification code is required.",
  }),
});

export const EmailCodeModal: React.FC = () => {
  const { email, password } = useSelector(
    (state: RootState) => state.formData.signup
  );
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isSendCodeDisabled, setIsSendCodeDisabled] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startCountdown = () => {
    setCountdown(60);
    setIsSendCodeDisabled(true);
    const timer = setInterval(() => {
      setCountdown((prev) => (prev ? prev - 1 : null));
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsSendCodeDisabled(false);
      setCountdown(null);
    }, 60000);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailCode: "",
    },
  });

  const handleVerifyEmail = async (data: any) => {
    clearErrorMessage();
    try {
      setLoading(true);
      // Confirm the user with the verification code
      await Auth.confirmSignUp(email, data.emailCode);
      dispatch(closeModal());
      console.log("confirmSignUp");
      await Auth.signIn(email, password);
      console.log("signin");
      window.dispatchEvent(new CustomEvent("userLoggedIn"));
    } catch (err: any) {
      console.log("confirmSignUp Error", err.message);
      setError(err.message || "An error occurred.");
      setLoading(false);
    }
  };

  const handleSendCode = async (email: string) => {
    clearErrorMessage();
    try {
      setLoading(true);
      await Auth.resendSignUp(email);
      startCountdown();
      setLoading(false);
    } catch (err: any) {
      console.log("handleSendCode Error", err.message);
      setError(err.message || "An error occurred.");
      setLoading(false);
    }
  };
  const clearErrorMessage = () => {
    setError("");
  };
  return (
    <DialogContent className="p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Verify Email
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVerifyEmail)}
          className="space-y-8"
        >
          <div className="space-y-8 px-6">
            <div className="flex flex-col space-y-4 items-center justify-center text-center">
              <FormField
                control={form.control}
                name="emailCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex justify-start px-3 capitalize text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      email verification code
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-between">
                        <Input
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="email code..."
                          {...field}
                          onChange={(e) => {
                            clearErrorMessage();
                            field.onChange(e);
                          }}
                        />
                        <Button
                          variant="ghost"
                          type="button"
                          disabled={isSendCodeDisabled || loading}
                          onClick={() => handleSendCode(email)}
                        >
                          {countdown ? `${countdown}s` : "send code"}
                          <SendHorizontal />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="flex justify-start px-3" />
                    <div className="flex justify-start px-3 text-red-500">
                      {error}
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter className="flex  flex-col  px-6 py-4">
            <Button variant="default">Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
