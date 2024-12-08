"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const formSchema = z
    .object({
      email: z.string().email("Inserisci un'email valida"),
      password: z
        .string()
        .min(8, "La password deve essere lunga almeno 8 caratteri"),
      confirmPassword: z
        .string()
        .min(8, "La conferma della password è obbligatoria"),
      firstName: z.string().min(2, "Il nome è obbligatorio"),
      lastName: z.string().min(2, "Il cognome è obbligatorio"),
      address: z.string().min(5, "L'indirizzo è obbligatorio"),
      city: z.string().min(2, "La città è obbligatoria"),
      phone: z
        .string()
        .regex(
          /^[0-9]{10,15}$/,
          "Il numero di telefono deve essere valido (10-15 cifre)",
        )
        .nonempty("Il numero di telefono è obbligatorio"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Le password non corrispondono",
      path: ["confirmPassword"], // Collega l'errore al campo di conferma
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      phone: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setSuccess(false);

    const { email, password, firstName, lastName, address, city, phone } =
      values;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Errore durante la registrazione:", error.message);
      setError(error.message);
      return;
    }

    const { user } = data;

    if (user) {
      // Salva i dettagli aggiuntivi nella tabella profiles
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          full_name: `${firstName} ${lastName}`,
          firstname: firstName,
          lastname: lastName,
          address,
          city,
          phone,
          role: "utente_base", // Ruolo predefinito
        },
      ]);

      if (profileError) {
        console.error(
          "Errore nella creazione del profilo:",
          profileError.message,
        );
        setError("Errore durante il salvataggio del profilo.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 3000); // Redirige al login
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <div>
        <h2>Registrati</h2>

        {success ? (
          <div className="mt-6 space-y-8">
            <p>
              Registrazione completata! Controlla la tua email per verificare
              l'account.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="mt-8 space-y-4"
            >
              {/* Campo Nome */}
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="firstName">Nome</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Inserisci il tuo nome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Cognome */}
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="lastName">Cognome</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Inserisci il tuo cognome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Indirizzo */}
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="address">Indirizzo</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Inserisci il tuo indirizzo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Città */}
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="city">Città</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Inserisci la tua città"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Telefono */}
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="phone">Numero di Telefono</Label>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Inserisci il tuo numero di telefono"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Email */}
              <FormField
                name="email"
                control={form.control}
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
                name="password"
                control={form.control}
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

              {/* Conferma Password */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="confirmPassword">Conferma Password</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Conferma la tua password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pulsante di Registrazione */}
              <div className="relative">
                <Button type="submit" className="mt-4 w-full">
                  Registrati
                </Button>
              </div>
            </form>
          </Form>
        )}
        {error && (
          <div className="mt-6 space-y-8">
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}
