"use client"

import { Button } from "@/app/components/ui/button"
import { Form } from "@/app/components/ui/form"
import { useForm } from "react-hook-form"

type TourFormProps = {
  onSubmit: (data: any) => void
  initialData?: any
}

const TourForm = ({ onSubmit, initialData }: TourFormProps) => {
  const form = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
      // Add other fields as needed
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Add your form fields here */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default TourForm 