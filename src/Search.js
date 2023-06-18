import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles/styles.scss";
import cx from "classnames";
import { BiSearch, BiLoaderAlt } from "react-icons/bi";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const containerRef = useRef(null);
  const blurTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setStartIndex(1);
      setSearchResults([]);
      setIsError(false);
      fetchSearchResults();
    }
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (startIndex > 1) {
      fetchSearchResults();
    }
  }, [startIndex]);

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyA6B7dmBxibNzgfNcO7Qumb8KrzcEH9O5U&cx=12526291779674938&cx=12526291779674938&q=${searchTerm}&start=${startIndex}`
      );

      const data = response.data;
      const newResults = data.items || [];
      setSearchResults((prevResults) => [...prevResults, ...newResults]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 429) {
        setIsError(true);
      } else {
        setIsError(false);
      }
      setIsLoading(false);
    }
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setStartIndex((prevStartIndex) => prevStartIndex + 20);
    }
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleFocus = () => {
    clearTimeout(blurTimeoutRef.current);
  };

  const handleClickResult = () => {
    clearTimeout(blurTimeoutRef.current);
  };

  return (
    <div className="container">
      <div className="form">
        <div className="title">
          <h1>Tìm kiếm</h1>
        </div>
        <div className="searchInput">
          <BiSearch className="iconSearch" />
          <input
            onBlur={handleBlur}
            onFocus={handleFocus}
            onClick={() => setIsOpen(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="search"
          />
        </div>

        <ul
          className={cx("wrap", isOpen ? "active" : "")}
          ref={containerRef}
          onClick={handleClickResult}
        >
          {searchResults.map((result, index) => (
            <li key={index} className="item">
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                {result.pagemap?.cse_thumbnail?.length > 0 && (
                  <img
                    src={result.pagemap?.cse_thumbnail[0]?.src}
                    alt={result.title}
                  />
                )}
                <div className="content">
                  <h3>{result.title}</h3>
                  <p>{result.snippet}</p>
                </div>
              </a>
            </li>
          ))}

          <div ref={containerRef} className="intersectionObserver" />
        </ul>
        {isLoading && <BiLoaderAlt className="loading" />}
        {isError && (
          <p className="errorMessage">
            Hiện đang vượt quá giới hạn cho phép của Google Custom Search API.
            Vui lòng đợi trước khi thực hiện tìm kiếm bổ sung.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
