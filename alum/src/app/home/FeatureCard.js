import React from "react";

const FeatureCard = ({ id, feature, desc }) => {
  return (
    <div className="bg-white rounded-[30px] p-4 w-48 mb-3">
      <h3 className="text-xl my-2">{feature}</h3>

      <p className="text-grey-600">{desc}</p>
    </div>
  );
};

export default FeatureCard;
