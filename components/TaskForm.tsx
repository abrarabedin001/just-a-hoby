'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link } from 'lucide-react'
import { createTask } from '@/Database/firestore/firebaseDb'
import { useUserStore } from '@/Controller/userStore'
import { MultiSelect } from './MultiSelect'
// import { AssignTeamForm } from './AssignTeamForm'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  status: z.enum(['in progress', 'completed', 'backlog']),
  label: z.enum(['documentation', 'bug', 'enhancement']),
  priority: z.enum(['low', 'medium', 'high']),
  assigned: z.array(z.string()),
})
export default function TaskForm() {
  const currrentTeam = useUserStore((state) => state.currrentTeam)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      status: 'in progress',
      label: 'documentation',
      priority: 'medium',
      assigned: [],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createTask({ ...values, teamId: currrentTeam?.value })
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Fix the signin bug..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="in progress">in progress</SelectItem>
                  <SelectItem value="backlog">backlog</SelectItem>
                  <SelectItem value="completed">completed</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* label: z.enum(['documentation', 'bug', 'enhancement']), */}

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>label</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="documentation">documentation</SelectItem>
                  <SelectItem value="bug">bug</SelectItem>
                  <SelectItem value="enhancement">enhancement</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">low</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="high">high</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assigned"
          render={({ field }) => {
            if (field.value === undefined) {
              field.value = []
            }
            return (
              <FormItem>
                <FormLabel>Assigned Members</FormLabel>
                <MultiSelect
                  selected={field.value}
                  options={[
                    {
                      value: 'Colonial',
                      label: 'Colonial',
                    },
                    {
                      value: 'Modern',
                      label: 'Modern',
                    },
                  ]}
                  {...field}
                  className=""
                />
                <FormMessage />
              </FormItem>
            )
          }}
        />
        {/* <FormField
          control={form.control}
          name="assigned"
          render={({ field }) => {
            if (field.value === undefined) {
              field.value = []
            }
            return (
              <FormItem className="w-[80%] flex flex-col items-center ">
                <FormLabel
                  className="text-xl"
                  placeholder="Select the architectural style of the property"
                >
                  Architectural Style
                </FormLabel>
                <AssignTeamForm
                  selected={field.value}
                  options={[
                    {
                      value: 'Colonial',
                      label: 'Colonial',
                    },
                    {
                      value: 'Modern',
                      label: 'Modern',
                    },
                  ]}
                  {...field}
                  // className="sm:w-[510px]"
                />
                <FormMessage />
              </FormItem>
            )
          }}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}