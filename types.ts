// Fix: Import React to provide React namespace for types.
import React from 'react';

export enum SearchEngine {
  Yandex = 'yandex',
  Google = 'google',
  DuckDuckGo = 'duckduckgo',
  Bing = 'bing',
}

export interface SearchEngineOption {
  id: SearchEngine;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  baseUrl: string;
  queryParam: string;
}