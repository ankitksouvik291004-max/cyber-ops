"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Clock, Pill, Edit, Trash2, Copy, Shield, Users, AlertCircle, CheckCircle } from "lucide-react"
import { format } from "date-fns"

export default function MedicationSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedPatient, setSelectedPatient] = useState("1")
  const [isAddingMedication, setIsAddingMedication] = useState(false)

  // Mock data
  const patients = [
    { id: "1", name: "Eleanor Johnson", age: 78 },
    { id: "2", name: "Robert Chen", age: 65 },
    { id: "3", name: "Maria Rodriguez", age: 82 },
  ]

  const medications = [
    {
      id: 1,
      patientId: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      times: ["8:00 AM"],
      instructions: "Take with food",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      active: true,
    },
    {
      id: 2,
      patientId: "1",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      times: ["8:00 AM", "6:00 PM"],
      instructions: "Take with meals",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      active: true,
    },
    {
      id: 3,
      patientId: "2",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      times: ["9:00 PM"],
      instructions: "Take at bedtime",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      active: true,
    },
  ]

  const currentPatient = patients.find((p) => p.id === selectedPatient)
  const patientMedications = medications.filter((m) => m.patientId === selectedPatient)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Medication Scheduling</h1>
              <p className="text-xs text-muted-foreground">Manage patient medication schedules</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {patient.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Current Schedule</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="manage">Manage Medications</TabsTrigger>
          </TabsList>

          {/* Current Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{currentPatient?.name}'s Medication Schedule</h2>
                <p className="text-muted-foreground">{patientMedications.length} active medications</p>
              </div>
              <Dialog open={isAddingMedication} onOpenChange={setIsAddingMedication}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medication
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Medication</DialogTitle>
                    <DialogDescription>Set up a new medication schedule for {currentPatient?.name}</DialogDescription>
                  </DialogHeader>
                  <AddMedicationForm onClose={() => setIsAddingMedication(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {patientMedications.map((medication) => (
                <Card key={medication.id} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Pill className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{medication.name}</CardTitle>
                          <CardDescription className="text-base">
                            {medication.dosage} • {medication.frequency}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Schedule Times</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {medication.times.map((time, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Duration</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {medication.startDate} to {medication.endDate}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Instructions</Label>
                        <p className="text-sm text-muted-foreground mt-1">{medication.instructions}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calendar View Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    Schedule for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                  </CardTitle>
                  <CardDescription>{currentPatient?.name}'s medication schedule for the selected day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patientMedications.map((medication) =>
                      medication.times.map((time, index) => (
                        <div
                          key={`${medication.id}-${index}`}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <Pill className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{medication.name}</p>
                              <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{time}</p>
                            <Badge variant="outline" className="text-xs">
                              Scheduled
                            </Badge>
                          </div>
                        </div>
                      )),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manage Medications Tab */}
          <TabsContent value="manage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-primary" />
                    Active Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {patientMedications.filter((m) => m.active).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Currently scheduled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Daily Doses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    {patientMedications.reduce((total, med) => total + med.times.length, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total per day</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    Reminders Set
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-500 mb-2">{patientMedications.length}</div>
                  <p className="text-sm text-muted-foreground">Active alerts</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Medication Templates</CardTitle>
                <CardDescription>Quick setup for common medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Blood Pressure", medications: ["Lisinopril", "Amlodipine"] },
                    { name: "Diabetes", medications: ["Metformin", "Insulin"] },
                    { name: "Cholesterol", medications: ["Atorvastatin", "Simvastatin"] },
                    { name: "Heart Health", medications: ["Aspirin", "Metoprolol"] },
                    { name: "Vitamins", medications: ["Vitamin D", "Multivitamin"] },
                    { name: "Pain Management", medications: ["Ibuprofen", "Acetaminophen"] },
                  ].map((template, index) => (
                    <Card key={index} className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{template.medications.join(", ")}</p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AddMedicationForm({ onClose }: { onClose: () => void }) {
  const [medicationTimes, setMedicationTimes] = useState<string[]>([])

  const addTime = () => {
    setMedicationTimes([...medicationTimes, ""])
  }

  const removeTime = (index: number) => {
    setMedicationTimes(medicationTimes.filter((_, i) => i !== index))
  }

  const updateTime = (index: number, value: string) => {
    const newTimes = [...medicationTimes]
    newTimes[index] = value
    setMedicationTimes(newTimes)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="medication-name">Medication Name</Label>
          <Input id="medication-name" placeholder="e.g., Lisinopril" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage</Label>
          <Input id="dosage" placeholder="e.g., 10mg" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="once">Once daily</SelectItem>
            <SelectItem value="twice">Twice daily</SelectItem>
            <SelectItem value="three">Three times daily</SelectItem>
            <SelectItem value="four">Four times daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Schedule Times</Label>
          <Button type="button" variant="outline" size="sm" onClick={addTime}>
            <Plus className="w-4 h-4 mr-2" />
            Add Time
          </Button>
        </div>
        {medicationTimes.map((time, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input type="time" value={time} onChange={(e) => updateTime(index, e.target.value)} className="flex-1" />
            <Button type="button" variant="outline" size="sm" onClick={() => removeTime(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input id="start-date" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Input id="end-date" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Special Instructions</Label>
        <Textarea id="instructions" placeholder="e.g., Take with food, avoid alcohol" rows={3} />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Save Medication</Button>
      </div>
    </div>
  )
}
