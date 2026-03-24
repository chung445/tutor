import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { MessageCircle, Send, Search } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  from: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  lastTime: string;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Phạm Thị Hương",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "Ok, tớ sẽ chuẩn bị bài học tiếp theo",
    unread: 0,
    lastTime: "10:30"
  },
  {
    id: "2",
    name: "Đỗ Minh Nhật",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "Bạn có muốn học thêm phần listening?",
    unread: 2,
    lastTime: "14:15"
  }
];

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    from: "tutor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Chào em, buổi học hôm nay mình sẽ ôn tập chương phương trình bậc 2 nhé",
    timestamp: "09:45"
  },
  {
    id: "2",
    from: "student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "Vâng cô, em đã xem lại bài tập về nhà rồi",
    timestamp: "09:50"
  },
  {
    id: "3",
    from: "tutor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Ok, tớ sẽ chuẩn bị bài học tiếp theo",
    timestamp: "10:30"
  }
];

export default function StudentMessaging() {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    toast.success("Tin nhắn đã được gửi!");
    setMessageText("");
  };

  const selectedChat = selectedConversation === "1" 
    ? MOCK_CONVERSATIONS[0] 
    : MOCK_CONVERSATIONS[1];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
      {/* Conversations List */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Tin nhắn
            </CardTitle>
            <CardDescription>Các cuộc trò chuyện của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm..."
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {MOCK_CONVERSATIONS.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedConversation === conv.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conv.avatar} />
                      <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{conv.name}</p>
                      <p className="text-xs text-gray-500">{conv.lastTime}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-red-500">{conv.unread}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedChat.avatar} />
                <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-gray-900">{selectedChat.name}</p>
                <p className="text-xs text-gray-600">Gia sư</p>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {MOCK_MESSAGES.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.from === "student" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.from === "student"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.from === "student"
                      ? "text-blue-100"
                      : "text-gray-600"
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Input */}
          <div className="border-t p-4 space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Gửi
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
