import React from "react";

const badgeSymbols = {
  'Sponsor': '🚀',
  'Pure OSS': '🍏',
};

const badgeExplanation = {
  'Sponsor': 'This entity is a sponsor of NumFOCUS',
  'Pure OSS': 'This jobs entails working on Open Source full time'
};

const Badge = ({ type }) => (
  <div className="badge">
    <span role="img" aria-label={type}>
      { badgeSymbols[type] }
      <span className="tooltip">
        { badgeExplanation[type] }
      </span>
    </span>
  </div>
);

export default Badge;
