"use client";

import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
Auth.configure({
  authenticationFlowType: "USER_PASSWORD_AUTH",
});
Amplify.configure({ ...awsExports, ssr: true });

interface IUser {
  username: string;
  // ... other attributes like email, etc.
}

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
