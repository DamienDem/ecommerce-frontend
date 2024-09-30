// components/AuthForm.tsx

"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const signInSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
});

const signUpSchema = signInSchema.extend({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
});

type AuthFormProps = {
  type: "sign-in" | "sign-up";
};

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthService();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(type === "sign-in" ? signInSchema : signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    try {
      if (type === "sign-in") {
        await authService.signInWithEmailAndPassword(
          values.email,
          values.password
        );
      } else {
        await authService.signUpWithEmailAndPassword(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        );
      }
      router.push("/"); // Redirection vers la page d'accueil
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      // Gérez l'erreur ici (par exemple, affichez un message à l'utilisateur)
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    try {
      await authService.signInWithGoogle();
      router.push("/"); // Redirection vers la page d'accueil
    } catch (error) {
      console.error("Erreur de connexion Google:", error);
      // Gérez l'erreur ici
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === "sign-up" && (
            <>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="exemple@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Chargement..."
              : type === "sign-in"
              ? "Se connecter"
              : "S'inscrire"}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Ou continuer avec</span>
        </div>
      </div>
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full"
        disabled={isLoading}
      >
        Se connecter avec Google
      </Button>
      <p className="text-center text-sm text-gray-600">
        {type === "sign-in" ? "Pas encore de compte ?" : "Déjà un compte ?"}
        <Link
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
        >
          {type === "sign-in" ? "S'inscrire" : "Se connecter"}
        </Link>
      </p>
    </div>
  );
}
