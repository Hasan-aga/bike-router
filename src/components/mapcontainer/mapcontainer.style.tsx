import styled from "styled-components";

export const CustomMap = styled.div<{ darkTheme: boolean }>`
  height: 100%;
  .mapcontainer {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .search-wrapper {
    display: flex;
  }

  @media (max-width: 40em) {
    .elevation-chart {
      .custom-tooltip {
        visibility: collapse;
      }
    }
  }

  ${(props) => {
    return (
      props.darkTheme &&
      `
      .leaflet-tile {
        -webkit-filter: hue-rotate(160deg) invert(80%);
      }

      .map-button {
        background-color: #282c34;
        color: #8884d8;
        &:hover {
          cursor: pointer;
          background-color: #1f1f1f;
          svg {
            color: #82ca9d;
          }
        }
      }

      .searchInput {
        background-color:#282c34;
        color: #8884d8;
        &:focus {
        outline: #8884d8 2px solid;
        }
      }

      .search-group{
        button{
          background-color:#282c34;
          &:hover {
            cursor: pointer;
            background-color: #1f1f1f;

          }
          &:hover svg {
            color: #82ca9d;
          }
        }

        svg{
          color: #8884d8;
        }


      }

      `
    );
  }}
`;
