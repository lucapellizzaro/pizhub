"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    setError(null); // Reset errors

    const { email, password } = values;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Errore durante il login:", error.message);
      setError("Credenziali errate o account inesistente.");
      return;
    }

    // Redirect to dashboard after login
    console.log("Login effettuato con successo:", data);
    router.push("/dashboard");
  };

  return (
    <div>
      <h2>Accedi</h2>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {/* Form di Login */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="mt-8 space-y-4"
        >
          {/* Campo Email */}
          <FormField
            name="email"
            control={form.control}
            rules={{ required: "L'email è obbligatoria" }}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">Email</Label>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Inserisci la tua email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Password */}
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "La password è obbligatoria",
              minLength: {
                value: 6,
                message: "La password deve essere lunga almeno 6 caratteri",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="password">Password</Label>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Inserisci la tua password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative">
            {/* Pulsante di Registrazione */}
            <Button type="submit" className="mt-4 w-full">
              Accedi
            </Button>
          </div>
        </form>
        <Button
          variant={"outline"}
          type="button"
          onClick={() => router.push("/auth/register")}
          className="mt-4 w-full"
        >
          Registrati
        </Button>
      </Form>
    </div>
  );
}
