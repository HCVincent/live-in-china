import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showLoginModal } from "@/redux/modal-slice";
import * as z from "zod";
import {
  DialogContent,
  DialogDescription,
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
    emailCode: z.string().min(1, {
      message: "email verification code is required.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });
const onSubmit = () => {};
export const SignupModal: React.FC = () => {
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      emailCode: "",
    },
  });
  return (
    <DialogContent className="p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Sign Up
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      />
                    </FormControl>
                    <FormMessage className="flex justify-start px-3" />
                  </FormItem>
                )}
              />
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
                        />
                        <Button variant="ghost">
                          send code
                          <SendHorizontal />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="flex justify-start px-3" />
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
                variant="ghost"
                onClick={() => dispatch(showLoginModal())}
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
