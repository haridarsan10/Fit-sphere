
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";


import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
} from "lucide-react";

// Validation schema
const gymSchema = z.object({
  name: z.string().min(3, "Gym name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  contactNumber: z.string().min(10, "Enter a valid contact number"),
  email: z.string().email("Enter a valid email address"),
});

type GymFormValues = z.infer<typeof gymSchema>;

export default function AddGym() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      contactNumber: "",
      email: "",
    } as GymFormValues,

    validators: {
      onSubmit: gymSchema,
    },

    onSubmit: async ({ value }) => {
      console.log("Gym Details:", value);

      // TODO: Connect useAddGym mutation here
    },
  });

  return (
    <PageContainer>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate({ to: "/gym-owner/gyms" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <PageHeader
          title="Add Gym"
          description="Register a new gym under your ownership."
        />
      </div>

      <form
        className="mt-6 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <CardDescription>
              Enter the basic details about your gym.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Gym Name
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="Enter gym name"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Description
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="Describe your gym and its facilities"
                        rows={4}
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Location Details</CardTitle>
            </div>
            <CardDescription>
              Enter the physical address of your gym.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <form.Field
                name="address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field className="sm:col-span-2" data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Street Address
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="Enter street address"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {(["city", "state", "pincode"] as const).map((name) => (
                <form.Field
                  key={name}
                  name={name}
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      !field.state.meta.isValid;

                    const labels = {
                      city: "City",
                      state: "State",
                      pincode: "Pincode",
                    };

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          {labels[name]}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          placeholder={`Enter ${labels[name].toLowerCase()}`}
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              ))}
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Contact Information</CardTitle>
            </div>
            <CardDescription>
              Provide contact information for your gym.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              {(["contactNumber", "email"] as const).map((name) => (
                <form.Field
                  key={name}
                  name={name}
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          {name === "email" ? "Email Address" : "Contact Number"}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type={name === "email" ? "email" : "tel"}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          placeholder={
                            name === "email"
                              ? "Enter gym email"
                              : "Enter contact number"
                          }
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              ))}
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/gym-owner/gyms" })}
          >
            Cancel
          </Button>

          <Button type="submit">
            Submit Gym
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}
