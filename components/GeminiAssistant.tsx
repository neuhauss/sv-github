
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, Bot, X, Sparkles, AlertCircle } from 'lucide-react';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Aja como um arquiteto sênior da SUSE. Responda tecnicamente sobre o Harvester (SUSE Virtualization) v1.7. Pergunta: ${prompt}`,
        config: {
            systemInstruction: "Você é um especialista em SUSE Virtualization v1.7 (Harvester). Forneça respostas curtas, precisas e baseadas na documentação oficial. Se não souber, peça para consultar o docs.harvesterhci.io."
        }
      });
      setResponse(result.text || "Desculpe, não consegui gerar uma resposta.");
    } catch (error) {
      setResponse("Erro ao conectar com a inteligência artificial. Verifique sua chave de API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] no-print">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-gray-100 flex flex-col animate-slide-up overflow-hidden">
          <div className="bg-suse-dark p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-suse-base" />
              <span className="font-bold text-sm">v1.7 Expert Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto bg-gray-50 custom-scrollbar">
            {response ? (
              <div className="bg-white p-3 rounded-lg border border-gray-200 text-xs text-gray-700 leading-relaxed shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-suse-base font-bold uppercase text-[9px] tracking-widest">
                  <Bot className="w-3 h-3" /> Resposta Técnica
                </div>
                {response}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <Bot className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-[10px]">Tire dúvidas sobre VLANs, Load Balancers ou GPU na v1.7.</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && askGemini()}
                className="flex-1 bg-gray-100 border-none rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-suse-base"
                placeholder="Ex: Como configurar vGPU?"
              />
              <button 
                onClick={askGemini} 
                disabled={loading}
                className="bg-suse-base text-white p-2 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[8px] text-gray-400 mt-2 text-center">Powered by Gemini 3 Flash</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-suse-dark text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all flex items-center gap-2 group"
        >
          <Sparkles className="w-6 h-6 text-suse-base animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-xs whitespace-nowrap">Dúvida Técnica?</span>
        </button>
      )}
    </div>
  );
};

const RefreshCw = ({className}: {className: string}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
)
