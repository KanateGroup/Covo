import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Car, User, QrCode, MessageCircle, LogOut, ShieldCheck, AlertTriangle, CheckCircle, XCircle, PlayCircle, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import useSound from 'use-sound';

// Correction du chemin du son de notification
const notificationSound = '/notification.mp3'; // Placez notification.mp3 dans public/

// QrReader import dynamique ES modules
let QrReader: any = null;
(async () => {
  try {
    const mod = await import('react-qr-reader');
    QrReader = mod.QrReader || mod.default;
  } catch {}
})();

// Mock parsing QR
function parseQR(data: string) {
  // Format attendu: RES-2024-001|Aminata Diallo|Yamaha NMAX|2024-01-15|14:00|8000
  const [id, client, vehicule, date, heure, montant] = data.split('|');
  return {
    id,
    client,
    vehicule,
    date,
    heure,
    montant,
    statut: 'en attente',
    type: vehicule?.includes('Yamaha') ? 'Scooter' : 'Voiture',
    limiteDepassee: false,
    timeline: ['en attente'],
  };
}

const initialLocations = [
  {
    id: 'RES-2024-001',
    client: 'Aminata Diallo',
    vehicule: 'Yamaha NMAX',
    type: 'Scooter',
    date: '2024-06-10',
    heure: '14:00',
    duree: 2,
    statut: 'en attente',
    limiteDepassee: false,
    timeline: ['en attente'],
    montant: '8000',
  },
  {
    id: 'RES-2024-002',
    client: 'Moussa Sow',
    vehicule: 'Renault Clio',
    type: 'Voiture',
    date: '2024-06-09',
    heure: '10:00',
    duree: 1,
    statut: 'en cours',
    limiteDepassee: false,
    timeline: ['en attente', 'démarrée'],
    montant: '15000',
  },
  {
    id: 'RES-2024-003',
    client: 'Fatou Ba',
    vehicule: 'Vélo urbain',
    type: 'Vélo',
    date: '2024-06-08',
    heure: '09:00',
    duree: 3,
    statut: 'terminée',
    limiteDepassee: true,
    timeline: ['en attente', 'démarrée', 'terminée'],
    montant: '2000',
  },
];

const mockChatAgent = {
  name: 'Agent COVO',
  avatar: '🛡️',
};
const mockChatClient = {
  name: 'Client',
  avatar: '👤',
};

// Types pour le chat
interface ChatMessage {
  from: 'agent' | 'client';
  to: string; // email ou id utilisateur
  text: string;
  timestamp: number;
}

