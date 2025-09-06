"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Battery, Activity } from "lucide-react"

interface DeviceStatus {
  id: string
  patientName: string
  connected: boolean
  batteryLevel: number
  lastSeen: Date
  status: "online" | "offline" | "warning"
}

export function RealTimeStatus() {
  const [devices, setDevices] = useState<DeviceStatus[]>([
    {
      id: "DM001",
      patientName: "Eleanor Johnson",
      connected: true,
      batteryLevel: 85,
      lastSeen: new Date(),
      status: "online",
    },
    {
      id: "DM002",
      patientName: "Robert Chen",
      connected: false,
      batteryLevel: 45,
      lastSeen: new Date(Date.now() - 15 * 60 * 1000),
      status: "offline",
    },
    {
      id: "DM003",
      patientName: "Maria Rodriguez",
      connected: true,
      batteryLevel: 20,
      lastSeen: new Date(),
      status: "warning",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prev) =>
        prev.map((device) => ({
          ...device,
          batteryLevel: Math.max(0, device.batteryLevel - Math.random() * 2),
          connected: Math.random() > 0.1, // 90% chance to stay connected
          lastSeen: device.connected ? new Date() : device.lastSeen,
          status: device.connected ? (device.batteryLevel < 25 ? "warning" : "online") : "offline",
        })),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Real-time Device Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    device.status === "online"
                      ? "bg-green-500"
                      : device.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                ></div>
                <div>
                  <p className="font-medium">{device.patientName}</p>
                  <p className="text-sm text-muted-foreground">Device {device.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Battery className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{Math.round(device.batteryLevel)}%</span>
                </div>
                {device.connected ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <Badge
                  variant={
                    device.status === "online" ? "default" : device.status === "warning" ? "secondary" : "destructive"
                  }
                  className={
                    device.status === "online"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : device.status === "warning"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : ""
                  }
                >
                  {device.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
