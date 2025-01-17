import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { useState } from "react";
import { mutate } from "swr";
import { Dropdown } from "react-bootstrap";
const Card = ({ data }) => {
  const [done, setDone] = useState(false);
  const { user } = useUser();

  const handleDelete = async () => {
    try {
      const response = await makeSecuredRequest(
        `/api/cards/${data._id}`,
        "DELETE"
      );

      alert(response);
      mutate(`/api/cards/user/${user?._id}`);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="cardContainer">
        <div className="cardWrapper">
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <i className="bi bi-three-dots-vertical"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Category</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Reaction</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {data.image?.length > 3 && (
            <img className="cardImage" src={data.image} alt={data.title} />
          )}
          <div className="cardText">
            <h1 className="cardTitle">{data.title}</h1>
            {data.description && <p>{data.description.substring(0, 91)} ...</p>}

            <a
              className="cardButton btn btn-warning"
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardContainer {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .cardWrapper {
          box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.3);
          padding: 50px 30px;
          border-radius: 10px;
          background-color: #ffffff;
          width: min(75%, 250px);
          height: 470px;
          margin: 20px;
          position: relative;
        }

        .cardImage {
          display: flex;
          margin: auto;
          width: 100%;
          height: 160px;
          object-fit: cover;

          border: 1px solid #2978b5;
          padding: 5px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .cardTitle {
          font-size: 1.3rem;
          color: #2978b5;

          font-weight: bold;
        }

        .cardText {
          padding: 20px 0;
        }
        .cardButton {
          position: absolute;
          right: -1px;

          padding: 15px 20px;
          bottom: -1px;
          border-radius: 10px 0 10px 0;
        }

        .cardButton i {
          font-size: 1.3rem;
        }
      `}</style>
    </>
  );
};

export default Card;
