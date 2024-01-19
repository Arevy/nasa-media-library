import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../../stores/StoreContext";
import { debounce } from "lodash";
import "./SearchPage.scss";
import { useForm } from "react-hook-form";
import { NASASearchResult } from "../../interfaces/SearchResult";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { reaction, when } from "mobx";
import { createMarkup } from "../../components/utils";

// Wrap your page component in a motion.div with your desired animation props
const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const SearchPage: React.FC = observer(() => {
  const { nasaStore } = useContext(StoreContext);
  const [data, setData] = useState<NASASearchResult[] | undefined>([]);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const defaultQuery = queryParams.get("q") || "";
  const defaultYearStart = queryParams.get("year_start") || "";
  const defaultYearEnd = queryParams.get("year_end") || "";

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      query: defaultQuery,
      yearStart: defaultYearStart,
      yearEnd: defaultYearEnd,
    },
  });
  const handleSearch = handleSubmit(async (data) => {
    try {
      await nasaStore
        .search(data.query.trim(), data.yearStart, data.yearEnd)
        .then((items) => setData(items));
      // Set the values back to the form fields after submission
      setValue("query", data.query);
      setValue("yearStart", data.yearStart);
      setValue("yearEnd", data.yearEnd);
      nasaStore.setLastSearchResults(nasaStore.searchResults);
    } catch (e) {
    } finally {
      navigate(
        `/?q=${encodeURIComponent(data.query.trim())}&year_start=${
          data.yearStart
        }&year_end=${data.yearEnd}`
      );
    }
  });

  const onResultClick = async (nasaId: string) => {
    await nasaStore.fetchDetails(nasaId);
    when(
      () => nasaStore.isDetailReady,
      () => navigate(`/details/${nasaId}`)
    );
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("q");
    const yearStart = queryParams.get("year_start") || undefined;
    const yearEnd = queryParams.get("year_end") || undefined;

    if (query) {
      // Perform search with query parameters
      nasaStore.search(query, yearStart, yearEnd).then((results) => {
        setData(results);
      });
    }
  }, [nasaStore]);

  useEffect(() => {
    if (nasaStore.lastSearchResults.length > 0) {
      setData(nasaStore.lastSearchResults);
    }
  }, [nasaStore.lastSearchResults]);

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      className="search-page"
    >
      <form className="search-form" onSubmit={handleSearch}>
        <input {...register("query")} type="text" placeholder="Search" />
        <input
          {...register("yearStart")}
          type="text"
          placeholder="Year Start"
        />
        <input {...register("yearEnd")} type="text" placeholder="Year End" />
        <button type="submit">Search</button>
      </form>
      {nasaStore.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="search-results">
          {!!data ? (
            data?.map((item, index) => (
              <div
                key={index}
                className="result-item"
                onClick={() =>
                  item.data[0]?.nasa_id && onResultClick(item.data[0]?.nasa_id)
                }
              >
                {item?.links?.[0]?.href && (
                  <img
                    src={item.links[0].href}
                    alt={item.data[0].title}
                    className="result-image"
                  />
                )}
                <div className="result-info">
                  <h2>{item?.data?.[0]?.title}</h2>
                  <div
                    className="result-description"
                    dangerouslySetInnerHTML={createMarkup(
                      item?.data?.[0]?.description
                    )}
                  />
                  {item?.data?.[0]?.location && (
                    <span>Location: {item.data[0].location}</span>
                  )}
                  {item?.data?.[0]?.photographer && (
                    <span>Photographer: {item.data[0].photographer}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      )}
    </motion.div>
  );
});

export default SearchPage;
