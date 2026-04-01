import React, { createContext, useContext, useState, useCallback } from 'react';

const TrainContext = createContext();

export const TrainProvider = ({ children }) => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [searchParams, setSearchParams] = useState({
    source: '',
    destination: '',
    date: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setSearch = useCallback((params) => {
    setSearchParams(params);
  }, []);

  const selectTrain = useCallback((train) => {
    setSelectedTrain(train);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTrain(null);
  }, []);

  const updateTrains = useCallback((trainList) => {
    setTrains(trainList);
  }, []);

  const setLoadingState = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  const setErrorState = useCallback((err) => {
    setError(err);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    trains,
    selectedTrain,
    searchParams,
    isLoading,
    error,
    setSearch,
    selectTrain,
    clearSelection,
    updateTrains,
    setLoadingState,
    setErrorState,
    clearError,
  };

  return <TrainContext.Provider value={value}>{children}</TrainContext.Provider>;
};

export const useTrain = () => {
  const context = useContext(TrainContext);
  if (!context) {
    throw new Error('useTrain must be used within TrainProvider');
  }
  return context;
};
