import React from "react";
import Header from './header/Header';
import Feed from './feed/Feed';

export default function Feeds() {
  return (
  <div className="feeds">
    <Header />
      <div className="body">
        <Feed/>
      </div>
  </div>
  );
}
