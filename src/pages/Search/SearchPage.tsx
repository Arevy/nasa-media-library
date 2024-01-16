import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../../stores/StoreContext";
import { debounce } from "lodash";
import "./SearchResults.scss";
import { useForm } from "react-hook-form";
import { NASASearchResult } from "../../interfaces/SearchResult";

const SearchPage: React.FC = observer(() => {
  const { nasaStore } = useContext(StoreContext);
  const [data, setData] = useState<NASASearchResult[] | undefined>([])

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      query: '',
      yearStart: '',
      yearEnd: ''
    }
  });


  const handleSearch = handleSubmit(async data => {
    await nasaStore.search(data.query.trim(), data.yearStart, data.yearEnd).then(items => setData(items));
    // Set the values back to the form fields after submission
    setValue('query', data.query);
    setValue('yearStart', data.yearStart);
    setValue('yearEnd', data.yearEnd);
  });

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input {...register('query')} type="text" placeholder="Search" />
        <input {...register('yearStart')} type="text" placeholder="Year Start" />
        <input {...register('yearEnd')} type="text" placeholder="Year End" />
        <button type="submit">Search</button>
      </form>
      {nasaStore.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="search-results">
          {!!data ? (
            data?.map((item, index) => (
              <div key={index} className="result-item">
                {item?.links?.[0]?.href && (
                  <img
                    src={item.links[0].href}
                    alt={item.data[0].title}
                    className="result-image"
                  />
                )}
                <div className="result-info">
                  <h2>{item?.data?.[0]?.title}</h2>
                  <p>{item?.data?.[0]?.description}</p>
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
    </div>
  );
});

export default SearchPage;
