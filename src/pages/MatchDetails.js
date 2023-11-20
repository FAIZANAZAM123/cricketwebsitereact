import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Accordion from "../components/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDown, faChartBar, faStar } from "@fortawesome/free-solid-svg-icons";
import DetailTableFilter from '../components/Filters/DetailTableFilter';
import Footer from '../components/Footer';
import SportAccordion from '../components/SportAccordion';

import { useParams } from 'react-router-dom';

const MatchDetails = () => {
  const [activeTab, setActiveTab] = useState('Fancybet');


  const [MatchDetails, setMatchDetails] = useState(null);

  const [marketData, setMarketData] = useState([]);


  const [bookmakerData, setBookmakerData] = useState([]);


  const { matchId } = useParams();
  const [activeComponent, setActiveComponent] = useState('Fancybet');
  const handleActiveComponent = (data) => {
    setActiveComponent(data);
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // useEffect(() => {
  //   const fetchMarketTypes = async (eventID) => {
  //     const marketTypesUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listMarketTypes&EventID=${matchId}`;

  //     try {
  //       const response = await fetch(marketTypesUrl);
  //       const marketTypes = await response.json();

  //       const marketIds = marketTypes.map(market => market.marketId);

  //       fetchMarketDetails(marketIds);
  //     } catch (error) {
  //       console.error('Error fetching market types:', error);
  //     }
  //   };

  //   const fetchMarketDetails = async (marketIds) => {
  //     const detailedMarketData = [];

  //     for (const marketId of marketIds) {
  //       const marketDetailsUrl = `http://142.93.36.1/api/v1/fetch_data?Action=getMarketDetails&MarketID=${marketId}`;

  //       try {
  //         const response = await fetch(marketDetailsUrl);
  //         const marketDetails = await response.json();
  //         detailedMarketData.push(marketDetails);
  //       } catch (error) {
  //         console.error(`Error fetching market details for market ID ${marketId}:`, error);
  //       }
  //     }

  //     setMarketData(detailedMarketData);
  //   };
  //   fetchMarketTypes(matchId);
  // }, []);


  useEffect(() => {
    const fetchMarketTypes = async (eventID) => {
      const marketTypesUrl = `http://142.93.36.1/api/v1/fetch_data?Action=listMarketTypes&EventID=${matchId}`;

      try {
        const response = await fetch(marketTypesUrl);
        const marketTypes = await response.json();

        const marketIds = marketTypes.map(market => market.marketId);

        fetchMarketDetails(marketIds);
      } catch (error) {
        console.error('Error fetching market types:', error);
      }
    };

    const fetchMarketDetails = async (marketIds) => {
      const detailedMarketData = [];

      for (const marketId of marketIds) {
        const marketDetailsUrl = `http://142.93.36.1/api/v1/fetch_data?Action=getMarketDetails&MarketID=${marketId}`;

        try {
          const response = await fetch(marketDetailsUrl);
          const marketDetails = await response.json();
          detailedMarketData.push(marketDetails);
        } catch (error) {
          console.error(`Error fetching market details for market ID ${marketId}:`, error);
        }
      }

    };
    fetchMarketTypes(matchId);
    const intervalId = setInterval(() => {
      fetchMarketTypes(matchId);
    }, 200);
    return () => clearInterval(intervalId);
  }, [matchId]);



  useEffect(() => {
    const apiUrl = `https://167.99.198.2/match-details/${matchId}`;

    // Function to fetch match details
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Match details:', data);
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    };

    fetchMatchDetails();

    const intervalId = setInterval(() => {
      fetchMatchDetails();
    }, 200);

    return () => clearInterval(intervalId);
  }, [matchId]);




  const bookmakerDatat = [
    {
      "marketId": "9991.207867704_bm1",
      "marketName": "Bookmaker",
      "marketStartTime": "",
      "totalMatched": 0,
      "runners": [
        { "selectionId": 3, "runnerName": "The Draw", "sortPriority": 3 },
        { "selectionId": 2, "runnerName": "Australia", "sortPriority": 2 },
        { "selectionId": 1, "runnerName": "England", "sortPriority": 1 }
      ]
    },
    {
      "marketId": "9991.207867704_bm1",
      "evid": "31978934",
      "isMarketDataDelayed": false,
      "status": "OPEN",
      "betDelay": 0,
      "bspReconciled": false,
      "complete": true,
      "inplay": true,
      "numberOfWinners": 1,
      "numberOfRunners": 3,
      "numberOfActiveRunners": 3,
      "lastMatchTime": "",
      "totalMatched": 0,
      "totalAvailable": 0,
      "crossMatching": true,
      "runnersVoidable": false,
      "version": 0,
      "runners": [
        {
          "selectionId": 3,
          "runnerName": "The Draw",
          "handicap": 0,
          "status": "ACTIVE",
          "lastPriceTraded": 0,
          "ex": {
            "availableToBack": [
              { "price": 7.25, "price1": 625, "size": "25000.00" },
              { "price": 1, "price1": 0, "size": "0.00" },
              { "price": 1, "price1": 0, "size": "0.00" }
            ],
            "availableToLay": [
              { "price": 7.75, "price1": 675, "size": "25000.00" },
              { "price": 1, "price1": 0, "size": "0.00" },
              { "price": 1, "price1": 0, "size": "0.00" }
            ],
            "tradedVolume": []
          },
          "back": [
            { "price": 7.25, "price1": 625, "size": "25000.00" },
            { "price": 1, "price1": 0, "size": "0.00" },
            { "price": 1, "price1": 0, "size": "0.00" }
          ],
          "lay": [
            { "price": 7.75, "price1": 675, "size": "25000.00" },
            { "price": 1, "price1": 0, "size": "0.00" },
            { "price": 1, "price1": 0, "size": "0.00" }
          ]
        },
      ],
      "rem": "Zimbabwe vs Netherlands Match Bet Started In Our Exchange",
      "mname": "Bookmaker",
      "min": "100.00",
      "max": "500000.00"
    }
  ];


  const marketDatat = [
    {
      "marketId": "1.166536383",
      "marketName": "Match Odds",
      "marketStartTime": "2019-12-19T04:45:00.000Z",
      "totalMatched": 35685.4,
      "runners": [
        { "selectionId": 7461, "runnerName": "Pakistan", "handicap": 0, "sortPriority": 1 },
        { "selectionId": 7337, "runnerName": "Sri Lanka", "handicap": 0, "sortPriority": 2 },
        { "selectionId": 60443, "runnerName": "The Draw", "handicap": 0, "sortPriority": 3 }
      ]
    },
    {
      "marketId": "1.166397339",
      "marketName": "Tied Match",
      "marketStartTime": "2019-12-19T04:45:00.000Z",
      "totalMatched": 0,
      "runners": [
        { "selectionId": 37302, "runnerName": "Yes", "handicap": 0, "sortPriority": 1 },
        { "selectionId": 37303, "runnerName": "No", "handicap": 0, "sortPriority": 2 }
      ]
    }
    ,


    {
      "marketId": "1.166536383",
      "isMarketDataDelayed": false,
      "status": "OPEN",
      "betDelay": 0,
      "bspReconciled": false,
      "complete": true,
      "inplay": false,
      "numberOfWinners": 1,
      "numberOfRunners": 3,
      "numberOfActiveRunners": 3,
      "lastMatchTime": "2019-12-20T05:23:08.702Z", // Corrected date and time format
      "totalMatched": 4559.69,
      "totalAvailable": 278781.7,
      "crossMatching": true,
      "runnersVoidable": false,
      "version": 3088274180,
      "runners": [
        {
          "selectionId": 8838647,
          "handicap": 0,
          "status": "ACTIVE",
          "lastPriceTraded": 6.4,
          "totalMatched": 66.32,
          "ex": {
            "availableToBack": [
              { "price": 5.8, "size": 33.24 },
              { "price": 5.3, "size": 101.57 },
              { "price": 3, "size": 63.86 }
            ],
            "availableToLay": [
              { "price": 8.6, "size": 39.91 },
              { "price": 8.8, "size": 101.57 },
              { "price": 42, "size": 59.59 }
            ],
            "tradedVolume": []
          }
        },
        {
          "selectionId": 4525658,
          "handicap": 0,
          "status": "ACTIVE",
          "lastPriceTraded": 1.36,
          "totalMatched": 4414.45,
          "ex": {
            "availableToBack": [
              { "price": 1.36, "size": 684.33 },
              { "price": 1.35, "size": 98.7 },
              { "price": 1.34, "size": 222.31 }
            ],
            "availableToLay": [
              { "price": 1.43, "size": 58.59 },
              { "price": 1.53, "size": 50.78 },
              { "price": 1.57, "size": 419.68 }
            ],
            "tradedVolume": []
          }
        },
        {
          "selectionId": 58805,
          "handicap": 0,
          "status": "ACTIVE",
          "lastPriceTraded": 5.4,
          "totalMatched": 78.91,
          "ex": {
            "availableToBack": [
              { "price": 4.8, "size": 47.89 },
              { "price": 4.5, "size": 117.51 },
              { "price": 3.1, "size": 51.89 }
            ],
            "availableToLay": [
              { "price": 7, "size": 62.15 },
              { "price": 7.2, "size": 101.57 },
              { "price": 16, "size": 51.46 }
            ],
            "tradedVolume": []
          }
        }
      ]
    }

  ];



  // Bookmaker
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookmakerMarketResponse = await fetch(`http://46.101.9.108/api/v1/fetch_data?Action=listBookmakerMarket&EventID=${matchId}`);
        const marketData = await bookmakerMarketResponse.json();
        const marketIds = marketData.map(market => market.marketId);
        const bookmakerPromises = marketIds.map(marketId =>
          fetch(`http://46.101.9.108/api/v1/listBookmakerMarketOdds?market_id=${marketId}`)
            .then(response => response.json())
        );
        const bookmakerData = await Promise.all(bookmakerPromises);
        setBookmakerData(bookmakerData);
      } catch (error) {
        console.error('Error fetching bookmaker data', error);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 200);
    return () => clearInterval(intervalId);
  }, [matchId]);

  return (


    <>



      <div className=" fixed top-0 left-0 right-0 bottom-0 w-[480px] mx-auto z-50 bg-[#eef6fb] pb-10 overflow-y-auto">

        <Header showBackButton={true} />

        <div className="livematch">

          <iframe
            title="Live TV"
            src={`https://nlivetv.lagaikhaipro.com/ntv.php?eventId=${matchId}`}
            width="100%"
            height="500px"
            allowFullScreen
          ></iframe>
        </div>



        <div className=" ">
          <div className=" bg-[#1e1e1e] w-full p-2.5 flex justify-between items-center">
            <p className=" text-white text-lg font-semibold">Exchange</p>
            <p className=" text-primary text-sm font-semibold"><span className=" font-normal mr-1">Matched</span>PTE 40,166,111</p>
          </div>
          <div className=" bg-white">
            <div className=" bg-primary w-full p-2.5"><h2 className=" text-xl text-black w-fit border-b-[3px] border-black"><FontAwesomeIcon icon={faStar} className=" text-xl text-[#1e1e1e] mr-1" />Match Odds</h2></div>
            <div className=" p-2.5 flex flex-col gap-[2px]">
              <div className=" flex">
                <div className=" w-9/12"></div>
                <div className=" h-5/6 text-black flex items-center text-sm w-4/12">
                  <p className=" w-1/2 text-center">Back</p>
                  <p className=" w-1/2 text-center">Lay</p>
                </div>
              </div>


              <div>
                <div>

                  <div>
                    <div>
                      <div>
                        <div>
                          {marketData.map(market => (
                            <div key={market.marketId} className="bg-[#eef6fb] rounded-t-md flex justify-between items-center text-black">
                              <div className="ml-2 w-9/12">
                                {market.runners.map(runner => (
                                  <div key={runner.selectionId}>
                                    <p className="text-lg font-semibold">{`${runner.runnerName}`}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="h-5/6 flex items-center gap-[2px] text-sm w-4/12 relative">
                                {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-400 bg-opacity-80 rounded-md flex items-center justify-center font-semibold">Suspended</div> */}
                                <div className="flex flex-row flex-wrap items-center justify-center space-y-2">
                                  {market.runners.map((runner, index) => (
                                    <React.Fragment key={runner.selectionId}>

                                      <div className="py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                                        {/* Display the available to back price and size for each runner */}
                                        <p className="text-lg font-semibold">{runner.ex && runner.ex.availableToBack && runner.ex.availableToBack[0]?.price.toFixed(2) || 'N/A'}</p>
                                        <p className="text-xs font-normal">{runner.ex && runner.ex.availableToBack && runner.ex.availableToBack[0]?.size.toFixed(2) || 'N/A'}</p>
                                      </div>
                                      <div className="py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                                        <p className="text-lg font-semibold">{runner.ex && runner.ex.availableToLay && runner.ex.availableToLay[0]?.price.toFixed(2) || 'N/A'}</p>
                                        <p className="text-xs font-normal">{runner.ex && runner.ex.availableToLay && runner.ex.availableToLay[0]?.size.toFixed(2) || 'N/A'}</p>
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}


                        </div>

                      </div>


                    </div>

                  </div>


                </div>
              </div>









              <div className=" flex items-center">
                <div className=" w-9/12">
                  <div className=" px-2 py-1 bg-black rounded text-white text-sm font-semibold w-fit"><FontAwesomeIcon icon={faChartBar} className=" text-sm mr-2" />Market Depth</div>
                </div>
                <div className=" h-5/6 gap-2 flex justify-center items-center text-sm text-gray-500 w-4/12">
                  <FontAwesomeIcon icon={faArrowsUpDown} />
                  <p>            {marketData && marketData[1] && typeof marketData[1].min !== 'undefined' && typeof marketData[1].max !== 'undefined' ? (
                    `min: ${marketData[1].min} / max: ${marketData[1].max}`
                  ) : null}


                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bookmaker */}
          <div className=" p-2.5">
            <Accordion count="2" heading="Bookmaker">
              <div className=" flex flex-col gap-[2px]">
                <div className=" flex">
                  <div className=" w-9/12"></div>
                  <div className=" h-5/6 text-black flex items-center text-sm w-4/12">
                    <p className=" w-1/2 text-center">Back</p>
                    <p className=" w-1/2 text-center">Lay</p>
                  </div>
                </div>





                <div className="p-2.5 flex flex-col gap-[2px] bg-white">


                  {bookmakerData.map((market, marketIndex) => (
                    <div key={market.marketId}>

                      {/* Render back and lay prices for each runner */}
                      {market.runners.map((runner, runnerIndex) => (
                        <div key={runner.selectionId} className="bg-[#eef6fb] rounded-t-md mt-5 flex justify-between items-center text-black">
                          <div className="ml-2 w-9/12">
                            <div className="text-lg font-semibold">{runner.runnerName}</div>
                          </div>
                          <div className="h-5/6 flex items-center gap-[2px] text-sm w-4/12">
                            <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                              {runner.ex && runner.ex.availableToBack && runner.ex.availableToBack[0] && (
                                <>
                                  <p className="text-lg font-semibold">
                                    {runner.ex.availableToBack[0].price} {/* Display the first back price */}
                                  </p>
                                  <p className="text-xs font-normal">
                                    {runner.ex.availableToBack[0].size} {/* Display the size corresponding to the first back price */}
                                  </p>
                                </>
                              )}
                            </div>

                            <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                              {runner.ex && runner.ex.availableToLay && runner.ex.availableToLay[0] && (
                                <>
                                  <p className="text-lg font-semibold">
                                    {runner.ex.availableToLay[0].price} {/* Display the first lay price */}
                                  </p>
                                  <p className="text-xs font-normal">
                                    {runner.ex.availableToLay[0].size} {/* Display the size corresponding to the first lay price */}
                                  </p>
                                </>
                              )}
                            </div>

                            <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-green-300 rounded-md text-black">
                              {runner.ex && runner.ex.availableToLay && runner.ex.availableToLay[1] && (
                                <>
                                  <p className="text-lg font-semibold">
                                    {runner.ex.availableToLay[1].price}
                                  </p>
                                  <p className="text-xs font-normal">
                                    {runner.ex.availableToLay[1].size}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                </div>

                <div className="flex items-center">
                  <div className="w-9/12">
                    <div className="px-2 py-1 bg-black rounded text-white text-sm font-semibold w-fit">
                      <FontAwesomeIcon icon={faChartBar} className="text-sm mr-2" />
                      Market Depth
                    </div>
                  </div>
                  <div className="h-5/6 gap-2 flex justify-center items-center text-sm text-gray-500 w-4/12">
                    <FontAwesomeIcon icon={faArrowsUpDown} />
                    {bookmakerData && bookmakerData[1] && typeof bookmakerData[1].min !== 'undefined' && typeof bookmakerData[1].max !== 'undefined' ? (
                      `min: ${bookmakerData[1].min} / max: ${bookmakerData[1].max}`
                    ) : null}

                  </div>
                </div>
              </div>
            </Accordion>
            <div>
              <div className="rounded-t-lg bg-black px-4 pt-2 flex">
                <div
                  className={`px-6 py-2 rounded-t-lg ${activeTab === 'Fancybet' ? 'bg-primary' : 'bg-primary-dark'} text-white cursor-pointer`}
                  onClick={() => handleTabClick('Fancybet')}
                >
                  Fancybet
                </div>
                <div
                  className={`px-6 py-2 rounded-t-lg ${activeTab === 'Sportsbook' ? 'bg-primary' : 'bg-primary-dark'} text-white cursor-pointer`}
                  onClick={() => handleTabClick('Sportsbook')}
                >
                  Sportsbook
                </div>
              </div>
              {activeTab === 'Fancybet' &&
                <div>
                  <DetailTableFilter activeItem='Fancybet' onActiveItemChange={handleActiveComponent} />
                  <div className=" p-2.5 flex flex-col gap-[2px] bg-white">
                    <div className=" flex">
                      <div className=" w-9/12"></div>
                      <div className=" h-5/6 text-black flex items-center text-sm w-4/12">
                        <p className=" w-1/2 text-center">No</p>
                        <p className=" w-1/2 text-center">Yes</p>
                      </div>
                    </div>
                    {MatchDetails && MatchDetails.data.map((match) => (
                      <div key={match.match_id}>
                        {match && match.teams.map((team, index) => (
                          <div key={index} className="bg-[#eef6fb] rounded-t-md mt-5 flex justify-between items-center text-black">
                            <div className="ml-2 w-9/12">
                              <div className="text-lg font-semibold">{team.team_name}</div>
                            </div>
                            <div className="h-5/6 flex items-center gap-[2px] text-sm w-4/12">
                              <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                                <p className="text-lg font-semibold">1.27</p>
                                <p className="text-xs font-normal">8,413.3</p>
                              </div>
                              <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                                <p className="text-lg font-semibold">1.27</p>
                                <p className="text-xs font-normal">8,413.3</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className=" flex items-center">
                          <div className=" w-9/12">
                          </div>
                          <div className=" h-5/6 gap-2 flex justify-center items-center text-sm text-gray-500 w-4/12">
                            <FontAwesomeIcon icon={faArrowsUpDown} />
                            <p>min/max</p>
                            <p className=" font-semibold">1/1,000</p>
                          </div>
                        </div>
                      </div>
                    ))}





                    {/* //batsmans */}

                    {MatchDetails && MatchDetails.data.map((match) => (
                      <div key={match.match_id}>

                        {match && match.currentPlayersScore && match.currentPlayersScore.Batsman.map((batsman, index) => (
                          <div className=" bg-[#eef6fb] rounded-t-md mt-5 flex justify-between items-center text-black">
                            <div className=" ml-2 w-9/12">

                              <div className=" text-lg font-semibold">{batsman.inning}</div>
                              <div className=" text-lg font-semibold">{batsman.runs} runs</div>
                              <div className=" text-lg font-semibold">{batsman.balls} balls</div>
                              <div className=" text-lg font-semibold">{batsman.fours}fours</div>

                              <div className=" text-lg font-semibold">{batsman.sixes} sixes</div>
                              <div className=" text-lg font-semibold">{batsman.out_text}</div>
                              <div className=" text-lg font-semibold">{batsman.strike_rate}</div>





                            </div>
                            <div className=" h-5/6 flex items-center gap-[2px] text-sm w-4/12">
                              <div className=" w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                                <p className=" text-lg font-semibold">1.27</p>
                                <p className=" text-xs font-normal">8,413.3</p>
                              </div>
                              <div className=" w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                                <p className=" text-lg font-semibold">1.27</p>
                                <p className=" text-xs font-normal">8,413.3</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className=" flex items-center">
                          <div className=" w-9/12">
                          </div>
                          <div className=" h-5/6 gap-2 flex justify-center items-center text-sm text-gray-500 w-4/12">
                            <FontAwesomeIcon icon={faArrowsUpDown} />
                            <p>min/max</p>
                            <p className=" font-semibold">1/1,000</p>
                          </div>
                        </div>


                      </div>

                    ))}



                    {MatchDetails && MatchDetails.data.map((match) => (
                      <div key={match.match_id}>

                        {match && match.last24balls.map((ball, index) => (
                          <div className=" bg-[#eef6fb] rounded-t-md mt-5 flex justify-between items-center text-black">
                            <div className=" ml-2 w-9/12">

                              <div className=" text-lg font-semibold">{ball}</div>






                            </div>
                            <div className=" h-5/6 flex items-center gap-[2px] text-sm w-4/12">
                              <div className=" w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                                <p className=" text-lg font-semibold">1.27</p>
                                <p className=" text-xs font-normal">8,413.3</p>
                              </div>
                              <div className=" w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                                <p className=" text-lg font-semibold">1.27</p>
                                <p className=" text-xs font-normal">8,413.3</p>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className=" flex items-center">
                          <div className=" w-9/12">
                          </div>
                          <div className=" h-5/6 gap-2 flex justify-center items-center text-sm text-gray-500 w-4/12">
                            <FontAwesomeIcon icon={faArrowsUpDown} />
                            <p>min/max</p>
                            <p className=" font-semibold">1/1,000</p>
                          </div>
                        </div>

                      </div>

                    ))}




                  </div>
                </div>
              }
              {activeTab === 'Sportsbook' &&
                <div>
                  <DetailTableFilter activeItem='Sportsbook' onActiveItemChange={handleActiveComponent} />
                  <div className="p-2.5 flex flex-col gap-[2px] bg-white">


                    {MatchDetails && MatchDetails.data.map((match) => (
                      <div key={match.match_id}>
                        {/* {match && match.teams.map((team, index) => ( */}
                        <div className="bg-[#eef6fb] rounded-t-md mb-5 h-200 flex justify-between items-center text-black">
                          <div className="ml-2 w-9/12">
                            <div className="text-lg font-semibold">
                              {match && match.teams && match.teams[0].team_name} Vs {match && match.teams && match.teams[1].team_name}
                            </div>
                          </div>
                          {/* <div className="h-5/6 flex items-center gap-[2px] text-sm w-4/12">
                            <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                               <p className="text-lg font-semibold">1.27</p>
                              <p className="text-xs font-normal">8,413.3</p> 
                            </div>
                            <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                              <p className="text-lg font-semibold">1.27</p>
                              <p className="text-xs font-normal">8,413.3</p> 
                            </div>
                          </div> */}
                        </div>

                      </div>
                    ))}
                    {MatchDetails && MatchDetails.data.map((match) => (
                      <div key={match.match_id}>
                        {match &&
                          match.last24balls.reduce((acc, ball, index) => {
                            const overNumber = Math.floor(index / 6);

                            if (!acc[overNumber]) {
                              acc[overNumber] = [];
                            }

                            acc[overNumber].push(ball);

                            return acc;
                          }, []).map((overBalls, overIndex) => (
                            <SportAccordion key={overIndex} heading={`Over ${overIndex + 1}`}>
                              {overBalls.map((ball, ballIndex) => (
                                <div key={ballIndex} className="bg-[#eef6fb] rounded-t-md flex justify-between items-center text-black">
                                  <div className="h-5/6 flex items-center gap-[2px] text-sm w-full">
                                    <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-300 rounded-b-md text-black">
                                      <p className="text-lg font-semibold">1.27</p>
                                      <p className="text-xs font-normal">8,413.3</p>
                                    </div>
                                    <div className="w-1/2 py-1 flex flex-col items-center justify-center bg-blue-300 rounded-b-md text-black">
                                      <p className="text-lg font-semibold">1.27</p>
                                      <p className="text-xs font-normal">8,413.3</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </SportAccordion>
                          ))}

                        {MatchDetails && MatchDetails.data.map((match) => (
                          <div key={match.match_id}>

                            {match && match.currentPlayersScore && match.currentPlayersScore.Batsman.map((batsman, index) => (
                              <div className=" bg-[#eef6fb] rounded-t-md mt-5 flex justify-between items-center text-black">
                                <div className=" ml-2 w-9/12">

                                  <div className=" text-lg font-semibold">{batsman.inning}</div>
                                  <div className=" text-lg font-semibold">{batsman.runs} runs</div>
                                  <div className=" text-lg font-semibold">{batsman.balls} balls</div>
                                  <div className=" text-lg font-semibold">{batsman.fours}fours</div>

                                  <div className=" text-lg font-semibold">{batsman.sixes} sixes</div>
                                  <div className=" text-lg font-semibold">{batsman.out_text}</div>
                                  <div className=" text-lg font-semibold">{batsman.strike_rate}</div>





                                </div>
                                <div className=" h-5/6 flex items-center gap-[2px] text-sm w-4/12">
                                  <div className=" w-1/2 py-1 flex flex-col items-center justify-center bg-blue-400 rounded-md text-black">
                                    <p className=" text-lg font-semibold">1.27</p>
                                    <p className=" text-xs font-normal">8,413.3</p>
                                  </div>
                                  <div className=" w-1/2 py-1 flex flex-col items-center justify-center bg-pink-300 rounded-md text-black">
                                    <p className=" text-lg font-semibold">1.27</p>
                                    <p className=" text-xs font-normal">8,413.3</p>
                                  </div>
                                </div>
                              </div>
                            ))}


                          </div>

                        ))}
                      </div>
                    ))}
                  </div>


                </div>
              }
            </div>
          </div>

        </div>
        <Footer />
      </div>

    </>

  )
}

export default MatchDetails