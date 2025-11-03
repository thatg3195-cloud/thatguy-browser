import React from 'react';
import { SearchEngine, SearchEngineOption } from '../types';

interface SearchEngineSelectorProps {
  engines: SearchEngineOption[];
  selectedEngine: SearchEngine;
  setSelectedEngine: (engine: SearchEngine) => void;
}

const SearchEngineSelector: React.FC<SearchEngineSelectorProps> = ({ engines, selectedEngine, setSelectedEngine }) => {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 mt-6">
      <span className="text-slate-500 text-sm hidden sm:block">Engines:</span>
      {engines.map((engine) => {
        const Icon = engine.icon;
        const isSelected = selectedEngine === engine.id;
        return (
          <button
            key={engine.id}
            onClick={() => setSelectedEngine(engine.id)}
            title={`Switch to ${engine.name}`}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110
              ${isSelected 
                ? 'bg-purple-600/30 text-slate-100 ring-2 ring-purple-500' 
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/70 hover:text-slate-200'
              }`}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden md:inline text-sm">{engine.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SearchEngineSelector;
