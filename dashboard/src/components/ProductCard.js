import React from "react";

function ProductCard () {
  return (
    <div className="card product-card">
      <h3>Top selling products</h3>
      <div className="product">
        <div>
          <strong>Apple watch</strong>
          <p>USB ,Wireless</p>
        </div>
        <div className="sales">$300.00<br /><span>sales</span></div>
      </div>
      <div className="product">
        <div>
          <strong>Macbook pro</strong>
          <p>USB,Wireless</p>
        </div>
        <div className="sales">$12,000<br /><span>sales</span></div>
      </div>
      <div className="product">
        <div>
          <strong>Fridge</strong>
        </div>
        <div className="sales">$500.00<br /><span>sales</span></div>
      </div>
    </div>
  );
};

export default ProductCard;
