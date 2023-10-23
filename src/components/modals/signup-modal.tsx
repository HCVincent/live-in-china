"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  showEmailCodeModal,
  showLoginModal,
} from "@/redux/modal-slice";
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
import { useState } from "react";
import { RootState } from "@/redux/store";
import { setSignupField } from "@/redux/form-data-slice";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "Email is required.",
      })
      .email({
        message: "This is not a valid email.",
      }),
    password: z.string().min(6, {
      message: "Password is required, 6 characters at least.",
    }),
    passwordConfirm: z.string().min(6, {
      message: "Password confirm is required, 6 characters at least.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export const SignupModal: React.FC = () => {
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
    defaultValues: useSelector((state: RootState) => state.formData.signup),
  });

  const handleSignup = async (data: any) => {
    clearErrorMessage();
    try {
      setLoading(true);
      // Confirm the user with the verification code
      await Auth.signUp(data.email, data.password);
      dispatch(showEmailCodeModal());
    } catch (err: any) {
      console.log("handleSignup Error", err.message);
      setError(err.message || "An error occurred.");
      setLoading(false);
    }
  };

  const handleSendCode = async (email: string, password: string) => {
    clearErrorMessage();
    try {
      setLoading(true);
      await Auth.signUp({
        username: email,
        password: password, // Generating a random password just to meet Amplify's requirement.
      });
      startCountdown();
      setLoading(false);
    } catch (err: any) {
      if (err.code === "UsernameExistsException") {
        try {
          // Re-send code for unconfirmed users
          await Auth.resendSignUp(email);
          setLoading(false);
        } catch (resendError: any) {
          console.log(
            "handleSendCode UsernameExistsException Error",
            err.message
          );
          setError(
            resendError.message ||
              "An error occurred during re-sending the code."
          );
          setLoading(false);
        }
      } else {
        console.log("handleSendCode Error", err.message);
        setError(err.message || "An error occurred.");
        setLoading(false);
      }
    }
  };
  const clearErrorMessage = () => {
    setError("");
  };
  return (
    <DialogContent className="p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Sign Up
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-8">
          <div className="space-y-8 px-6">
            <div className="flex flex-col space-y-4 items-center justify-center text-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex justify-start px-3 capitalize text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="type email..."
                        {...field}
                        onChange={(e) => {
                          dispatch(setSignupField({ email: e.target.value }));
                          clearErrorMessage();
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="flex justify-start px-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex justify-start px-3 capitalize text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="type password..."
                        {...field}
                        onChange={(e) => {
                          dispatch(
                            setSignupField({ password: e.target.value })
                          );
                          clearErrorMessage();
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="flex justify-start px-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex justify-start px-3 capitalize text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Password Confirm
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="password again..."
                        {...field}
                        onChange={(e) => {
                          dispatch(
                            setSignupField({ passwordConfirm: e.target.value })
                          );
                          clearErrorMessage();
                          field.onChange(e);
                        }}
                      />
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

            <div className="flex items-center justify-center text-xs mt-2">
              already has an account?
              <Button
                disabled={loading}
                variant="ghost"
                onClick={() => {
                  setError("");
                  dispatch(showLoginModal());
                }}
              >
                Log in
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
