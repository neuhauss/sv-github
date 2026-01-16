
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, Bot, X, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface Props {
  lang: Language;
}

export const GeminiAssistant: React.FC<Props> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const langNames = {
    en: "English",
    pt: "Portuguese (Brazilian)",
    es: "Spanish"
  };

  const askGemini = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a senior SUSE Architect. Answer technically about Harvester (SUSE Virtualization) v1.7. 
        MANDATORY: Respond in ${langNames[lang]}.
        Question: ${prompt}`,
        config: {
            systemInstruction: `You are an expert in SUSE Virtualization v1.7 (Harvester). Provide short, precise technical answers in ${langNames[lang]}. If you don't know, suggest consulting docs.harvesterhci.io.`
        }
      });
      setResponse(result.text || "Error processing response.");
    } catch (error) {
      setResponse(lang === 'pt' ? "Erro ao conectar." : lang === 'es' ? "Error al conectar." : "Error connecting.");
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
                  <Bot className="w-3 h-3" /> Technical Response
                </div>
                {response}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <Bot className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-[10px]">Ask about VLANs, Load Balancers or GPU on v1.7.</p>
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
                placeholder="..."
              />
              <button 
                onClick={askGemini} 
                disabled={loading}
                className="bg-suse-base text-white p-2 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
              >
                {loading ? <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"/> : <Send className="w-4 h-4" />}
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
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-xs whitespace-nowrap">AI Expert</span>
        </button>
      )}
    </div>
  );
};
