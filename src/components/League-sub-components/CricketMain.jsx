import React, { useState, useEffect } from "react";
import AlphaFilter from "../Filters/AlphaFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CricketMain = () => {
  const [trigger, setTrigger] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [matchList, setMatchList] = useState([]);


  const popularMatches = [
    "International Twenty20 Matches",
    "T20 Blast",
    "One Day Internationals",
    "Test Matches",
  ];

  const restWorld = [
    "County",
    "PSL",
    "Vitality Blast",
    "Big Bash",
  ];

  const [selectedPopularMatch, setSelectedPopularMatch] = useState('');
  const [selectedMatchName, setselectedMatchName] = useState('');

  const [selectedMatchId, setselectedMatchId] = useState('');



  const odds = [
    "Match Odds"
  ]
  const handleActiveItemChange = (activeItem) => {
    console.log("Active Item:", activeItem);
  };

  const handleTrigger = (match) => {
    setTrigger(!trigger);


    setSelectedPopularMatch(match);

  };

  const handleTrigger2 = (match,indexx) => {
    setTrigger2(!trigger2);

    // console.log(match.match_id);

    setselectedMatchId(match.match_id);
    setselectedMatchName(match)
  };

  // Replace the fetched data with the provided static data
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

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const matchlistt = async () => {
        const response = await fetch("http://167.99.198.2/api/matches/list");
        const data = await response.json();
        const fetchedMatchList = data.data.map((match) => match);
        setMatchList((prevMatchList) => [...prevMatchList, ...fetchedMatchList]);
      };
      matchlistt();
    }, 300000);
  
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div>
      <div className="px-4 py-2 flex gap-3">
        <AlphaFilter onActiveItemChange={handleActiveItemChange} />
        <div className="flex flex-col gap-3 w-full">
          <div>
            <div className="text-lg font-semibold text-[#1e1e1e] ml-2 mb-2">
              Popular
            </div>
            <div className="bg-white rounded-xl">
              {popularMatches.map((match, index) => (
                <div
                  key={index}
                  className="px-4 py-4 flex justify-between items-center border-b border-gray-200 cursor-pointer"
                  onClick={() => handleTrigger(match)}
                >
                  <p className="text-lg font-semibold text-[#1e1e1e]">{match}</p>
                  <div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-gray-500 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-[#1e1e1e] ml-2 mb-2">
              Rest of the World
            </div>
            <div className="bg-white rounded-xl">
              {restWorld.map((match, index) => (
               

                  <div
                    key={index}
                    className="px-4 py-4 flex justify-between items-center border-b border-gray-200 cursor-pointer"
                    onClick={() => handleTrigger(match)}
                  >
                    <p className="text-lg font-semibold text-[#1e1e1e]">{match}</p>
                    <div>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-gray-500 text-sm"
                      />
                    </div>
                  </div>
              ))}
                </div>
          </div>
          </div>
        </div>
      


{trigger && (
        <div className=" fixed left-0 right-0 top-[51px] bottom-[78px] max-w-[480px] mx-auto  bg-[#EEF6FB] z-50 overflow-y-scroll">
          <header className=" bg-black px-3 h-12 flex items-center gap-4 text-lg font-semibold text-white">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleTrigger()} />
            <div>{selectedPopularMatch}</div>
          </header>
          <div className="px-4 flex gap-3 p-2">
            <div className="flex flex-col gap-3 w-full">
              <div>
                <div className="bg-white rounded-xl">
                  {matchList.map((match, index) => (
                    <div
                      key={index}
                      className="px-4 py-4 flex justify-between items-center border-b border-gray-200 cursor-pointer"
                      onClick={() => handleTrigger2(match,match.match_id)}
                    >
                      <p className="text-lg font-semibold text-[#1e1e1e]">
                        {match.match_name}
                      </p>
                      <div>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-gray-500 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        {trigger2 && <div className=" fixed left-0 right-0 top-[51px] bottom-[78px] max-w-[480px] mx-auto  bg-[#EEF6FB] z-50 overflow-y-scroll">
          <header className=" bg-black px-3 h-12 flex items-center gap-4 text-lg font-semibold text-white">
            <FontAwesomeIcon icon={faArrowLeft} onClick={handleTrigger2} />
            <div>{selectedMatchName.match_name}</div>
          </header>
          <div className=" px-4 flex gap-3 p-2">
            <div className='flex flex-col gap-3 w-full'>
              <div className=" bg-white rounded-xl">
              <Link to={`/match-details/${selectedMatchName.match_id}`} className="bg-white rounded-xl">
                  {odds.map((match, index) => (
                    <div
                      key={index}
                      className="px-4 py-4 flex justify-between items-center border-b border-gray-200 cursor-pointer"
                      onClick={handleTrigger2}
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
        </div>}


      </div>
      );
};

      export default CricketMain;
