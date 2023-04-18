import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getUser = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:3001/userProfile/${query}`, {
        headers: {
          "x-api-key": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSearchResults(res.data.data);
        alert(res.data.message);
        console.log(res.data);
        setQuery("")
      })
      .catch((e) => {
        console.log(e.message);
        alert("no user found");
        setSearchResults([])
        
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <form onSubmit={getUser}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "auto", boxShadow: "5px 5px 10px black" }}
        />
        <button>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div
              key={result._id}
              style={{
                border: "1px solid black",
                padding: "2px",
                margin: "20px",
                width: "200px",
                display: "flex",
                boxShadow: "5px 5px 10px black",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={result.profilePic}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
              <Link to={`/getUserByProfileId/${result._id}`}>
                <h5>{result.profileOf.userName}</h5>
              </Link>
              <p>{result.bio}</p>
            </div>
          ))
        ) : (
          <p>No user found</p>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