// Helpers pour le chat localStorage
const CHAT_KEY = 'covo_chat_messages';
function getAllMessages(): ChatMessage[] {
  try {
    return JSON.parse(localStorage.getItem(CHAT_KEY) || '[]');
  } catch {
    return [];
  }
}
function saveMessages(msgs: ChatMessage[]) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(msgs));
}
function getConversations(): { user: string; lastMsg: string; lastTime: number }[] {
  const msgs = getAllMessages();
  const byUser: Record<string, ChatMessage[]> = {};
  msgs.forEach(m => {
    const user = m.from === 'client' ? m.to : m.to;
    if (!byUser[user]) byUser[user] = [];
    byUser[user].push(m);
  });
  return Object.entries(byUser).map(([user, arr]) => ({
    user,
    lastMsg: arr[arr.length - 1]?.text || '',
    lastTime: arr[arr.length - 1]?.timestamp || 0,
  })).sort((a, b) => b.lastTime - a.lastTime);
}
function getMessagesForUser(user: string): ChatMessage[] {
  return getAllMessages().filter(m => m.to === user || (m.from === 'client' && m.to === 'agent'));
}
function addMessage(msg: ChatMessage) {
  const msgs = getAllMessages();
  msgs.push(msg);
  saveMessages(msgs);
}

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState(initialLocations);
  const [activeTab, setActiveTab] = useState<'scan'|'locations'|'chat'>('scan');
  const [chatOpen, setChatOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const [scanned, setScanned] = useState<any>(null);
  const [chatInbox, setChatInbox] = useState<{ user: string; lastMsg: string; lastTime: number }[]>(getConversations());
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = React.useRef<HTMLDivElement>(null);
  const [playNotif] = useSound(notificationSound, { volume: 0.3 });

  useEffect(() => {
    const code = localStorage.getItem('agent_access_code');
    if (code !== 'AGENT-2024') {
      navigate('/agent/login');
    }
  }, [navigate]);

  // Auto-scroll chat
  React.useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Polling pour maj inbox/messages
  React.useEffect(() => {
    const interval = setInterval(() => {
      setChatInbox(getConversations());
      if (selectedUser) setChatMessages(getMessagesForUser(selectedUser));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  // Sélection conversation
  const openConversation = (user: string) => {
    setSelectedUser(user);
    setChatMessages(getMessagesForUser(user));
    setTimeout(() => {
      if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, 100);
  };

  // Feedback sonore et vibration sur actions clés
  const feedback = (type: 'success' | 'error' | 'notif') => {
    if (window.navigator.vibrate) window.navigator.vibrate(type === 'error' ? 200 : 80);
    if (type === 'notif' && playNotif) playNotif();
  };

  // Actions dynamiques sur les locations
  const updateLocationStatus = (id: string, newStatus: string) => {
    setLocations(prev => prev.map(loc => {
      if (loc.id === id) {
        let newTimeline = [...loc.timeline];
        if (!newTimeline.includes(newStatus)) newTimeline.push(newStatus);
        return { ...loc, statut: newStatus, timeline: newTimeline, limiteDepassee: newStatus === 'terminée' && Math.random() > 0.7 };
      }
      return loc;
    }));
    feedback('success');
    toast.success(`Location ${id} : ${newStatus === 'démarrée' ? 'Démarrée' : newStatus === 'terminée' ? 'Terminée' : 'Annulée'}`);
  };
  const cancelLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
    feedback('error');
    toast.error(`Location ${id} annulée`);
  };

  const handleLogout = () => {
    localStorage.removeItem('agent_access_code');
    navigate('/agent/login');
  };

  const handleScan = (data: string | null) => {
    if (data && !scanned) {
      setScanning(false);
      setScanned(parseQR(data));
    }
  };
  const handleScanError = (err: any) => {
    setScanError('Erreur caméra ou permission refusée');
    setScanning(false);
  };
  const resetScan = () => {
    setScanned(null);
    setScanError('');
    setScanning(false);
  };
  const addScannedToLocations = () => {
    if (scanned) {
      setLocations(prev => [{ ...scanned }, ...prev]);
      feedback('success');
      toast.success('Nouvelle location ajoutée !');
      setScanned(null);
    }
  };

  // Envoi message agent
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || !selectedUser) return;
    const msg: ChatMessage = {
      from: 'agent',
      to: selectedUser,
      text: chatInput,
      timestamp: Date.now(),
    };
    addMessage(msg);
    setChatMessages(prev => [...prev, msg]);
    setChatInput('');
    setTimeout(() => {
      if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#1B5B4A]/80 to-[#1a2a2f] pt-0 p-0 relative overflow-hidden">
      {/* Fond animé cockpit */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#C4A91C]/30 rounded-full shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1.5px)'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      {/* Header cockpit agent */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex items-center justify-between px-8 py-6 bg-white/5 backdrop-blur-xl border-b border-[#C4A91C]/20 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <ShieldCheck className="h-10 w-10 text-[#C4A91C] drop-shadow-glow" />
          <span className="text-2xl font-extrabold text-white tracking-tight">Agent cockpit</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={activeTab === 'scan' ? 'default' : 'outline'}
            onClick={() => setActiveTab('scan')}
            className="flex items-center gap-2"
          >
            <QrCode className="h-5 w-5" />
            Scan QR
          </Button>
          <Button
            variant={activeTab === 'locations' ? 'default' : 'outline'}
            onClick={() => setActiveTab('locations')}
            className="flex items-center gap-2"
          >
            <Car className="h-5 w-5" />
            Locations
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'default' : 'outline'}
            onClick={() => setActiveTab('chat')}
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Chat
          </Button>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Déconnexion
          </Button>
        </div>
      </motion.header>
      {/* Contenu cockpit agent */}
      <main className="relative z-10 container mx-auto max-w-4xl py-10 px-2 md:px-0">
        <AnimatePresence mode="wait">
          {activeTab === 'scan' && (
            <motion.section
              key="scan"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Card className="backdrop-blur-2xl bg-white/10 border border-[#C4A91C]/30 shadow-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <QrCode className="h-6 w-6 text-[#C4A91C]" />
                    Scanner un QR code client
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Scannez le QR code du client pour valider ou démarrer une location.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  {!scanned && (
                    <>
                      {scanning && QrReader ? (
                        <div className="w-full flex flex-col items-center">
                          <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-[#C4A91C]/40 shadow-xl relative bg-black">
                            <QrReader
                              constraints={{ facingMode: 'environment' }}
                              onResult={(result: any, error: any) => {
                                if (!!result) handleScan(result?.text);
                                if (!!error) setScanError('Erreur de scan ou QR non détecté');
                              }}
                              style={{ width: '100%', height: '100%' }}
                            />
                            {/* Animation laser */}
                            <motion.div
                              className="absolute left-0 right-0 top-1/2 h-1 bg-[#C4A91C]/60 rounded-full blur-sm"
                              animate={{ x: [0, 220, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            />
                          </div>
                          <Button variant="outline" className="mt-4" onClick={() => setScanning(false)}>Annuler</Button>
                        </div>
                      ) : (
                        <>
                          <motion.div
                            className="w-40 h-40 rounded-2xl bg-gradient-to-br from-[#1B5B4A]/60 to-[#C4A91C]/20 flex items-center justify-center relative overflow-hidden shadow-xl border-2 border-[#C4A91C]/40"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                          >
                            <motion.div
                              className="absolute inset-0 border-4 border-dashed border-[#C4A91C]/60 rounded-2xl animate-pulse"
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                            />
                            <QrCode className="h-24 w-24 text-[#C4A91C] z-10" />
                            <motion.div
                              className="absolute left-0 right-0 top-1/2 h-1 bg-[#C4A91C]/60 rounded-full blur-sm"
                              animate={{ x: [0, 120, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            />
                          </motion.div>
                          <div className="mt-6 text-center">
                            <Button size="lg" onClick={() => { setScanning(true); setScanError(''); }} className="bg-gradient-to-r from-[#C4A91C] via-[#1B5B4A] to-[#C4A91C] text-black font-bold shadow-lg hover:from-[#1B5B4A] hover:to-[#C4A91C] hover:text-white transition-all duration-300 border-2 border-[#C4A91C]/40">
                              Lancer le scan caméra
                            </Button>
                          </div>
                        </>
                      )}
                      {scanError && <div className="text-red-500 text-sm mt-4">{scanError}</div>}
                    </>
                  )}
                  {scanned && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full max-w-md mx-auto"
                    >
                      <Card className="bg-white/10 border border-[#C4A91C]/30 shadow-xl mb-6">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-white">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                            QR scanné avec succès
                          </CardTitle>
                          <CardDescription className="text-white/70">Détails de la réservation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-white/90">
                            <div><span className="font-bold">ID réservation :</span> {scanned.id}</div>
                            <div><span className="font-bold">Client :</span> {scanned.client}</div>
                            <div><span className="font-bold">Véhicule :</span> {scanned.vehicule} ({scanned.type})</div>
                            <div><span className="font-bold">Date :</span> {scanned.date} à {scanned.heure}</div>
                            <div><span className="font-bold">Montant :</span> {scanned.montant} FCFA</div>
                          </div>
                          <div className="mt-4 flex gap-2 flex-wrap">
                            <Button variant="default" onClick={resetScan}>Scanner un autre</Button>
                            <Button variant="outline" onClick={addScannedToLocations}>Valider le début de location</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
              {/* CHAT AGENT SOUS LE SCAN */}
              <div className="mt-8">
                <Card className="backdrop-blur-2xl bg-white/10 border border-[#C4A91C]/30 shadow-2xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <MessageCircle className="h-6 w-6 text-[#C4A91C]" />
                      Chats actifs
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Messagerie instantanée avec les clients (mock localStorage, prêt backend).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 min-h-[320px] w-full">
                      {/* Inbox agent */}
                      <div className="w-full md:w-1/3 bg-white/5 rounded-xl p-2 shadow-inner border border-[#C4A91C]/10 h-72 overflow-y-auto">
                        <div className="font-bold text-white/80 text-xs mb-2 ml-2">Conversations</div>
                        {chatInbox.length === 0 && <div className="text-white/40 text-xs text-center mt-8">Aucune conversation</div>}
                        {chatInbox.map(conv => (
                          <button
                            key={conv.user}
                            onClick={() => openConversation(conv.user)}
                            className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex flex-col bg-white/10 hover:bg-[#C4A91C]/10 transition-all ${selectedUser === conv.user ? 'ring-2 ring-[#C4A91C]' : ''}`}
                          >
                            <span className="font-semibold text-white text-sm truncate">{conv.user}</span>
                            <span className="text-xs text-white/60 truncate">{conv.lastMsg}</span>
                          </button>
                        ))}
                      </div>
                      {/* Chatbox agent */}
                      <div className="flex-1 flex flex-col">
                        {selectedUser ? (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-bold text-white">{selectedUser}</span>
                            </div>
                            <div
                              ref={chatBoxRef}
                              className="flex-1 flex flex-col bg-white/5 rounded-xl p-4 gap-2 h-72 overflow-y-auto shadow-inner border border-[#C4A91C]/10"
                              tabIndex={0}
                              aria-live="polite"
                              aria-label="Messages du chat"
                            >
                              {chatMessages.length === 0 && <div className="text-white/40 text-xs text-center mt-8">Aucun message</div>}
                              {chatMessages.map((msg, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: msg.from === 'agent' ? -30 : 30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                                  className={`flex items-end gap-2 ${msg.from === 'agent' ? 'justify-start' : 'justify-end'} w-full`}
                                >
                                  {msg.from === 'agent' && (
                                    <span className="text-2xl select-none" aria-label="Avatar agent">🛡️</span>
                                  )}
                                  <span className={`px-3 py-2 rounded-2xl text-sm shadow-md ${msg.from === 'agent' ? 'bg-[#1B5B4A]/80 text-white' : 'bg-[#C4A91C]/90 text-black'} max-w-[70%] break-words`} tabIndex={0}>{msg.text}</span>
                                  {msg.from === 'client' && (
                                    <span className="text-2xl select-none" aria-label="Avatar client">👤</span>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                            <form onSubmit={handleSendMessage} className="w-full flex gap-2 mt-4" aria-label="Envoyer un message">
                              <input
                                type="text"
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                placeholder="Écrire un message..."
                                className="flex-1 rounded-xl px-4 py-2 bg-white/10 border border-[#C4A91C]/30 text-white placeholder:text-[#C4A91C]/50 focus:border-[#C4A91C] focus:ring-[#C4A91C]/30 focus:outline-none transition-all duration-300 shadow-inner"
                                autoFocus
                                aria-label="Saisir un message"
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSendMessage(); }}
                              />
                              <Button type="submit" variant="default" className="rounded-xl font-bold" aria-label="Envoyer">Envoyer</Button>
                            </form>
                          </>
                        ) : (
                          <div className="flex-1 flex items-center justify-center text-white/40 text-xs">Sélectionnez une conversation</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          )}
          {activeTab === 'locations' && (
            <motion.section
              key="locations"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Card className="backdrop-blur-2xl bg-white/10 border border-[#C4A91C]/30 shadow-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Car className="h-6 w-6 text-[#C4A91C]" />
                    Locations en cours & historiques
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Suivi des locations, statuts, alertes et actions rapides.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locations.map(loc => (
                      <motion.div
                        key={loc.id}
                        className={`flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl bg-white/10 border border-white/20 shadow-md gap-2 ${loc.limiteDepassee ? 'ring-2 ring-red-500' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                          <Badge className="bg-primary/80 text-white font-mono">{loc.id}</Badge>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-white font-semibold">{loc.client}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-primary" />
                            <span className="text-white">{loc.vehicule} ({loc.type})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-white">{loc.date} à {loc.heure}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={loc.statut === 'en cours' ? 'default' : loc.statut === 'terminée' ? 'secondary' : 'outline'}>
                              {loc.statut}
                            </Badge>
                            {loc.limiteDepassee && (
                              <span className="flex items-center text-red-500 font-bold text-xs"><AlertTriangle className="h-4 w-4 mr-1" /> Limite dépassée !</span>
                            )}
                            {!loc.limiteDepassee && loc.statut === 'en cours' && (
                              <span className="flex items-center text-green-500 text-xs"><CheckCircle className="h-4 w-4 mr-1" /> À l’heure</span>
                            )}
                          </div>
                        </div>
                        {/* Timeline animée */}
                        <div className="flex flex-col items-end gap-2 min-w-[160px]">
                          <div className="flex gap-1 mb-1">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${loc.timeline.includes('en attente') ? 'bg-yellow-400/80 text-black' : 'bg-white/10 text-white/50'}`}>En attente</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${loc.timeline.includes('démarrée') ? 'bg-green-400/80 text-black' : 'bg-white/10 text-white/50'}`}>Démarrée</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${loc.timeline.includes('terminée') ? 'bg-blue-400/80 text-black' : 'bg-white/10 text-white/50'}`}>Terminée</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AgentDashboard;