import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../../stores/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./DetailPage.scss"; // Import your SCSS file here
import { NASASearchResult } from "../../interfaces/SearchResult";
import { createMarkup } from "../../components/utils";

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const DetailPage: React.FC = observer(() => {
  const { nasaStore } = useContext(StoreContext);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [detailedItem, setDetailedItem] = useState<NASASearchResult | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await nasaStore.fetchDetails(id);
        setDetailedItem(nasaStore.detailedItem);
      }
    };

    fetchData();
  }, [id, nasaStore]);

  if (!detailedItem) {
    return <div>Loading...</div>;
  }

  // Format date
  const formattedDate = detailedItem.data[0]?.date_created
    ? new Date(detailedItem.data[0].date_created).toLocaleDateString()
    : "";

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      className="detail-page"
    >
      <button onClick={() => navigate(-1)} className="back-button">
        Back to results
      </button>
      <div className="item-detail">
        <h1 className="title">{detailedItem.data[0].title}</h1>
        <img
          src={detailedItem.links[0].href}
          alt={detailedItem.data[0].title}
        />
        <p className="location">{detailedItem.data[0].location}</p>
        <p className="photographer">{detailedItem.data[0].photographer}</p>
        <p className="date">{formattedDate}</p>
        <div
          className="item-description"
          dangerouslySetInnerHTML={createMarkup(
            detailedItem?.data[0].description as string
          )}
        />
        {detailedItem?.data[0].keywords && (
          <div className="keywords">
            {detailedItem.data[0].keywords.map(
              (
                keyword:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <span key={index}>{keyword}</span>
              )
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default DetailPage;
