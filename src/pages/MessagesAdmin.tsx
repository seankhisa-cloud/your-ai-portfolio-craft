import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, MailOpen, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const MessagesAdmin = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading messages", variant: "destructive" });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const toggleRead = async (message: Message) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: !message.is_read })
      .eq("id", message.id);

    if (error) {
      toast({ title: "Error updating message", variant: "destructive" });
    } else {
      loadMessages();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error deleting message", variant: "destructive" });
    } else {
      toast({ title: "Message deleted" });
      loadMessages();
    }
  };

  const openEmail = (email: string, name: string) => {
    window.location.href = `mailto:${email}?subject=Re: Your message`;
  };

  const openWhatsApp = (message: Message) => {
    const text = encodeURIComponent(`Hi ${message.name}, regarding your message...`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (loading) return <div>Loading...</div>;

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-3d-red mb-2">Contact Messages</h1>
        <p className="text-gray-400">
          {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card 
            key={message.id} 
            className={`card-3d-red border-panda-red/20 ${!message.is_read ? "bg-panda-red/5" : ""}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {message.is_read ? (
                      <MailOpen size={20} className="text-gray-400" />
                    ) : (
                      <Mail size={20} className="text-panda-red" />
                    )}
                    <CardTitle className="text-panda-red">{message.name}</CardTitle>
                    {!message.is_read && (
                      <Badge className="bg-panda-red/20 text-panda-red">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{message.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleRead(message)}
                    className="text-panda-blue hover:bg-panda-blue/10"
                  >
                    {message.is_read ? "Mark Unread" : "Mark Read"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(message.id)}
                    className="text-panda-red hover:bg-panda-red/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
              
              <div className="flex gap-2 pt-2 border-t border-panda-red/20">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEmail(message.email, message.name)}
                  className="flex-1 text-panda-blue hover:bg-panda-blue/10"
                >
                  <ExternalLink size={16} className="mr-1" />
                  Reply via Email
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openWhatsApp(message)}
                  className="flex-1 text-panda-purple hover:bg-panda-purple/10"
                >
                  <ExternalLink size={16} className="mr-1" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <Card className="card-3d-blue border-panda-blue/20">
            <CardContent className="py-12 text-center">
              <Mail size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400">No messages yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MessagesAdmin;
