import React, { useState, useEffect } from "react";
import BottomNav from "../components/Navigations/BottomNav";
import HomeMarquee from "../components/HomeMarquee";
import SportsNav from "../components/Navigations/SportsNav";
import FilterNav from "../components/Navigations/FilterNav";
import Dropdown from "../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faArrowDown, faArrowRight, faArrowUp, faStar } from '@fortawesome/free-solid-svg-icons';
import Accordion from "../components/Accordion";
import { Link } from "react-router-dom";


const Sports = () => {
  const [activeComponent, setActiveComponent] = useState('Cricket');


  const [matchList, setMatchList] = useState([]);
  const [matchScoreDetails, setmatchScoreDetails] = useState(null);
  const [activeMatches, setActiveMatches] = useState([]);

  const [fetchCounter, setFetchCounter] = useState(0);
  const [allActive, setAllActive] = useState(false);
  const handleActiveComponent = (data) => {
    setActiveComponent(data);
  }


  const staticData = {
    "message": "Match list fetched.",
    "code": 0,
    "error": false,
    "data": [
      {
        "match_id": 11839,
        "match_name": "Women Big Bash League 43rd T20 Match",
        "match_date": "17-Nov-2023 at 02:10PM-Thu",
        "venue": "Allan Border Field, Brisbane",
        "teams": [
          { "name": "M Renegades W" },
          { "name": "Brisbane Heat W" }
        ]
      },
      {
        "match_id": 11838,
        "match_name": "Women Big Bash League 42nd T20 Match",
        "match_date": "17-Nov-2023 at 10:40AM-Thu",
        "venue": "Allan Border Field, Brisbane",
        "teams": [
          { "name": "M Stars W" },
          { "name": "H Hurricanes W" }
        ]
      },
      {
        "match_id": 11779,
        "match_name": "ICC CWC 2023 2nd Semi-Final Match",
        "match_date": "16-Nov-2023 at 02:00PM-Thu",
        "venue": "Eden Gardens, Kolkata",
        "teams": [
          { "name": "Australia" },
          { "name": "South Africa" }
        ]
      },
      {
        "match_id": 11837,
        "match_name": "Women Big Bash League 41st T20 Match",
        "match_date": "16-Nov-2023 at 10:00AM-Thu",
        "venue": "North Sydney Oval, Sydney",
        "teams": [
          { "name": "S Sixers W" },
          { "name": "P Scorchers W" }
        ]
      }
    ],
    "token": null
  };



  // const handleAccordionToggle = async (matchId) => {
  //   try {


  //     const response = await fetch(`http://167.99.198.2/api/matches/score/${matchId}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     // Parse the response JSON
  //     const matchscoredata = await response.json();

  //     // Update the state with the fetched data
  //     setmatchScoreDetails(matchscoredata);
  //   } catch (error) {
  //     console.error('Error fetching match details', error);
  //   }
  // }

  // useEffect(() => {
  //   if (fetchCounter > 0) {
  //     const intervalId = setInterval(async () => {
  //       try {
  //         const response = await fetch(`http://167.99.198.2/api/matches/score/${matchId}`);
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }

  //         const matchscoredata = await response.json();
  //         setmatchScoreDetails(matchscoredata);

  //         // Increment the fetch counter
  //         setFetchCounter((prevCounter) => prevCounter + 1);
  //       } catch (error) {
  //         console.error('Error fetching match details', error);
  //       }
  //     }, 200); // Adjust the interval duration as needed

  //     // Cleanup: Clear the interval when the component is unmounted
  //     return () => clearInterval(intervalId);
  //   }
  // }, [fetchCounter]);





  const handleAccordionToggle = (matchId) => {
    // Add the matchId to the list of active matches
    setActiveMatches((prevMatches) => [...prevMatches, matchId]);

    // Trigger the initial fetch
    setFetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    // Fetch data continuously for each active match
    if (fetchCounter > 0) {
      const intervalId = setInterval(async () => {
        try {
          // Fetch data for each active match
          const updatedDetails = {};
          await Promise.all(
            activeMatches.map(async (matchId) => {
              const response = await fetch(`http://167.99.198.2/api/matches/score/${matchId}`);
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const matchScoreData = await response.json();
              updatedDetails[matchId] = matchScoreData;
            })
          );

          // Update match details state with the fetched data
          setmatchScoreDetails((prevDetails) => ({ ...prevDetails, ...updatedDetails }));

          // Increment the fetch counter
          setFetchCounter((prevCounter) => prevCounter + 1);
        } catch (error) {
          console.error('Error fetching match details', error);
        }
      }, 200); // Adjust the interval duration as needed

      // Cleanup: Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, [fetchCounter, activeMatches]);


  useEffect(() => {
    const intervalId = setInterval(async () => {
      const matchlistt = async () => {
        const response = await fetch("http://167.99.198.2/api/matches/list");
        const data = await response.json();
        const fetchedMatchList = data.data.map((match) => match);
        setMatchList(fetchedMatchList);
      };
      matchlistt();
    }, 300000);
  
    return () => clearInterval(intervalId);
  }, []);




  // for soccer

  const [trigger, setTrigger] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [selectedMatchId, setselectedMatchId] = useState('');
  const [selectedMatchName, setselectedMatchName] = useState('');
  const [marketOdds, setMarketOdds] = useState([]);

  const odds = [
    "Match Odds"
  ]

  const marketOdds1 = [{
    "marketId": "1.166536383", "isMarketDataDelayed": false, "status": "OPEN", "betDelay": 0, "bspReconciled": false, "complete": true, "inplay": false, "numberOfWinners": 1, "numberOfRunners": 3, "numberOfActiveRunners": 3, "lastMatchTime": "2019-12-20T05:23:08.702Z", "totalMatched": 4559.69, "totalAvailable": 278781.7, "crossMatching": true, "runnersVoidable": false, "version": 3088274180, "runners": [{ "selectionId": 8838647, "handicap": 0, "status": "ACTIVE", "lastPriceTraded": 6.4, "totalMatched": 66.32, "ex": { "availableToBack": [{ "price": 5.8, "size": 33.24 }, { "price": 5.3, "size": 101.57 }, { "price": 3, "size": 63.86 }], "availableToLay": [{ "price": 8.6, "size": 39.91 }, { "price": 8.8, "size": 101.57 }, { "price": 42, "size": 59.59 }], "tradedVolume": [] } }, { "selectionId": 4525658, "handicap": 0, "status": "ACTIVE", "lastPriceTraded": 1.36, "totalMatched": 4414.45, "ex": { "availableToBack": [{ "price": 1.36, "size": 684.33 }, { "price": 1.35, "size": 98.7 }, { "price": 1.34, "size": 222.31 }], "availableToLay": [{ "price": 1.43, "size": 58.59 }, { "price": 1.53, "size": 50.78 }, { "price": 1.57, "size": 419.68 }], "tradedVolume": [] } }, {
      "selectionId": 58805, "handicap": 0, "status": "ACTIVE", "lastPriceTraded": 5.4, "totalMatched": 78.91, "ex": {
        "availableToBack": [{ "price": 4.8, "size": 47.89 }, { "price": 4.5, "size": 117.51 },
        { "price": 3.1, "size": 51.89 }], "availableToLay": [{ "price": 7, "size": 62.15 },
        { "price": 7.2, "size": 101.57 }, { "price": 16, "size": 51.46 }], "tradedVolume": []
      }
    }]
  }]


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

    fetchCompetitions();

    const intervalId = setInterval(() => {
      fetchCompetitions();
    }, 300000);

    // Cleanup: Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const fetchMarkets = async (eventId) => {
    try {


      const response = await fetch(`http://142.93.36.1/api/v1/fetch_data?Action=listMarketTypes&EventID=${eventId}`);
      const data = await response.json();
      setMarkets(data);

      data.forEach((market) => {
        fetchMarketOdds(market.marketId);
      });
    } catch (error) {
      console.error("Error fetching markets:", error.message);
    }
  };

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


    const intervalId = setInterval(() => {
      fetchMatches();
    }, 300000);

    return () => clearInterval(intervalId);
  }, [selectedCompetition]);

  const fetchMarketOdds = async (marketId) => {
    try {
      const response = await fetch(`http://142.93.36.1/api/v1/listMarketBookOdds?market_id=${marketId}`);
      const data = await response.json();

      setMarketOdds((prevMarketOdds) => [...prevMarketOdds, { marketId, data }]);


      console.log(data);
    } catch (error) {
      console.error("Error fetching market odds:", error.message);
    }
  };


  const handleAccordionClick = (eventId) => {
    // Initial fetch when the accordion is clicked
    fetchMarkets(eventId);

    // Set interval to fetch markets every 200 milliseconds (adjust as needed)
    const intervalId = setInterval(() => {
      fetchMarkets(eventId);
    }, 200);

    // Cleanup: Clear the interval when the component is unmounted or the accordion is closed
    return () => clearInterval(intervalId);
  };


  // for tennis 



  const [competitionstennis, setCompetitionstennis] = useState([]);
  const [matchestennis, setMatchestennis] = useState([]);
  const [selectedCompetitiontennis, setSelectedCompetitiontennis] = useState(null);
  const [selectedMatchIdtennis, setselectedMatchIdtennis] = useState('');
  const [selectedMatchNametennis, setselectedMatchNametennis] = useState('');
  const [marketOddstennis, setMarketOddstennis] = useState([]);



  const marketOddstennis1 = [{
    "marketId": "1.166536383", "isMarketDataDelayed": false, "status": "OPEN", "betDelay": 0, "bspReconciled": false, "complete": true, "inplay": false, "numberOfWinners": 1, "numberOfRunners": 3, "numberOfActiveRunners": 3, "lastMatchTime": "2019-12-20T05:23:08.702Z", "totalMatched": 4559.69, "totalAvailable": 278781.7, "crossMatching": true, "runnersVoidable": false, "version": 3088274180, "runners": [{ "selectionId": 8838647, "handicap": 0, "status": "ACTIVE", "lastPriceTraded": 6.4, "totalMatched": 66.32, "ex": { "availableToBack": [{ "price": 5.8, "size": 33.24 }, { "price": 5.3, "size": 101.57 }, { "price": 3, "size": 63.86 }], "availableToLay": [{ "price": 8.6, "size": 39.91 }, { "price": 8.8, "size": 101.57 }, { "price": 42, "size": 59.59 }], "tradedVolume": [] } }, { "selectionId": 4525658, "handicap": 0, "status": "ACTIVE", "lastPriceTraded": 1.36, "totalMatched": 4414.45, "ex": { "availableToBack": [{ "price": 1.36, "size": 684.33 }, { "price": 1.35, "size": 98.7 }, { "price": 1.34, "size": 222.31 }], "availableToLay": [{ "price": 1.43, "size": 58.59 }, { "price": 1.53, "size": 50.78 }, { "price": 1.57, "size": 419.68 }], "tradedVolume": [] } }, {
      "selectionId": 58805, "handicap": 0, "status": "ACTIVE", "lastPriceTraded": 5.4, "totalMatched": 78.91, "ex": {
        "availableToBack": [{ "price": 4.8, "size": 47.89 }, { "price": 4.5, "size": 117.51 },
        { "price": 3.1, "size": 51.89 }], "availableToLay": [{ "price": 7, "size": 62.15 },
        { "price": 7.2, "size": 101.57 }, { "price": 16, "size": 51.46 }], "tradedVolume": []
      }
    }]
  }]


  const [marketstennis, setMarketstennis] = useState([]);

  const marketstennis1 = [{
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


  const matchestennis1 = [
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

  const competitionstennis1 = [
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






  const handleCompetitionClick1 = (competition) => {
    setSelectedCompetitiontennis(competition);

  };

  useEffect(() => {
    const fetchCompetitionstennis = async () => {
      try {
        const response = await fetch("http://142.93.36.1/api/v1/fetch_data?Action=listCompetitions&EventTypeID=2&limit=25");
        const data = await response.json();
        setCompetitionstennis(data);

        const remainingCompetitions = await fetchRemainingCompetitionstennis(data.length);
        setCompetitionstennis(prevCompetitions => [...prevCompetitions, ...remainingCompetitions]);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    const fetchRemainingCompetitionstennis = async (skip) => {
      const response = await fetch(`http://142.93.36.1/api/v1/fetch_data?Action=listCompetitions&EventTypeID=2&limit=25&skip=${skip}`);
      return await response.json();
    };

    fetchCompetitionstennis();

    const intervalId = setInterval(() => {
      fetchCompetitionstennis();
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);
  const fetchMarketstennis = async (eventId) => {
    try {


      const response = await fetch(`http://142.93.36.1/api/v1/fetch_data?Action=listMarketTypes&EventID=${eventId}`);
      const data = await response.json();
      setMarketstennis(data);

      data.forEach((market) => {
        fetchMarketOddstennis(market.marketId);
      });
    } catch (error) {
      console.error("Error fetching markets:", error.message);
    }
  };

  const handleAccordionClicktennis = (eventId) => {
    // Initial fetch when the accordion is clicked
    fetchMarketstennis(eventId);

    const intervalId = setInterval(() => {
      fetchMarketstennis(eventId);
    }, 200);

    // Cleanup: Clear the interval when the component is unmounted or the accordion is closed
    return () => clearInterval(intervalId);
  };



  useEffect(() => {
    const fetchMatchestennis = async () => {
      try {
        if (selectedCompetitiontennis) {
          const response = await fetch(
            `http://142.93.36.1/api/v1/fetch_data?Action=listEvents&EventTypeID=2&CompetitionID=${selectedCompetition.competition.id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch matches");
          }

          const data = await response.json();
          setMatchestennis(data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error.message);
      }
    };

    fetchMatchestennis();

    const intervalId = setInterval(() => {
      fetchMatchestennis();
    }, 300000);

    return () => clearInterval(intervalId);


  }, [selectedCompetitiontennis]);

  const fetchMarketOddstennis = async (marketId) => {
    try {
      const response = await fetch(`http://142.93.36.1/api/v1/listMarketBookOdds?market_id=${marketId}`);
      const data = await response.json();

      setMarketOddstennis((prevMarketOdds) => [...prevMarketOdds, { marketId, data }]);


      console.log(data);
    } catch (error) {
      console.error("Error fetching market odds:", error.message);
    }
  };





  ///for cricket odds
  const [marketDataList, setMarketDataList] = useState([]);


  useEffect(() => {
    const fetchMarketData = async (eventId) => {
      try {
        const marketTypesResponse = await fetch(`http://142.93.36.1/api/v1/fetch_data?Action=listMarketTypes&EventID=${eventId}`);
        const marketTypesData = await marketTypesResponse.json();

        const marketDataPromises = marketTypesData.map(async (market) => {
          const marketOddsResponse = await fetch(`http://142.93.36.1/api/v1/listMarketBookOdds?market_id=${market.marketId}`);
          return await marketOddsResponse.json();
        });

        const marketDataArray = await Promise.all(marketDataPromises);

        setMarketDataList((prevList) => [...prevList, ...marketDataArray]);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };
    matchList.forEach((match) => {
      fetchMarketData(match.match_id);
    });

    const intervalId = setInterval(() => {
      let counter = 0;
      const fetchMarketDataFiveTimes = () => {
        if (counter < 5) {
          matchList.forEach((match) => {
            fetchMarketData(match.match_id);
          });
          counter++;
        } else {
          clearInterval(intervalId); 
        }
      };
      fetchMarketDataFiveTimes();
    }, 200);
    return () => clearInterval(intervalId);
  }, [matchList]);

  return (
    <div>
      <HomeMarquee />
      <BottomNav bottomActive='Sports' />
      <FilterNav
        switcherLabel="Parlay"
      />
      <SportsNav activeItem="Sports" onActiveItemChange={handleActiveComponent} />
      <div className="p-2 flex justify-between">
        <Dropdown />
        <button
          className="flex gap-2 items-center bg-white px-4 py-2 text-sm rounded-md font-normal text-gray-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={() => setAllActive(!allActive)}
        >
          All
          <FontAwesomeIcon icon={allActive ? faArrowUp : faArrowDown} className="text-gray-600" />
        </button>
      </div>

      <div className="p-2.5">
        <div className=" flex justify-between items-center mb-3">
          <div className=" flex gap-3 items-center">
            <span className=" w-1 h-6 rounded-sm bg-[#1e1e1e]"></span>
            <h2 className=" font-semibold text-[#1e1e1e] text-xl">Cricket</h2>
          </div>
          <button
            className="flex gap-2 items-center bg-white px-4 py-2 text-sm rounded-md font-normal text-gray-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={() => setAllActive(!allActive)}
          >
            All
            <FontAwesomeIcon icon={allActive ? faArrowUp : faArrowDown} className="text-gray-600" />
          </button>
        </div>



        {matchList.map((match, index) => (
          <div key={match.match_id} className="flex flex-col gap-2">
            <Accordion count={index + 1} heading={match.match_name} onClick={() => handleAccordionToggle(match.match_id)}>
              <Link to={`/match-details/${match.match_id}`} className="cursor-pointer">

                <div className=" flex flex-col gap-2">
                  <div className=" flex items-center justify-between">
                    <div className=" flex gap-2 items-center">
                      <FontAwesomeIcon icon={faStar} className=" text-gray-400 text-xl" />
                      <div className=" flex flex-col justify-start gap-[2px]">
                        <div className=" flex gap-1">
                          <div className=" px-1 py-[1px] text-white bg-green-500 text-[10px] font-semibold">In-Play</div>
                        </div>
                        <div className="flex">
                          {match.teams.map((team, index) => (
                            <div key={index} className="text-base">
                              {index > 0 && <span className="text-gray-400 mx-1">-</span>}
                              {team.name}
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-primary font-semibold">
                      <div className="text-xl">
                        {match.data && match.data.teams ? (
                          `${match.data.teams[0].score} : ${match.data.teams[1].score}`
                        ) : (
                          '0 : 0'
                        )}
                      </div>
                      <FontAwesomeIcon icon={faAngleRight} className="text-lg text-gray-400" />
                    </div>

                  </div>
                  <div className=" flex flex-col gap-[1px] rounded-md">
                    <div className=" bg-primary rounded-t-md flex justify-between items-center">
                      <div className=" flex items-baseline gap-1 text-white ml-2 w-9/12">
                        <div className=" text-lg font-semibold">Match Odds</div>
                        <div className=" text-sm font-normal ml-1">Matched <span className="font-semibold">56,6900</span></div>
                      </div>
                      <div className=" h-5/6 border-l text-white border-white flex items-center text-sm w-4/12">
                        <p className=" w-1/2 text-center">Back</p>
                        <p className=" w-1/2 text-center">Lay</p>
                      </div>
                    </div>
                    <div className=" bg-[#eef6fb] rounded-t-md flex justify-between items-center text-black">
                      <div className=" ml-2 w-9/12">
                        <div className=" text-lg font-semibold">{match.teams[0].name}</div>
                      </div>

                      {/* <div className=" h-5/6 flex items-center gap-[2px] text-sm w-4/12 relative">
                          <div className=" absolute top-0 left-0 right-0 bottom-0 bg-blue-400 bg-opacity-80 rounded-md flex items-center justify-center font-semibold">Suspended</div>
                          <div className=" w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                            <p className=" text-lg font-semibold">1.27</p>
                            <p className=" text-xs font-normal">8,413.3</p>
                          </div>
                          <div className=" w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                            <p className=" text-lg font-semibold">1.27</p>
                            <p className=" text-xs font-normal">8,413.3</p>
                          </div>
                        </div> */}

                      <div className="h-5/6 flex items-center gap-[2px] text-sm w-4/12 relative">
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-400 bg-opacity-80 rounded-md flex items-center justify-center font-semibold">
                          Suspended
                        </div>
                        {marketDataList.length > 0 && (
                          <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                            <p className="text-lg font-semibold">{marketDataList[index]?.runners[0]?.ex.availableToBack[0]?.price}</p>
                            <p className="text-xs font-normal">{marketDataList[index]?.runners[0]?.ex.availableToBack[0]?.size}</p>
                          </div>
                        )}
                        {marketDataList.length > 0 && (
                          <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                            <p className="text-lg font-semibold">{marketDataList[index]?.runners[0]?.ex.availableToLay[0]?.price}</p>
                            <p className="text-xs font-normal">{marketDataList[index]?.runners[0]?.ex.availableToLay[0]?.size}</p>
                          </div>
                        )}
                      </div>


                    </div>


                    {match.teams.map((team, index) => (
                      <div key={index} className="bg-[#eef6fb] rounded-t-md flex justify-between items-center text-black">
                        <div className="ml-2 w-9/12">
                          <div className="text-lg font-semibold">{team.name}</div>
                        </div>
                        <div className="h-5/6 flex items-center gap-[2px] text-sm w-4/12">



                          {marketDataList.length > 0 && (
                            <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                              <p className="text-lg font-semibold">{marketDataList[index]?.runners[0]?.ex.availableToBack[0]?.price}</p>
                              <p className="text-xs font-normal">{marketDataList[index]?.runners[0]?.ex.availableToBack[0]?.size}</p>
                            </div>
                          )}


                          {marketDataList.length > 0 && (
                            <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                              <p className="text-lg font-semibold">{marketDataList[index]?.runners[0]?.ex.availableToLay[0]?.price}</p>
                              <p className="text-xs font-normal">{marketDataList[index]?.runners[0]?.ex.availableToLay[0]?.size}</p>
                            </div>
                          )}

                        </div>

                      </div>
                    ))}

                  </div>
                </div>

              </Link>
            </Accordion>


          </div>
        ))}
      </div>





















































































      <div className="p-2.5">
        <div className=" flex justify-between items-center mb-3">
          <div className=" flex gap-3 items-center">
            <span className=" w-1 h-6 rounded-sm bg-[#1e1e1e]"></span>
            <h2 className=" font-semibold text-[#1e1e1e] text-xl">Football</h2>
          </div>
          <button
            className="flex gap-2 items-center bg-white px-4 py-2 text-sm rounded-md font-normal text-gray-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={() => setAllActive(!allActive)}
          >
            All
            <FontAwesomeIcon icon={allActive ? faArrowUp : faArrowDown} className="text-gray-600" />
          </button>
        </div>
        <div className=" flex flex-col gap-1">





          {matches.map((matchArray, index) => (
            matchArray.map((match, innerIndex) => (
              <Accordion onClick={() => handleAccordionClick(match.event.id)}
              key={index} count={index + 1} heading={match?.event?.name || 'Event Name Not Available'}>
                <div key={innerIndex} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl" />
                      <div className="flex flex-col justify-start gap-[2px]">
                        <div className="flex gap-1">
                          <div className="px-1 py-[1px] text-white bg-green-500 text-[10px] font-semibold">In-Play</div>
                        </div>
                        <div className="text-base">{match?.event?.name || 'Event Name Not Available'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-primary font-semibold">
                      <div className="text-xl">0 : 0</div>
                      <FontAwesomeIcon icon={faAngleRight} className="text-lg text-gray-400" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[1px] rounded-md">
                    {markets.map((market) => (
                      <div key={market.marketId} className="bg-primary rounded-t-md flex justify-between items-center">
                        <div className="flex items-baseline gap-1 text-white ml-2 w-9/12">
                          <div className="text-lg font-semibold">{market.marketName}</div>
                          <div className="text-sm font-normal ml-1">Matched <span className="font-semibold">{market.totalMatched}</span></div>
                        </div>
                        <div className="h-5/6 border-l text-white border-white flex items-center text-sm w-4/12">
                          <p className="w-1/2 text-center">Back</p>
                          <p className="w-1/2 text-center">Lay</p>
                        </div>
                      </div>
                    ))}


                    {markets.map((market) => (
                      <div key={market.marketId} className="bg-[#eef6fb] rounded-t-md flex flex-col justify-between items-center text-black">
                        {market.runners.map((runner) => {
                          // Find the corresponding market odds data for the current runner
                          const marketOdd = marketOdds.find((mo) => mo.marketId === market.marketId);
                          const runnerData = marketOdd?.data.find((data) => data.selectionId === runner.selectionId);

                          return (
                            <div key={runner.selectionId} className="flex items-center justify-between w-full">
                              <div className="ml-2 w-9/12">
                                <div className="text-lg font-semibold">{runner.runnerName}</div>
                              </div>
                              <div className="h-5/6 flex items-center gap-[2px] text-sm w-4/12 relative">
                                {marketOdds.map((market) => (
                                  market.runners.map((runner) => (
                                    <div key={runner.selectionId} className="h-5/6 flex items-center gap-[2px] text-sm w-4/12 relative">
                                      {/* Display availableToLay values */}
                                      <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-pink-400 rounded-md text-black">
                                        {runner?.ex?.availableToLay.map((lay, layIndex) => (
                                          <div key={layIndex}>
                                            <p className="text-lg font-semibold">{lay.price}</p>
                                            <p className="text-xs font-normal">{lay.size}</p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                                        {runner?.ex?.availableToBack.map((back, backIndex) => (
                                          <div key={backIndex}>
                                            <p className="text-lg font-semibold">{back.price}</p>
                                            <p className="text-xs font-normal">{back.size}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))
                                ))}

                              </div>

                            </div>
                          );
                        })}
                      </div>
                    ))}



                  </div>
                </div>
              </Accordion>
            ))
          ))}







        </div>
      </div>
      <div className="p-2.5">
        <div className=" flex justify-between items-center mb-3">
          <div className=" flex gap-3 items-center">
            <span className=" w-1 h-6 rounded-sm bg-[#1e1e1e]"></span>
            <h2 className=" font-semibold text-[#1e1e1e] text-xl">Tennis</h2>
          </div>
          <button
            className="flex gap-2 items-center bg-white px-4 py-2 text-sm rounded-md font-normal text-gray-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={() => setAllActive(!allActive)}
          >
            All
            <FontAwesomeIcon icon={allActive ? faArrowUp : faArrowDown} className="text-gray-600" />
          </button>
        </div>
        <div className=" flex flex-col gap-1">





          {matchestennis.map((matchArray, index) => (
            matchArray.map((match, innerIndex) => (
              <Accordion onClick={() => handleAccordionClicktennis(match.event.id)} key={index} count={index + 1} heading={match?.event?.name || 'Event Name Not Available'}>
                <div key={innerIndex} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl" />
                      <div className="flex flex-col justify-start gap-[2px]">
                        <div className="flex gap-1">
                          <div className="px-1 py-[1px] text-white bg-green-500 text-[10px] font-semibold">In-Play</div>
                        </div>
                        <div className="text-base">{match?.event?.name || 'Event Name Not Available'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-primary font-semibold">
                      <div className="text-xl">0 : 0</div>
                      <FontAwesomeIcon icon={faAngleRight} className="text-lg text-gray-400" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[1px] rounded-md">
                    {marketstennis.map((market) => (
                      <div key={market.marketId} className="bg-primary rounded-t-md flex justify-between items-center">
                        <div className="flex items-baseline gap-1 text-white ml-2 w-9/12">
                          <div className="text-lg font-semibold">{market.marketName}</div>
                          <div className="text-sm font-normal ml-1">Matched <span className="font-semibold">{market.totalMatched}</span></div>
                        </div>
                        <div className="h-5/6 border-l text-white border-white flex items-center text-sm w-4/12">
                          <p className="w-1/2 text-center">Back</p>
                          <p className="w-1/2 text-center">Lay</p>
                        </div>
                      </div>
                    ))}


                    {marketstennis.map((market) => (
                      <div key={market.marketId} className="bg-[#eef6fb] rounded-t-md flex flex-col justify-between items-center text-black">
                        {market.runners.map((runner) => {
                          // Find the corresponding market odds data for the current runner
                          const marketOdd = marketOddstennis.find((mo) => mo.marketId === market.marketId);
                          const runnerData = marketOdd?.data.find((data) => data.selectionId === runner.selectionId);

                          return (
                            <div key={runner.selectionId} className="flex items-center justify-between w-full">
                              <div className="ml-2 w-9/12">
                                <div className="text-lg font-semibold">{runner.runnerName}</div>
                              </div>
                              <div className="h-5/6 flex items-center gap-[2px] text-sm w-4/12 relative">
                                {marketOddstennis.map((market) => (
                                  market.runners.map((runner) => (
                                    <div key={runner.selectionId} className="h-5/6 flex items-center gap-[2px] text-sm w-4/12 relative">
                                      {/* Display availableToLay values */}
                                      <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-pink-400 rounded-md text-black">
                                        {runner?.ex?.availableToLay.map((lay, layIndex) => (
                                          <div key={layIndex}>
                                            <p className="text-lg font-semibold">{lay.price}</p>
                                            <p className="text-xs font-normal">{lay.size}</p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                                        {runner?.ex?.availableToBack.map((back, backIndex) => (
                                          <div key={backIndex}>
                                            <p className="text-lg font-semibold">{back.price}</p>
                                            <p className="text-xs font-normal">{back.size}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))
                                ))}

                              </div>

                            </div>
                          );
                        })}
                      </div>
                    ))}



                  </div>
                </div>
              </Accordion>
            ))
          ))}







        </div>
      </div>



    </div>
  )
}

export default Sports;
