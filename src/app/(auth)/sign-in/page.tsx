import { AuthForm } from "@/components/AuthForm";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-[420px] p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <AuthForm type="sign-in" />
      </div>
    </div>
  );
};

export default page;
