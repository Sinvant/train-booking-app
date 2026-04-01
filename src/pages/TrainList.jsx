import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrain } from '../context/TrainContext';
import { trainAPI } from '../services/api';
import TrainCard from '../components/TrainCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft } from 'lucide-react';

export default function TrainList() {
  const navigate = useNavigate();
  const {
    searchParams,
    isLoading,
    setLoadingState,
    error,
    setErrorState,
    clearError,
    updateTrains,
    trains
  } = useTrain();

  const [sortBy, setSortBy] = useState('departure');

  useEffect(() => {
    const fetchTrains = async () => {
      if (!searchParams.source || !searchParams.destination) {
        navigate('/');
        return;
      }

      setLoadingState(true);
      setErrorState(null);

      try {
        const data = await trainAPI.searchTrains(
          searchParams.source,
          searchParams.destination
        );
        updateTrains(data);
      } catch (err) {
        setErrorState('Failed to fetch trains. Please try again.');
        console.error(err);
      } finally {
        setLoadingState(false);
      }
    };

    fetchTrains();
  }, [searchParams, navigate]);

  const sortedTrains = [...(trains || [])].sort((a, b) => {
    if (sortBy === 'departure') {
      return a.departure.localeCompare(b.departure);
    }

    if (sortBy === 'price') {
      const priceA = 500 + (a.distance || 0) / 10;
      const priceB = 500 + (b.distance || 0) / 10;
      return priceA - priceB;
    }

    if (sortBy === 'duration') {
      const getDuration = (train) => {
        const [dh, dm] = train.departure.split(':').map(Number);
        const [ah, am] = train.arrival.split(':').map(Number);

        let duration = (ah * 60 + am) - (dh * 60 + dm);
        if (duration < 0) duration += 24 * 60;
        return duration;
      };

      return getDuration(a) - getDuration(b);
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4 transition"
          >
            <ArrowLeft size={20} />
            Back to Search
          </button>

          <h1 className="text-4xl font-bold text-gray-800">
            Trains from <span className="text-blue-600">{searchParams.source}</span> to{' '}
            <span className="text-blue-600">{searchParams.destination}</span>
          </h1>
        </div>

        {error && <ErrorMessage message={error} onClose={clearError} />}

        {isLoading ? (
          <LoadingSpinner message="Searching available trains..." />
        ) : (
          <>
            {sortedTrains.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  No Trains Found
                </h2>
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                  Search Again
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Sort By:
                  </h3>
                  <div className="flex gap-4">
                    {['departure', 'price', 'duration'].map(option => (
                      <button
                        key={option}
                        onClick={() => setSortBy(option)}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                          sortBy === option
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <p className="text-gray-600 font-semibold">
                    Found {sortedTrains.length} train
                    {sortedTrains.length !== 1 ? 's' : ''}
                  </p>

                  {sortedTrains.map((train) => (
                    <TrainCard
                      key={train._id}
                      train={train}
                      onSelectTrain={() => navigate(`/train/${train._id}`)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
