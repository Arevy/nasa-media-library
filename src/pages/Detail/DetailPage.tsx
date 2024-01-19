import React, { useContext, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../../stores/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./DetailPage.scss"; // Import your SCSS file here
import { NASASearchResult } from "../../interfaces/SearchResult";
import { createMarkup } from "../../components/utils";

type DetailPageProps = {
  fetchDetailData?: (query: string) => string;
};

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const DetailPage: React.FC<DetailPageProps> = observer(
  ({ fetchDetailData }) => {
    const { nasaStore } = useContext(StoreContext);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const overridedId = (fetchDetailData || id) as string;

    const [detailedItem, setDetailedItem] = useState<NASASearchResult | null>(
      null
    );
    const [imageError, setImageError] = useState(false);
    const handleImageError = () => {
      setImageError(true);
    };

    useEffect(() => {
      const fetchData = async () => {
        if (overridedId) {
          await nasaStore.fetchDetails(overridedId);
          setDetailedItem(nasaStore.detailedItem);
        } else {
          console.log("Invalid data format received", nasaStore.detailedItem);
        }
      };

      fetchData();
    }, [overridedId, nasaStore]);

    if (!detailedItem) {
      return <div>Loading...</div>;
    }

    // Ensure detailedItem and its properties are defined before accessing them
    const title = detailedItem?.data[0]?.title ?? "Title not available";
    const isImage = detailedItem.data[0].media_type === "image";
    const imageUrl =
      isImage && detailedItem.links.length > 0
        ? detailedItem.links[0].href
        : "Default image URL";
    const location =
      detailedItem?.data[0]?.location ?? "Location not available";
    const photographer =
      detailedItem?.data[0]?.photographer ?? "Photographer not available";
    const description =
      detailedItem?.data[0]?.description ?? "Description not available";
    const keywords = detailedItem?.data[0]?.keywords ?? [];
    const dateCreated = detailedItem?.data[0]?.date_created
      ? new Date(detailedItem.data[0].date_created).toLocaleDateString()
      : "Date not available";

    const mediaType = detailedItem.data[0].media_type;
    const mediaUrl = detailedItem.links?.[0]?.href || "";

    let mediaElement;
    switch (mediaType) {
      case "image":
        mediaElement = !imageError && imageUrl && (
          <img src={imageUrl} alt={title} onError={handleImageError} />
        );
        break;
      case "video":
        mediaElement = (
          <video controls>
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
        break;
      case "audio":
        mediaElement = (
          <audio controls>
            <source src={mediaUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
        break;
      default:
        mediaElement = <p>No media available</p>;
    }
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
          {title && <h1 className="title">{title}</h1>}
          {mediaElement}
          <div className="location">{location}</div>
          <div className="photographer">{photographer}</div>
          <div className="date">{dateCreated}</div>
          <div
            className="item-description"
            dangerouslySetInnerHTML={createMarkup(description as string)}
          />
          {keywords && (
            <div className="keywords">
              {keywords?.map(
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
  }
);

export default DetailPage;
