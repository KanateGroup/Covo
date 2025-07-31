import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  from: 'agent' | 'client';
  text: string;
  timestamp: Date;
}

interface Client {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const MOCK_CLIENTS: Client[] = [
  {
    id: 1,
    name: 'Aminata Diallo',
    avatar: '👩🏾‍💼',
    lastMessage: 'Bonjour, j\'ai une question sur ma réservation',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    messages: [
      {
        id: 1,
        from: 'client',
        text: 'Bonjour, j\'ai une question sur ma réservation',
        timestamp: new Date(Date.now() - 10 * 60 * 1000)
      },
      {
        id: 2,
        from: 'agent',
        text: 'Bonjour Aminata ! Comment puis-je vous aider ?',
        timestamp: new Date(Date.now() - 8 * 60 * 1000)
      },
      {
        id: 3,
        from: 'client',
        text: 'Je voudrais modifier l\'heure de mon trajet',
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      }
    ]
  },
  {
    id: 2,
    name: 'Moussa Sow',
    avatar: '👨🏾‍💻',
    lastMessage: 'Merci pour votre aide !',
    lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
    unreadCount: 0,
    messages: [
      {
        id: 1,
        from: 'client',
        text: 'Bonjour, j\'ai un problème avec l\'application',
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 2,
        from: 'agent',
        text: 'Bonjour Moussa, pouvez-vous me décrire le problème ?',
        timestamp: new Date(Date.now() - 25 * 60 * 1000)
      },
      {
        id: 3,
        from: 'client',
        text: 'L\'application ne se connecte pas',
        timestamp: new Date(Date.now() - 20 * 60 * 1000)
      },
      {
        id: 4,
        from: 'agent',
        text: 'Essayez de redémarrer l\'application',
        timestamp: new Date(Date.now() - 18 * 60 * 1000)
      },
      {
        id: 5,
        from: 'client',
        text: 'Merci pour votre aide !',
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      }
    ]
  },
  {
    id: 3,
    name: 'Fatou Ba',
    avatar: '👩🏾‍🎓',
    lastMessage: 'Parfait, je confirme ma réservation',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000),
    unreadCount: 1,
    messages: [
      {
        id: 1,
        from: 'client',
        text: 'Bonjour, je voudrais réserver un trajet',
        timestamp: new Date(Date.now() - 45 * 60 * 1000)
      },
      {
        id: 2,
        from: 'agent',
        text: 'Bonjour Fatou ! Quel trajet souhaitez-vous réserver ?',
        timestamp: new Date(Date.now() - 40 * 60 * 1000)
      },
      {
        id: 3,
        from: 'client',
        text: 'Dakar - Thiès pour demain matin',
        timestamp: new Date(Date.now() - 35 * 60 * 1000)
      },
      {
        id: 4,
        from: 'agent',
        text: 'Parfait, je vous propose un trajet à 8h00',
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 5,
        from: 'client',
        text: 'Parfait, je confirme ma réservation',
        timestamp: new Date(Date.now() - 2 * 60 * 1000)
      }
    ]
  }
];

export default function AgentMessaging() {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedClient?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !selectedClient) return;
    
    const newMessage: Message = {
      id: Date.now(),
      from: 'agent',
      text: input,
      timestamp: new Date()
    };
    
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === selectedClient.id 
          ? {
              ...client,
              messages: [...client.messages, newMessage],
              lastMessage: input,
              lastMessageTime: new Date()
            }
          : client
      )
    );
    
    setSelectedClient(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessage: input,
      lastMessageTime: new Date()
    } : null);
    
    setInput('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}min`;
    if (minutes < 1440) return `Il y a ${Math.floor(minutes / 60)}h`;
    return date.toLocaleDateString('fr-FR');
  };

  const unreadCount = clients.filter(c => c.unreadCount > 0).length;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open ? (
        <div className="w-80 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-primary/90 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-primary-foreground text-sm">Messagerie</span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="text-primary-foreground/70 hover:text-secondary transition-colors text-lg font-bold"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 flex min-h-0">
            {/* Liste des clients */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col">
              <div className="p-2 flex-shrink-0">
                <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Clients</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {clients.map(client => (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${
                      selectedClient?.id === client.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="text-lg">{client.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                            {client.name}
                          </p>
                          {client.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-1 py-0.5 min-w-[16px] text-center">
                              {client.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {client.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {formatLastMessageTime(client.lastMessageTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation */}
            <div className="flex-1 flex flex-col min-h-0">
              {selectedClient ? (
                <>
                  {/* Header de la conversation */}
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <div className="text-lg">{selectedClient.avatar}</div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {selectedClient.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          En ligne
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-gray-900 min-h-0">
                    {selectedClient.messages.map((message) => (
                      <div key={message.id} className={`flex ${message.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] ${message.from === 'agent' ? 'order-2' : 'order-1'}`}>
                          <div className={`px-2 py-1.5 rounded-lg text-xs shadow-sm ${
                            message.from === 'agent' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                          }`}>
                            {message.text}
                          </div>
                          <div className={`text-xs text-gray-500 mt-0.5 ${
                            message.from === 'agent' ? 'text-right' : 'text-left'
                          }`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          message.from === 'agent' 
                            ? 'bg-primary text-primary-foreground order-1 ml-1' 
                            : 'bg-secondary text-secondary-foreground order-2 mr-1'
                        }`}>
                          {message.from === 'agent' ? '👨‍💼' : selectedClient.avatar}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSend} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1.5 text-xs text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e as any); }}
                      />
                      <button 
                        type="submit" 
                        className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-xs"
                        disabled={!input.trim()}
                      >
                        Envoyer
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <p className="text-xs">Sélectionnez un client</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground rounded-full shadow-brand p-4 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all relative"
          aria-label="Ouvrir la messagerie"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
} 