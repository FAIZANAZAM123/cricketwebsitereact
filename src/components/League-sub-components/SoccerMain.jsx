import React, { useState, useEffect } from "react";
import AlphaFilter from "../Filters/AlphaFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SoccerMain = () => {
  const [trigger, setTrigger] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [selectedMatchId, setselectedMatchId] = useState('');
  const [selectedMatchName, setselectedMatchName] = useState('');


  const odds = [
    "Match Odds"
  ]

  const [markets, setMarkets] = useState([]);

  const markets1 = [{
    "marketId": "1.166397338", "marketName": "MatchOdds", "marketStartTime": "2019 - 12 - 19T04: 45:00.000Z", "totalMatched": 35685.4, "runners":
      [{ "selectionId": 7461, "runnerName": "Pakistan", "handicap": 0, "sortPriority": 1 },
      { "selectionId": 7337, "runnerName": "Sri Lanka", "handicap": 0, "sortPriority": 2 },
      { "selectionId": 60443, "runnerName": "The Draw", "handicap": 0, "sortPriority": 3 }]
  },
  {
    "marketId": "1.166397339", "marketName": "Tied Match", "marketStartTime": "2019-12-19T04: 45:00.000Z", "totalMatched": 0, "runners":
      [{ "selectionId": 37302, "runnerName": "Yes", "handicap": 0, "sortPriority": 1 },
      { "selectionId": 37303, "runnerName": "No", "handicap": 0, "sortPriority": 2 }]
  }]


  const matches1 = [
    [
      {
        event: {
          id: "28529194",
          name: "ICC World Twenty20 2020",
          countryCode: "AU",
          timezone: "GMT",
          openDate: "2020-10-24T14:00:00.000Z"
        },
        marketCount: 1,
        scoreboard_id: "",
        selections: null,
        liability_type: "0",
        undeclared_markets: 1
      },
      {
        event: {
          id: "9838",
          name: "ICC World 301 2020",
          countryCode: "AU",
          timezone: "GMT",
          openDate: "2020-10-24T14:00:00.000Z"
        },
        marketCount: 1,
        scoreboard_id: "",
        selections: null,
        liability_type: "0",
        undeclared_markets: 1
      }

    ]
  ];

  const competitions1 = [
    {
      "competition": {
        "id": "12239005",
        "name": "French Open 2020"
      },
      "marketCount": 2,
      "competitionRegion": "International"
    },
    {
      "competition": {
        "id": "12194105",
        "name": "Australian Open 2020"
      },
      "marketCount": 2,
      "competitionRegion": "AUS"
    },
    {
      "competition": {
        "id": "9157389",
        "name": "ITF Antalya"
      },
      "marketCount": 3,
      "competitionRegion": "International"
    },
    {
      "competition": {
        "id": "12277180",
        "name": "WTA Limoges 2019"
      },
      "marketCount": 760,
      "competitionRegion": "FRA"
    },
    {
      "competition": {
        "id": "12277135",
        "name": "Tennis Exhibition Matches"
      },
      "marketCount": 4,
      "competitionRegion": "GBR"
    },
    {
      "competition": {
        "id": "10526104",
        "name": "Mubadala World Tennis Championship"
      },
      "marketCount": 8,
      "competitionRegion": "International"
    }
  ];




  const handleTrigger = () => {
    setTrigger(!trigger);
  };
  const handleTrigger2 = (marketId) => {
    setselectedMatchId(marketId);
    setTrigger2(!trigger2);
  };


  const handleCompetitionClick = (competition) => {
    setSelectedCompetition(competition);
    setTrigger(true);
  };

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch("http://142.93.36.1/api/v1/fetch_data?Action=listCompetitions&EventTypeID=1&limit=25");
        const data = await response.json();
        setCompetitions(data);
  
        const remainingCompetitions = await fetchRemainingCompetitions(data.length);
        setCompetitions(prevCompetitions => [...prevCompetitions, ...remainingCompetitions]);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
  
    const fetchRemainingCompetitions = async (skip) => {
      const response = await fetch(`http://142.93.36.1/api/v1/fetch_data?Action=listCompetitions&EventTypeID=1&limit=25&skip=${skip}`);
      return await response.json();
    };
  
    // Fetch competitions initially and set up a 5-minute interval
    fetchCompetitions();
    const intervalId = setInterval(fetchCompetitions, 300000); // 5 minutes in milliseconds
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const fetchMarkets = async (eventId) => {
    try {
      const response = await fetch(`http://142.93.36.1/api/v1/fetch_data?Action=listMarketTypes&EventID=${eventId}`);
      const data = await response.json();
      setMarkets(data);
    } catch (error) {
      console.error("Error fetching markets:", error.message);
    }
  };


  useEffect(() => {
    if (selectedMatchId) {
      fetchMarkets(selectedMatchId);
      
      const intervalId = setInterval(() => fetchMarkets(selectedMatchId), 300000); // 5 minutes in milliseconds

      return () => clearInterval(intervalId);
    }
  }, [selectedMatchId]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (selectedCompetition) {
          const response = await fetch(
            `http://142.93.36.1/api/v1/fetch_data?Action=listEvents&EventTypeID=1&CompetitionID=${selectedCompetition.competition.id}`
          );
  
          if (!response.ok) {
            throw new Error("Failed to fetch matches");
          }
  
          const data = await response.json();
          setMatches(data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error.message);
      }
    };
  
    fetchMatches();
    const intervalId = setInterval(fetchMatches, 300000); 
  
    return () => clearInterval(intervalId);
  }, [selectedCompetition]);

  return (
    <div className="px-4 py-2 flex gap-3">
      <AlphaFilter onActiveItemChange={() => { }} />
      <div>
        <div className="text-lg font-semibold text-[#1e1e1e] ml-2 mb-2">Competitions</div>
        <div className="bg-white rounded-xl">
          <div className="bg-white rounded-xl">
            {matches1.map((matchArray, index) => (
              <div key={index} className="px-4 py-4 flex flex-col gap-2 border-b border-gray-200 cursor-pointer">
                {matchArray.map((match, innerIndex) => (
                  <div key={innerIndex} className="flex justify-between items-center" onClick={() => handleCompetitionClick(match)}>
                    <p onClick={() => {
                      setselectedMatchId(match?.event?.id || '');
                      fetchMarkets(match.event.id)
                    }} className="text-lg font-semibold text-[#1e1e1e]">{match?.event?.name || 'Event Name Not Available'}</p>
                    <div>
                      <FontAwesomeIcon icon={faArrowRight} className="text-gray-500 text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>

      </div>

      {trigger && (
        <div className="fixed left-0 right-0 top-[51px] bottom-[78px] max-w-[480px] mx-auto  bg-[#EEF6FB] z-50 overflow-y-scroll">
          <header className="bg-black px-3 h-12 flex items-center gap-4 text-lg font-semibold text-white">
            <FontAwesomeIcon icon={faArrowLeft} onClick={handleTrigger} />
            <div>{selectedCompetition ? selectedCompetition.event.name : "Loading Matches..."}</div>
          </header>
          <div className="px-4 flex gap-3 p-2">
            <div className="flex flex-col gap-3 w-full">
              <div>
                <div className="bg-white rounded-xl">
                  {matches1.map((matchArray, index) => (
                    <div key={index} className="px-4 py-4 flex flex-col gap-2 border-b border-gray-200 cursor-pointer">
                      {matchArray.map((match, innerIndex) => (

                        <div
                          key={innerIndex}
                          className="flex justify-between items-center"

                        >


                        </div>
                      ))}
                    </div>
                  ))}

{selectedMatchId && (
  <div className="">
    {/* <h3>Markets for {selectedMatchName}</h3> */}
    {markets1 && markets1.map((market, index) => (
      <div className="flex flex-row" key={index}>
        {/* <p>{market.marketName}</p> */}
        {market.runners.map((runner, runnerIndex) => (
          <div className="flex flex-row" key={runnerIndex}>
            <p onClick={() => handleTrigger2(market.marketId, runner)} className="text-lg flex font-semibold text-[#1e1e1e]"> {`${runner.runnerName } `}</p>
          </div>
        ))}
        <div>
          <FontAwesomeIcon icon={faArrowRight} className="text-gray-500 text-sm" />
        </div>
        
      </div>
    ))}
  </div>
)}



                </div>
              </div>
            </div>









          </div>

        </div>
      )}
      {trigger2 && (
        <div className="fixed left-0 right-0 top-[51px] bottom-[78px] max-w-[480px] mx-auto  bg-[#EEF6FB] z-50 overflow-y-scroll">
          <header className="bg-black px-3 h-12 flex items-center gap-4 text-lg font-semibold text-white">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleTrigger2(selectedMatchId)} />
            <div>{selectedMatchName} </div>
          </header>
          <div className="px-4 flex gap-3 p-2">
            <div className="flex flex-col gap-3 w-full">
              <div className="bg-white rounded-xl">
                <Link to={`/match-details/${selectedMatchId}`} className="bg-white rounded-xl">
                  {odds.map((match, index) => (
                    <div
                      key={index}
                      className="px-4 py-4 flex justify-between items-center border-b border-gray-200 cursor-pointer"
                      onClick={() => handleTrigger2(selectedMatchId)}
                    >
                      <p className="text-lg font-semibold text-[#1e1e1e]">{match}</p>
                      <div>
                        <FontAwesomeIcon icon={faArrowRight} className="text-gray-500 text-sm" />
                      </div>
                    </div>
                  ))}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div >
  );
}

export default SoccerMain;
