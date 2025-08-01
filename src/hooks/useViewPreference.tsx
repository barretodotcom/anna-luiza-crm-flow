import { useState, useEffect } from 'react';

export type ViewType = 'list' | 'board';

const VIEW_PREFERENCE_KEY = 'clientes-view-preference';

export const useViewPreference = () => {
  const [viewType, setViewType] = useState<ViewType>('list'); // Padrão é listagem

  useEffect(() => {
    const savedPreference = localStorage.getItem(VIEW_PREFERENCE_KEY) as ViewType;
    if (savedPreference && (savedPreference === 'list' || savedPreference === 'board')) {
      setViewType(savedPreference);
    }
  }, []);

  const toggleView = () => {
    const newViewType: ViewType = viewType === 'list' ? 'board' : 'list';
    setViewType(newViewType);
    localStorage.setItem(VIEW_PREFERENCE_KEY, newViewType);
  };

  const setView = (type: ViewType) => {
    setViewType(type);
    localStorage.setItem(VIEW_PREFERENCE_KEY, type);
  };

  return {
    viewType,
    toggleView,
    setView,
    isList: viewType === 'list',
    isBoard: viewType === 'board'
  };
};