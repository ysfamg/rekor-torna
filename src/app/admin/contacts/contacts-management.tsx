"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Phone, Clock, CheckCircle2, Eye, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  serviceType: string
  message: string
  status: string
  notes: string | null
  createdAt: Date
}

interface ContactsManagementProps {
  initialContacts: Contact[]
}

export function ContactsManagement({ initialContacts }: ContactsManagementProps) {
  const { toast } = useToast()
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [notes, setNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (id: string, status: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        setContacts(contacts.map((c) => (c.id === id ? { ...c, status } : c)))
        toast({ title: "Başarılı", description: "Durum güncellendi" })
      }
    } catch {
      toast({ title: "Hata", variant: "destructive" })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedContact) return
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/contacts/${selectedContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      })
      if (response.ok) {
        setContacts(contacts.map((c) => (c.id === selectedContact.id ? { ...c, notes } : c)))
        toast({ title: "Başarılı", description: "Notlar kaydedildi" })
      }
    } catch {
      toast({ title: "Hata", variant: "destructive" })
    } finally {
      setIsUpdating(false)
    }
  }

  const openDetail = (contact: Contact) => {
    setSelectedContact(contact)
    setNotes(contact.notes || "")
    if (contact.status === "new") {
      handleStatusUpdate(contact.id, "read")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-orange-500"
      case "read": return "bg-blue-500"
      case "replied": return "bg-green-500"
      default: return "bg-slate-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "Yeni"
      case "read": return "Okundu"
      case "replied": return "Yanıtlandı"
      default: return status
    }
  }

  const newCount = contacts.filter((c) => c.status === "new").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">İletişim Mesajları</h1>
          <p className="text-slate-500 text-sm">
            {newCount > 0 && (
              <span className="text-orange-500 font-medium">{newCount} yeni mesaj • </span>
            )}
            Toplam {contacts.length} mesaj
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <Card className="bg-white dark:bg-slate-800">
            <CardContent className="p-8 text-center">
              <Mail className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Henüz mesaj yok</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card
              key={contact.id}
              className={`bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-lg transition-all ${
                contact.status === "new" ? "border-l-4 border-l-orange-500" : ""
              }`}
              onClick={() => openDetail(contact)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{contact.name}</h3>
                      <Badge className={getStatusColor(contact.status)}>{getStatusText(contact.status)}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {contact.phone}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{contact.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{contact.serviceType}</Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(contact.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle>Mesaj Detayı</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500">Ad Soyad</label>
                    <p className="font-medium">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">E-posta</label>
                    <p className="font-medium">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Telefon</label>
                    <p className="font-medium">{selectedContact.phone || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Hizmet Türü</label>
                    <p className="font-medium">{selectedContact.serviceType}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500">Mesaj</label>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg mt-1">
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500">Admin Notları</label>
                  <Textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Bu mesajla ilgili notlarınız..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedContact.status === "new" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(selectedContact.id, "new")}
                    disabled={isUpdating}
                  >
                    Yeni
                  </Button>
                  <Button
                    variant={selectedContact.status === "read" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(selectedContact.id, "read")}
                    disabled={isUpdating}
                  >
                    Okundu
                  </Button>
                  <Button
                    variant={selectedContact.status === "replied" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(selectedContact.id, "replied")}
                    disabled={isUpdating}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Yanıtlandı
                  </Button>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedContact(null)}>
                    Kapat
                  </Button>
                  <Button
                    onClick={handleSaveNotes}
                    disabled={isUpdating}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {isUpdating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    Notları Kaydet
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
