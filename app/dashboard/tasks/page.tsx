'use client'
// import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'

import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { UserNav } from './components/user-nav'
import { taskSchema } from './data/schema'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import TaskForm from '@/components/TaskForm'
import { getAllTasksInTeam } from '@/Database/firestore/firebaseDb'
import { useUserStore } from '@/Store/userStore'
import { ta } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import 'react-chat-elements/dist/main.css'
import { Input } from '@/components/ui/input'
import { MessageBox, MessageList, Button as button2 } from 'react-chat-elements'
import Chat from '@/components/Chat'
// import { AssignTeamForm } from '@/components/AssignTeamForm'

export default function TaskPage() {
  let teamId: any = useUserStore((state) => state.currrentTeam?.value)
  let getTasks = useUserStore((state) => state.getTasks)

  let tasks = useUserStore((state) => state.tasks)
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

  useEffect(() => {
    getTasks()
    console.log('tasks baby!', tasks)
  }, [teamId])
  useEffect(() => {
    console.log('tasks baby!', tasks)
  }, [tasks])

  return (
    <>
      {teamId && (
        <>
          <div className="flex h-full flex-1 flex-col space-y-8 p-8 ">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Welcome back!
                </h2>
                <p className="text-muted-foreground">
                  Here&apos;s a list of your tasks for this month!
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <UserNav />
              </div>
            </div>
            <DataTable data={tasks} columns={columns} />
          </div>
          <div>
            <AlertDialog open={showNewTeamDialog}>
              <AlertDialogTrigger>
                <Button onClick={() => setShowNewTeamDialog(true)}>
                  Create Tasks
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create Your Tasks:</AlertDialogTitle>
                  <AlertDialogDescription>
                    <TaskForm
                      close={() => {
                        setShowNewTeamDialog(false)
                        getTasks()
                      }}
                    ></TaskForm>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setShowNewTeamDialog((prev) => !prev)}
                  >
                    Cancel
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </>
  )
}
