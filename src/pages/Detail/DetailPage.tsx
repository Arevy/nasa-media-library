import React, { useContext, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../../stores/StoreContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
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

  const { id } = useParams<{ id: string }>();

  const { detailedItem } = useMemo(() => nasaStore, [id]);
  useEffect(() => {
    id && nasaStore.fetchDetails(id);
  }, [id, nasaStore]);

  // useEffect(() => {
  //   // Check if the details are already available, if not fetch them
  //   if (
  //     id &&
  //     (!nasaStore.detailedItem || nasaStore.detailedItem.data[0].nasa_id !== id)
  //   ) {
  //     nasaStore.fetchDetails(id).catch(console.error);
  //   }
  // }, [id, nasaStore, detailedItem]);

  useEffect(() => {
    // Check if the details are already in the store
    const existingDetail = nasaStore.detailedItem;
    if (id && (!existingDetail || existingDetail.data[0].nasa_id !== id)) {
      // Data is not in the store, fetch it
      nasaStore.fetchDetails(id).catch(console.error);
    }
  }, [id, nasaStore]);

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      className="detail-page"
    >
      <Link to="/" className="back-button">
        Back to results
      </Link>
      <div className="item-detail">
        <h1 className="title">{detailedItem?.data[0].title}</h1>
        <img
          src={detailedItem?.links[0].href}
          alt={detailedItem?.data[0].title}
        />
        <p className="location">{detailedItem?.data[0].location}</p>
        <p className="photographer">{detailedItem?.data[0].photographer}</p>
        <p className="date">
          {new Date(
            detailedItem?.data[0]?.date_created as string
          ).toLocaleDateString()}
        </p>
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
        {/* Other details here */}
      </div>
    </motion.div>
  );
});

export default DetailPage;
