import React, { useState } from "react";
import PanelHeader from "../components/Panel-components/PanelHeader";
import PanelNav from "../components/Panel-components/PanelNav";
import SuperPanelHome from "../components/Panel-components/SuperPanelHome";
import MyAccount from "../components/Panel-components/MyAccount";
import ProfitLossReport from "../components/Panel-components/Report-components/ProfitLossReport";
import BetList from "../components/Panel-components/BetList";
import BetListLive from "../components/Panel-components/BetListLive";
import RiskManagement from "../components/Panel-components/RiskManagement";
import Banking from "../components/Panel-components/Banking";
import BlockMarket from "../components/Panel-components/BlockMarket";
import OldRes from "../components/Panel-components/OldRes";
import MySettings from "../components/Panel-components/MySettings";

const SuperAgent = () => {
  const [activeComponent, setActiveComponent] = useState("downline");
  const[selectedHeaderItem,setSelectedHeaderItem]=useState("Profit/Loss by Downline");
  
  const handleActiveComponent = (data) => {
    setActiveComponent(data);
  };
  const handleHeaderDropdownSelection = (selectedItem) => {
    setSelectedHeaderItem(selectedItem);
  };
  
  const renderActiveComponent = () => {
    if (activeComponent === "downline") {
      return <SuperPanelHome/>;
    } else if (activeComponent === "account") {
      return <MyAccount/>;
    }
    else if (activeComponent === "betlist") {
      return <BetList/>;
    }
    else if (activeComponent === "betlist live") {
      return <BetListLive/>;
    } else if (activeComponent === "risk management") {
      return <RiskManagement/>;
    } else if (activeComponent === "banking") {
      return <Banking/>;
    } else if (activeComponent === "block market") {
      return <BlockMarket/>;
    } else if (activeComponent === "old res") {
      return <OldRes/>;
    } else if (activeComponent === "settings") {
      return <MySettings/>;
    } else if (selectedHeaderItem === "Profit/Loss by Downline") {
      return <ProfitLossReport selectedHeaderItem={selectedHeaderItem} />;
    } else if (selectedHeaderItem === "Profit/Loss by Market") {
      return <ProfitLossReport selectedHeaderItem={selectedHeaderItem} />;

    } else if (selectedHeaderItem === "Profit/Loss Downline") {
      return <ProfitLossReport selectedHeaderItem={selectedHeaderItem} />;

    } else if (selectedHeaderItem === "Profit/Loss Sports Wise") {
      return <ProfitLossReport selectedHeaderItem={selectedHeaderItem} />;

    } else if (selectedHeaderItem === "Match Profit Loss") {
      return <ProfitLossReport selectedHeaderItem={selectedHeaderItem} />;

    } else if (selectedHeaderItem === "Casino P/L Downline Monthly") {
      return <ProfitLossReport selectedHeaderItem={selectedHeaderItem} />;

    } else if (selectedHeaderItem === "SABA P/L Downline Monthly") {
      return <ProfitLossReport selectedHeaderItem={selectedHeaderItem} />;

    } 
    // Add additional component cases here if needed
  };
  
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-[#f0ece1] z-50 ">
    <div className="min-w-[270vw] lg:min-w-[1024px] transform scale-[0.37] lg:transform-none origin-top-left ">
      <PanelHeader />
      <PanelNav
        panelActive={activeComponent}
        active={handleActiveComponent}
        onHeaderDropdownSelect={handleHeaderDropdownSelection}
      />
      <div className="px-4 lg:px-40">
        {renderActiveComponent()}
      </div>
    </div>
  </div>
  );
};

export default SuperAgent;
